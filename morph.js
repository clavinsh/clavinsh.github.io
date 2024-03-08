"use strict";

const canvas = document.querySelector(".myCanvas");
const mainButton = document.querySelector('#mainButton');
const resetButton = document.querySelector('#resetButton');
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const ctx = canvas.getContext("2d");

class Point {
    constructor(x,y) {
        if(!Number.isInteger(x) || !Number.isInteger(y)) {
            throw new Error('Coordinate arguments for a point have to be integers');
        }

        this.x = x;
        this.y = y;
    }

    static distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        // Since we are working with whole number coordinates (pixels on the canvas)
        // Distance should also be converted to a whole number - integer
        return Math.round(Math.hypot(dx, dy), 10);
    }
}

class Polygon {
    constructor(points) {
        if(!Array.isArray(points)) {
            throw new Error('Point argument has to be an array');
        }

        if(!points.every(point => point instanceof Point)) {
            throw new Error('All elements in the array have to be of type Point');
        }

        this.points = points;
    }

    // draws a given polygon in a canvas
    static DrawPolygon(ctx, polygon) {
        let points = polygon.points;

        // nothing to draw, so just return
        if(points.length === 0)
        {
            return;
        }

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }

        ctx.closePath();
        ctx.fill();

        Polygon.DrawVertices(ctx, polygon);
    }

    static DrawVertices(ctx, polygon) {
        let points = polygon.points;

        if(points.length === 0) {
            return;
        }

        ctx.fillStyle = "red";

        for(let i = 0; i < points.length; i++) {
            ctx.fillRect(points[i].x,points[i].y,5,5);
        }

        ctx.fillStyle = "black";
    }

    // adjust the vertex array and sorts them, if needed,
    // so that both polygons are drawn clock-wise 
    static NormalizePolygon(polygon) {

        if (calculateSignedArea(polygon) > 0) {
            polygon.points.slice().reverse(); // Reverse if counter-clockwise
        }

        // Simple function to calculate signed area of a polygon (for orientation)
        // Shoelace formula
        function calculateSignedArea(polygon) {
            let area = 0;
            for (let i = 0; i < polygon.points.length; i++) {
                let j = (i + 1) % polygon.points.length;
                area += polygon.points[i].x * polygon.points[j].y - polygon.points[j].x * polygon.points[i].y;
            }
            return area / 2;
        }
    }

    // divides one of the given polygons into more vertices,
    // so that the vertex count matches between the polygons
    static EqualizePolygons(polygon1, polygon2) {
        let pointDiff = polygon1.points.length - polygon2.points.length;

        // check which polygon needs to be divided
        if(pointDiff > 0) {
            DividePolygon(polygon2, Math.abs(pointDiff));
        }
        else if (pointDiff < 0) {
            DividePolygon(polygon1, Math.abs(pointDiff));
        }

        // divides the given polygon 'diff' number of times by going round-n-round the vertices
        function DividePolygon(polygon, diff) {
            let firstEdgeSplitPoint = 0;
            
            for(let i = 0; i < diff; i++) {
                let secondEdgeSplitPoint = (firstEdgeSplitPoint + 1) % (polygon.points.length);

                console.log(firstEdgeSplitPoint, secondEdgeSplitPoint);

                let xMidPoint = Math.round((polygon.points[secondEdgeSplitPoint].x + polygon.points[firstEdgeSplitPoint].x)/2);
                let yMidPoint = Math.round((polygon.points[secondEdgeSplitPoint].y + polygon.points[firstEdgeSplitPoint].y)/2);

                // inserts the new vertex right after the first vertex
                polygon.points.splice(firstEdgeSplitPoint + 1, 0,  new Point(xMidPoint, yMidPoint));

                firstEdgeSplitPoint = (secondEdgeSplitPoint + 1) % (polygon.points.length);
            }
        }
    }

    static MorphPolygons(ctx, polygon1, polygon2, duration = 10000) {
        
        const frameRate = 60;
        const totalFrames = Math.round(frameRate *  duration / 1000);
        let frame = 0;

        let points1 = polygon1.points;
        let points2 = polygon2.points;

        Polygon.NormalizePolygon(polygon1);
        Polygon.NormalizePolygon(polygon2);
        Polygon.EqualizePolygons(polygon1, polygon2);

        const diffs = points1.map((point, i) => ({
            dx: (points2[i].x - point.x) / totalFrames,
            dy: (points2[i].y - point.y) / totalFrames,
        }));

        function animate() {
            if(frame < totalFrames) {
                ctx.clearRect(0,0,canvas.width, canvas.height);

                // linear interpolation to calculate the intermediate vertices
                // between the two polygons
                const intermediatePoints = points1.map((point, i) => new Point(
                    Math.round(point.x + diffs[i].dx * frame),
                    Math.round(point.y + diffs[i].dy * frame),
                ));

                Polygon.DrawPolygon(ctx, new Polygon(intermediatePoints));
                frame++;
                requestAnimationFrame(animate);
            } else {
                ctx.clearRect(0,0,canvas.width, canvas.height);
                //the final-final frame is the second polygon
                Polygon.DrawPolygon(ctx, polygon2);
            }
        }

        animate();
    }
}

let currentPoints = [];
let firstPolPoints = [];
let secondPolPoints = [];


canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);

    currentPoints.push(new Point(x,y));

    if(currentPoints.length >= 3) {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        Polygon.DrawPolygon(ctx, new Polygon(currentPoints));
    }
});

mainButton.addEventListener('click', function(event){
    let state = mainButton.dataset.state;
    if(state === '0') {
        console.log('state 0');
        if(currentPoints.length >= 3) {
            mainButton.dataset.state = '1';
            firstPolPoints = currentPoints.slice();
            clearCurrentPoints();
            ctx.clearRect(0,0, canvas.width, canvas.height);
        }
    }
    else if (state === '1') {
        console.log('state 1');
        if(currentPoints.length >= 3) {
            mainButton.dataset.state = '0';
            secondPolPoints = currentPoints.slice();
            clearCurrentPoints();
            ctx.clearRect(0,0, canvas.width, canvas.height);

            // call a function that animates
            Polygon.MorphPolygons(ctx, new Polygon(firstPolPoints), new Polygon(secondPolPoints));
        }
    }
});

resetButton.addEventListener('click', function(event) {
    clearCurrentPoints();
    ctx.clearRect(0,0, canvas.width, canvas.height);
});

function clearCurrentPoints() {
    currentPoints.length = 0;
}