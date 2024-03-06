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
    }

    // to be completed!!!
    static EqualizePolygons(polygon1, polygon2) {
        let points1 = polygon1.points;
        let points2 = polygon2.points;

        if(points1.length > points2.length) {
            let pointDiff = points1.length - points2.length;

            let firstEdgeSplitPoint = 0;
            let secondEdgeSplitPoint = 1;
            
            for(let i = 0; i < pointDiff; i++) {
                let xMidPoint = Math.round((polygon2.points[secondEdgeSplitPoint].x + polygon2.points[firstEdgeSplitPoint].x)/2);
                let yMidPoint = Math.round((polygon2.points[secondEdgeSplitPoint].y + polygon2.points[firstEdgeSplitPoint].y)/2);

                polygon2.points.splice(firstEdgeSplitPoint, 0,  new Point(xMidPoint, yMidPoint));

                firstEdgeSplitPoint = (firstEdgeSplitPoint + 2) % (polygon2.points.length);
                secondEdgeSplitPoint = (firstEdgeSplitPoint + 1) % (polygon2.points.length);
            }
        }
        else if (points1.length < points2.length) {
            let pointDiff = points2.length - points1.length;

            let firstEdgeSplitPoint = 0;
            let secondEdgeSplitPoint = 1;
            
            for(let i = 0; i < pointDiff; i++) {
                let xMidPoint = Math.round((points1[secondEdgeSplitPoint].x + points1[firstEdgeSplitPoint].x)/2);
                let yMidPoint = Math.round((points1[secondEdgeSplitPoint].y + points1[firstEdgeSplitPoint].y)/2);

                polygon1.points.splice(firstEdgeSplitPoint, 0,  new Point(xMidPoint, yMidPoint));
                firstEdgeSplitPoint = (firstEdgeSplitPoint + 2) % (polygon1.points.length + 1);
                secondEdgeSplitPoint = firstEdgeSplitPoint + 1 % (polygon1.points.length + 1);
            }
        }
    }

    static MorphPolygons(ctx, polygon1, polygon2, duration = 10000) {
        
        const frameRate = 60;
        const totalFrames = (duration / 1000) * frameRate;
        let frame = 0;

        let points1 = polygon1.points;
        let points2 = polygon2.points;

        console.log(polygon1, polygon2);
        Polygon.EqualizePolygons(polygon1, polygon2);
        console.log(polygon1, polygon2);

        const diffs = points1.map((point, i) => ({
            dx: (points2[i].x - point.x) / totalFrames,
            dy: (points2[i].y - point.y) / totalFrames,
        }));

        function animate() {
            if(frame < totalFrames) {
                ctx.clearRect(0,0,canvas.width, canvas.height);

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