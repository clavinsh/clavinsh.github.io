"use strict";

// this js code uses the Math.js library (https://mathjs.org) for complex number operations

const inputCanvas = document.querySelector("#inputCanvas");
const inputCtx = inputCanvas.getContext("2d");

const outputCanvas = document.querySelector("#outputCanvas");
const outputCtx = outputCanvas.getContext("2d");

function clearCanvas(canvas) {
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const form = document.querySelector("#inputForm");

form.addEventListener("submit", function (event) {
    const dftCode = "dft";
    const idftCode = "idft";
    event.preventDefault();

    let formData = new FormData(event.target);

    let op = formData.get("operation");
    let imgInput = formData.get("imgInput");

    console.log(imgInput);

    // input validation
    if (imgInput.size === 0) {
        return;
    }

    if (op === dftCode) {
        processImage(imgInput, true);
    } else if (op === idftCode) {
        processImage(imgInput, false);
    } else {
        return;
    }
});

const input = document.querySelector("#imgInput");

function processImage(imageFile, operation) {
    clearCanvas(inputCanvas);
    clearCanvas(outputCanvas);

    const image = new Image();
    const url = URL.createObjectURL(imageFile);

    image.onload = function () {
        URL.revokeObjectURL(url);

        let imageData = drawImageScaled(inputCtx, image);

        let grayscaled = convertToGrayscale(imageData);

        imageDataToImage(inputCtx, grayscaled);

        let processedImage = new ImageData(image.width, image.height);

        if (operation) {
            let processedImageData = GetImageDataFrom2dIntensityRepresenation(
                normalizeMagnitude(
                    computeMagnitudeLog(
                        DFT2D(
                            Get2dIntensityRepresenationFromImageData(grayscaled)
                        )
                    )
                )
            );

            for (let i = 0; i < processedImage.data.length; i += 4) {
                processedImage.data[i + 0] = processedImageData[i + 0];
                processedImage.data[i + 1] = processedImageData[i + 1];
                processedImage.data[i + 2] = processedImageData[i + 2];
                processedImage.data[i + 3] = processedImageData[i + 3];
            }
        } else {
            let processedImageData = GetImageDataFrom2dIntensityRepresenation(
                normalizeMagnitude(
                    computeMagnitudeLog(
                        IDFT2D(
                            Get2dIntensityRepresenationFromImageData(grayscaled)
                        )
                    )
                )
            );

            for (let i = 0; i < processedImage.data.length; i += 4) {
                processedImage.data[i + 0] = processedImageData[i + 0];
                processedImage.data[i + 1] = processedImageData[i + 1];
                processedImage.data[i + 2] = processedImageData[i + 2];
                processedImage.data[i + 3] = processedImageData[i + 3];
            }
        }

        imageDataToImage(outputCtx, processedImage);
    };

    image.src = url;
}

function drawImageScaled(ctx, img) {
    let canvas = ctx.canvas;
    let hRatio = canvas.width / img.width;
    let vRatio = canvas.height / img.height;
    let ratio = Math.min(hRatio, vRatio);

    ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        0,
        0,
        img.width * ratio,
        img.height * ratio
    );

    return ctx.getImageData(0, 0, img.width, img.height);
}

// https://stackoverflow.com/questions/13416800/how-to-generate-an-image-from-imagedata-in-javascript
function imageDataToImage(drawCtx, imagedata) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = imagedata.width;
    canvas.height = imagedata.height;
    ctx.putImageData(imagedata, 0, 0);
    var image = new Image();

    image.onload = function () {
        drawImageScaled(drawCtx, image);
    };

    image.src = canvas.toDataURL();
}

