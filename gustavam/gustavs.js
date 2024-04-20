"use strict";
document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const carWidth = 50;
    const carHeight = 100;
    let carX = canvas.width / 2 - carWidth / 2;
    let carY = canvas.height - carHeight - 20;
    let moveLeft = false;
    let moveRight = false;

    let obstacles = [];
    let gameSpeed = 3;
    let gameRunning = true;
    let gameTimer = 0;

    const enemyImage = new Image();
    const gustavsImage = new Image();

    enemyImage.addEventListener("load", () => {});

    enemyImage.src = "";
    gustavsImage.src = "";

    document.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") moveLeft = true;
        if (e.key === "ArrowRight") moveRight = true;
    });

    document.addEventListener("keyup", function (e) {
        if (e.key === "ArrowLeft") moveLeft = false;
        if (e.key === "ArrowRight") moveRight = false;
    });

    function handleTouchStart(e) {
        const touchX = e.touches[0].clientX;
        const middleX = canvas.width / 2;
        moveLeft = touchX < middleX;
        moveRight = touchX >= middleX;
    }

    function handleTouchEnd(e) {
        moveLeft = false;
        moveRight = false;
    }

    canvas.addEventListener("touchstart", handleTouchStart, false);
    canvas.addEventListener("touchend", handleTouchEnd, false);

    function drawCar() {
        ctx.fillStyle = "red";
        ctx.fillRect(carX, carY, carWidth, carHeight);
    }

    function drawObstacles() {
        ctx.fillStyle = "blue";
        obstacles.forEach((obstacle) => {
            ctx.fillRect(
                obstacle.x,
                obstacle.y,
                obstacle.width,
                obstacle.height
            );
            obstacle.y += obstacle.speed;
        });

        // Remove obstacles that have moved out of view
        obstacles = obstacles.filter((obstacle) => obstacle.y <= canvas.height);
    }

    function generateObstacles() {
        let obstacleGenerationThreshold =
            0.05 + 0.02 * Math.floor(gameTimer / 500); // More rapid increase
        obstacleGenerationThreshold = Math.min(
            obstacleGenerationThreshold,
            0.4
        ); // Higher cap for maximum difficulty

        if (Math.random() < obstacleGenerationThreshold) {
            let obstacleX = Math.random() * (canvas.width - 30);
            let obstacleY = 0;
            let obstacleWidth = 30;
            let obstacleHeight = 30;
            obstacles.push({
                x: obstacleX,
                y: obstacleY,
                width: obstacleWidth,
                height: obstacleHeight,
                speed: 2 + 0.5 * Math.floor(gameTimer / 1000),
            });
        }
    }

    function checkCollision() {
        obstacles.forEach((obstacle) => {
            if (
                carX < obstacle.x + obstacle.width &&
                carX + carWidth > obstacle.x &&
                carY < obstacle.y + obstacle.height &&
                carY + carHeight > obstacle.y
            ) {
                gameRunning = false;
            }
        });
    }

    function gameOver() {
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText(
            "Game Over! Press R to Restart",
            canvas.width / 4,
            canvas.height / 2
        );
        document.addEventListener("keydown", function (e) {
            if (e.key === "r") {
                document.location.reload();
            }
        });
    }

    function updateGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!gameRunning) {
            gameOver();
            return;
        }

        gameTimer++;

        if (moveLeft && carX > 0) carX -= 5;
        if (moveRight && carX < canvas.width - carWidth) carX += 5;

        drawCar();
        generateObstacles();
        drawObstacles();
        checkCollision();
        requestAnimationFrame(updateGame);
    }

    updateGame();
});
