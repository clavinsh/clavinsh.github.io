"use strict";

const canvas = document.querySelector(".myCanvas");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

const ctx = canvas.getContext("2d");

ctx.fillStyle = "rgb(0,0,0)";
ctx.fillRect(0,0,width, height);


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

        ctx.fillStyle = '#f00';
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }

        ctx.closePath();
        ctx.fill();
    }
}

const points = [];

canvas.addEventListener('click', function(event) {
    

    const rect = canvas.getBoundingClientRect();
    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);

    points.push(new Point(x,y));

    if(points.length >= 3) {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        Polygon.DrawPolygon(ctx, new Polygon(points));

    }
});

// let p1 = new Point(10, 10);
// let p2 = new Point(20, 10);
// let p3 = new Point(20, 100);
// let p4 = new Point(10, 20);

// let polygon = new Polygon([p1, p2, p3, p4]);

// Polygon.DrawPolygon(ctx, polygon);