// since DFT works only with intensity and color cannot be represented with a single number,
// input images have to be converted to grayscale
// algorithm based on: https://stackoverflow.com/questions/53364140/how-can-i-grayscale-a-canvas-image-in-javascript
function convertToGrayscale(image) {
    let pixels = image.data;
    // ImageData.data holds the pixel data in the form of a 1D array,
    // each pixel holds 4 values in the array - RGBA (in that order)
    // https://developer.mozilla.org/en-US/docs/Web/API/ImageData/data
    // therefore each iteration of the loop will convert values of the 4 indices
    for (var i = 0; i < pixels.length; i += 4) {
        let intensity = parseInt(
            pixels[i] * 0.299 + pixels[i + 1] * 0.587 + pixels[i + 2] * 0.114
        );

        pixels[i] = intensity;
        pixels[i + 1] = intensity;
        pixels[i + 2] = intensity;
        pixels[i + 3] = 255;
    }

    return image;
}

function DFT1D(signal, twiddleFactors) {
    const N = signal.length;
    let outputSignal = new Array(N);

    for (let k = 0; k < N; k++) {
        let sum = [0, 0]; // Representing a complex number as [real, imaginary]
        for (let n = 0; n < N; n++) {
            let angleIndex = (k * n) % N; // This works because of periodicity
            let trigPart = twiddleFactors[angleIndex];
            let signalPart = Array.isArray(signal[n])
                ? signal[n]
                : [signal[n], 0];
            sum = complexAdd(sum, complexMultiply(signalPart, trigPart));
        }
        outputSignal[k] = sum;
    }

    return outputSignal;
}

function DFT2D(signal) {
    let height = signal.length;
    let width = signal[0].length;
    let rowTwiddleFactors = computeTwiddleFactors(width);
    let colTwiddleFactors = computeTwiddleFactors(height);

    let rowOutput = new Array(height);
    for (let i = 0; i < height; i++) {
        rowOutput[i] = DFT1D(signal[i], rowTwiddleFactors);
    }

    let output = new Array(height).fill(0).map(() => new Array(width));
    for (let i = 0; i < width; i++) {
        let column = [];
        for (let j = 0; j < height; j++) {
            column[j] = rowOutput[j][i];
        }
        let transformedColumn = DFT1D(column, colTwiddleFactors);
        for (let j = 0; j < height; j++) {
            output[j][i] = transformedColumn[j];
        }
    }

    return output;
}

function IDFT1D(signal, twiddleFactors) {
    const N = signal.length;
    let outputSignal = new Array(N);

    for (let n = 0; n < N; n++) {
        let sum = [0, 0]; // Representing a complex number as [real, imaginary]
        for (let k = 0; k < N; k++) {
            let angleIndex = (n * k) % N; // This works because of periodicity
            let trigPart = twiddleFactors[angleIndex];
            let signalPart = Array.isArray(signal[k])
                ? signal[n]
                : [signal[n], 0];
            sum = complexAdd(sum, complexMultiply(signalPart, trigPart));
        }
        // Apply normalization factor
        outputSignal[n] = [sum[0] / N, sum[1] / N];
    }

    return outputSignal;
}

function IDFT2D(signal) {
    let height = signal.length;
    let width = signal[0].length;
    // Compute twiddle factors for IDFT
    let rowTwiddleFactors = computeTwiddleFactors(width, true);
    let colTwiddleFactors = computeTwiddleFactors(height, true);

    let rowOutput = new Array(height);
    for (let i = 0; i < height; i++) {
        rowOutput[i] = IDFT1D(signal[i], rowTwiddleFactors);
    }

    let output = new Array(height).fill(0).map(() => new Array(width));
    for (let i = 0; i < width; i++) {
        let column = [];
        for (let j = 0; j < height; j++) {
            column[j] = rowOutput[j][i];
        }
        let transformedColumn = IDFT1D(column, colTwiddleFactors);
        for (let j = 0; j < height; j++) {
            output[j][i] = transformedColumn[j];
        }
    }

    return output;
}

