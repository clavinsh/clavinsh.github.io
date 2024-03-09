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

    // adjust the vertex array and sorts them, if needed,
    // so that both polygons are drawn clock-wise
    NormalizePolygon() {
        if (CalculateSignedArea(this.vertices) > 0) {
            this.vertices = this.vertices.slice().reverse(); // Reverse if counter-clockwise
        }

        // Simple function to calculate signed area of a polygon (for orientation)
        // Shoelace formula
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

    // divides the given polygon 'diff' number of times by going round-n-round the vertices
    DividePolygonOld(neededVertexCount) {
        // Helper function to calculate distance between two points
        const distance = (pointA, pointB) =>
            Math.sqrt(
                Math.pow(pointA.x - pointB.x, 2) +
                    Math.pow(pointA.y - pointB.y, 2)
            );

        // Helper function to insert a vertex at the midpoint of an edge
        const insertMidpoint = (edge) => ({
            x: (edge[0].x + edge[1].x) / 2,
            y: (edge[0].y + edge[1].y) / 2,
        });

        let additionalVertices = neededVertexCount - this.vertices.length; // Calculate how many vertices to add
        if (additionalVertices <= 0) return; // No need to add vertices

        let edges = [];
        for (let i = 0; i < this.vertices.length; i++) {
            // Create edges from vertices
            edges.push([
                this.vertices[i],
                this.vertices[(i + 1) % this.vertices.length],
            ]);
        }

        // Calculate edge lengths and sort edges by length descending
        let edgeLengths = edges
            .map((edge) => ({
                edge: edge,
                length: distance(edge[0], edge[1]),
            }))
            .sort((a, b) => b.length - a.length);

        while (additionalVertices > 0) {
            for (
                let i = 0;
                i < edgeLengths.length && additionalVertices > 0;
                i++
            ) {
                let midpoint = insertMidpoint(edgeLengths[i].edge);
                // Replace the current edge with two new edges by adding the midpoint
                this.vertices.splice(
                    this.vertices.indexOf(edgeLengths[i].edge[1]),
                    0,
                    midpoint
                );
                additionalVertices--;
            }
        }

        console.log("divided polygon", this);
    }

    DividePolygonPlagiatisms(totalVertices) {
        const distance = (a, b) =>
            Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
        const interpolate = (a, b, fraction) => ({
            x: a.x + (b.x - a.x) * fraction,
            y: a.y + (b.y - a.y) * fraction,
        });

        // Calculate the perimeter of the polygon
        let perimeter = 0;
        for (let i = 0; i < this.vertices.length; i++) {
            const nextIndex = (i + 1) % this.vertices.length;
            perimeter += distance(this.vertices[i], this.vertices[nextIndex]);
        }

        const newVerticesCount = totalVertices - this.vertices.length;
        const spacing = perimeter / totalVertices;

        let newVertices = [];
        let accumulatedDistance = 0;

        for (
            let i = 0, j = 1 % this.vertices.length;
            newVertices.length < newVerticesCount;
            i = j, j = (j + 1) % this.vertices.length
        ) {
            const edgeLength = distance(this.vertices[i], this.vertices[j]);
            accumulatedDistance += edgeLength;

            while (
                accumulatedDistance >= spacing &&
                newVertices.length < newVerticesCount
            ) {
                accumulatedDistance -= spacing;
                // Calculate where to place the new vertex along the current edge
                const fraction =
                    (edgeLength - accumulatedDistance) / edgeLength;
                newVertices.push(
                    interpolate(this.vertices[i], this.vertices[j], fraction)
                );
            }
        }

        // Interleave original vertices with the new vertices, ensuring they are in the correct order
        let result = [];
        for (let i = 0; i < this.vertices.length; i++) {
            result.push(this.vertices[i]);
            while (
                newVertices.length > 0 &&
                distance(result[result.length - 1], newVertices[0]) <
                    distance(
                        result[result.length - 1],
                        this.vertices[(i + 1) % this.vertices.length]
                    )
            ) {
                result.push(newVertices.shift());
            }
        }

        this.vertices = result;
    }

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
