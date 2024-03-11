"use strict";

const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");

const input = document.querySelector("#imgInput");

input.addEventListener("change", drawInputImageToCanvas);

function drawInputImageToCanvas(event) {
    const file = event.target.files[0];
    const image = new Image();

    const url = URL.createObjectURL(file);

    image.onload = function () {
        URL.revokeObjectURL(url);
        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image, 0, 0, image.width, image.height);
    };

    image.src = url;
}

// since DFT works only with intensity and color cannot be represented with a single number,
// input images have to be converted to grayscale
function convertToGrayscale(image) {}
