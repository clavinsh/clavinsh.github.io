"use strict";

const canvas = document.querySelector(".myCanvas");
const mainButton = document.querySelector("#mainButton");
const resetButton = document.querySelector("#resetButton");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const ctx = canvas.getContext("2d");

class Polygon {
    constructor(vertices) {
        if (!Array.isArray(vertices)) {
            throw new Error("Argument vertices has to be an array");
        }

        if (
            !vertices.every(
                (vertex) =>
                    vertex &&
                    typeof vertex === "object" &&
                    "x" in vertex &&
                    "y" in vertex
            )
        ) {
            throw new Error(
                "All elements in the array have to be an object in the form of {x: value, y: value}"
            );
        }

        this.vertices = vertices;
    }

    // uzzīmē daudzstūri canvas kontekstā 'ctx'
    // velk figūru starp visām daudzstūra virsotnēm un tad aizpilda to
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath
    DrawPolygon(ctx) {
        if (this.vertices === 0) {
            return;
        }

        ctx.beginPath();
        ctx.moveTo(this.vertices[0].x, this.vertices[0].y);

        for (let i = 1; i < this.vertices.length; i++) {
            ctx.lineTo(this.vertices[i].x, this.vertices[i].y);
        }

        ctx.closePath();
        ctx.fill();

        DrawVertices(ctx, this);

        function DrawVertices(ctx, polygon) {
            if (polygon.vertices.length === 0) {
                return;
            }

            ctx.fillStyle = "red";

            for (let i = 0; i < polygon.vertices.length; i++) {
                ctx.fillRect(
                    polygon.vertices[i].x,
                    polygon.vertices[i].y,
                    5,
                    5
                );
            }

            ctx.fillStyle = "black";
        }
    }

    // sakārto daudzstūra virsotņu masīvu, tā lai tas tiek zīmēts pulksteņarād. virzienā
    NormalizePolygon() {
        if (CalculateSignedArea(this.vertices) > 0) {
            this.vertices = this.vertices.slice().reverse(); // masīvs tiek invertēts, jo daudzstūris ir pret. plkst.rād. virzienam
        }

        // Funkcija, kas izrēķina daudzstūra laukumu
        // Laukums būs negatīvs, ja daudzstūra masīvs kārtots pret. plkst.rād. virzienam
        // https://en.wikipedia.org/wiki/Shoelace_formula
        function CalculateSignedArea(vertices) {
            let area = 0;
            for (let i = 0; i < vertices.length; i++) {
                let j = (i + 1) % vertices.length;
                area +=
                    vertices[i].x * vertices[j].y -
                    vertices[j].x * vertices[i].y;
            }
            return area / 2;
        }
    }

    // ievieto daudzstūri vēl papildus 'diff' skaita virsotnes
    // pamatā iet round-n-round un starp divām virsotnēm ievieto pa vidu jaunu,
    // jeb daudzstūra malu sadala uz pusēm
    DividePolygon(diff) {
        let edgeFirstVertex = 0;

        for (let i = 0; i < diff; i++) {
            let edgeSecondVertex = (edgeFirstVertex + 1) % this.vertices.length;

            let xMidPoint =
                (this.vertices[edgeSecondVertex].x +
                    this.vertices[edgeFirstVertex].x) /
                2;
            let yMidPoint =
                (this.vertices[edgeSecondVertex].y +
                    this.vertices[edgeFirstVertex].y) /
                2;

            this.vertices.splice(edgeFirstVertex + 1, 0, {
                x: xMidPoint,
                y: yMidPoint,
            });

            edgeFirstVertex = (edgeFirstVertex + 2) % this.vertices.length;
        }
    }

    // novienādo doto daudzstūru virsotņu skaitu, tā lai tās sakrīt
    // atvieglo morfēšanu, jo katrai virsotnei no polygon1 var piekārtot otru virsotni no polygon2
    static EqualizePolygons(polygon1, polygon2) {
        let vertexCountDiff =
            polygon1.vertices.length - polygon2.vertices.length;

        // check which polygon needs to be divided
        if (vertexCountDiff > 0) {
            polygon2.DividePolygon(Math.abs(vertexCountDiff));
        } else if (vertexCountDiff < 0) {
            polygon1.DividePolygon(Math.abs(vertexCountDiff));
        }
    }

    // veic doto daudzstūru normalizēšanu, virsotņu skaita vienādošanu
    // veic linēaro interpolāciju, lai iegūtu starp-posmu daudzstūri
    // animēšana veikta ar Canvas API iespējām
    // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations
    static MorphPolygons(ctx, polygon1, polygon2, duration = 10000) {
        const frameRate = 60;
        const totalFrames = Math.round((frameRate * duration) / 1000);
        let frame = 0;

        console.log(polygon1, polygon2);

        polygon1.NormalizePolygon();
        polygon2.NormalizePolygon();
        Polygon.EqualizePolygons(polygon1, polygon2);

        let vertices1 = polygon1.vertices;
        let vertices2 = polygon2.vertices;

        const diffs = vertices1.map((vertex, i) => ({
            dx: (vertices2[i].x - vertex.x) / totalFrames,
            dy: (vertices2[i].y - vertex.y) / totalFrames,
        }));

        function animate() {
            if (frame < totalFrames) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // linear interpolation to calculate the intermediate vertices
                // between the two polygons
                const intermediateVertices = vertices1.map((vertex, i) => ({
                    x: Math.round(vertex.x + diffs[i].dx * frame),
                    y: Math.round(vertex.y + diffs[i].dy * frame),
                }));

                let intermediatePolygon = new Polygon(intermediateVertices);
                intermediatePolygon.DrawPolygon(ctx);

                frame++;
                requestAnimationFrame(animate);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                //the final-final frame is the second polygon
                polygon2.DrawPolygon(ctx);
            }
        }

        animate();
    }
}

let currentPolygon = new Polygon([]);
let firstPolygon = new Polygon([]);
let secondPolygon = new Polygon([]);

canvas.addEventListener("click", function (event) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);

    currentPolygon.vertices.push({ x: x, y: y });

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    currentPolygon.DrawPolygon(ctx);
});

mainButton.addEventListener("click", function (event) {
    let state = mainButton.dataset.state;
    if (state === "0") {
        console.log("state 0");
        if (currentPolygon.vertices.length >= 3) {
            mainButton.dataset.state = "1";
            firstPolygon = new Polygon(currentPolygon.vertices.slice());
            clearCurrentPolygon();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    } else if (state === "1") {
        console.log("state 1");
        if (currentPolygon.vertices.length >= 3) {
            mainButton.dataset.state = "0";
            secondPolygon = new Polygon(currentPolygon.vertices.slice());
            clearCurrentPolygon();
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // call a function that animates
            Polygon.MorphPolygons(ctx, firstPolygon, secondPolygon);
        }
    }
});

resetButton.addEventListener("click", function (event) {
    clearCurrentPolygon();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function clearCurrentPolygon() {
    currentPolygon.vertices.length = 0;
}