// Takes the real part of the IDFT because the original input was real (an image)
function convertIDFTOutputToReal(idftOutput) {
    const height = idftOutput.length;
    const width = idftOutput[0].length;
    let realOutput = new Array(height)
        .fill(0)
        .map(() => new Array(width).fill(0));

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            realOutput[y][x] = idftOutput[y][x][0];
        }
    }

    return realOutput;
}

function computeMagnitudeLog(dftOutput) {
    const height = dftOutput.length;
    const width = dftOutput[0].length;
    let magnitudeLog = new Array(height).fill(0).map(() => new Array(width));

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const mag = Math.sqrt(
                dftOutput[y][x][0] ** 2 + dftOutput[y][x][1] ** 2
            );
            magnitudeLog[y][x] = Math.log(1 + mag); // Adding 1 to avoid log(0)
        }
    }

    return magnitudeLog;
}

function normalizeMagnitude(magnitudeLog) {
    let minVal = Infinity,
        maxVal = -Infinity;

    // Find min and max values
    magnitudeLog.forEach((row) =>
        row.forEach((value) => {
            if (value < minVal) minVal = value;
            if (value > maxVal) maxVal = value;
        })
    );

    // Normalize to [0, 255] range
    const height = magnitudeLog.length;
    const width = magnitudeLog[0].length;
    const normalized = new Array(height).fill(0).map(() => new Array(width));

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            normalized[y][x] =
                ((magnitudeLog[y][x] - minVal) / (maxVal - minVal)) * 255;
        }
    }

    return normalized;
}

// Transforms Canvas's 1D array ImageData.data representation to a 2D array so that the
// pixel's intensity information can be retrieved by knowing the x,y coordinates
function Get2dIntensityRepresenationFromImageData(image) {
    console.log("started Get2dIntensityRepresenationFromImageData");
    const width = image.width;
    const height = image.height;

    let reprImageData = new Array(height);

    for (let i = 0; i < height; i++) {
        reprImageData[i] = new Array(width);
        for (let j = 0; j < width; j++) {
            let imageDataIndex = (i * width + j) * 4;

            reprImageData[i][j] =
                (image.data[imageDataIndex] +
                    image.data[imageDataIndex + 1] +
                    image.data[imageDataIndex + 2]) /
                3;
        }
    }

    console.log("finished Get2dIntensityRepresenationFromImageData");
    return reprImageData;
}

function GetImageDataFrom2dIntensityRepresenation(intensityRepresentation) {
    console.log("started GetImageDataFrom2dIntensityRepresenation");
    let height = intensityRepresentation.length;
    let width = intensityRepresentation[0].length;
    let length = height * width * 4;

    let imageData = new Uint8ClampedArray(length);

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            let imageDataIndex = (i * width + j) * 4;

            imageData[imageDataIndex] = intensityRepresentation[i][j];
            imageData[imageDataIndex + 1] = intensityRepresentation[i][j];
            imageData[imageDataIndex + 2] = intensityRepresentation[i][j];
            imageData[imageDataIndex + 3] = 255;
        }
    }

    console.log("finished GetImageDataFrom2dIntensityRepresenation");

    return imageData;
}

function complexMultiply([a, b], [c, d]) {
    return [a * c - b * d, a * d + b * c];
}

function complexAdd([a, b], [c, d]) {
    return [a + c, b + d];
}

function complexExp(theta) {
    return [Math.cos(theta), Math.sin(theta)];
}

// https://en.wikipedia.org/wiki/Twiddle_factor
function computeTwiddleFactors(N, inverse = false) {
    let twiddleFactors = new Array(N);
    for (let n = 0; n < N; n++) {
        const angle = (2 * Math.PI * n) / N;
        if (inverse) {
            twiddleFactors[n] = [Math.cos(angle), Math.sin(angle)]; // IDFT sign
        } else {
            twiddleFactors[n] = [Math.cos(-angle), Math.sin(-angle)]; // DFT sign
        }
    }
    return twiddleFactors;
}
