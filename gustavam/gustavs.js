document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const carImage = new Image();
    carImage.src = "ra_273000000_skoda-octavia-2009-rear-view_4x.png";
    const enemyImage = new Image();
    enemyImage.src =
        "Ryan+Gosling+in+Drive_wide-76786f8494fcb99a1cbc7251550926d68f0add7a-s1100-c50-2909212033.jpg";
    const roadImage = new Image();
    roadImage.src = "1000_F_608838939_blJP3IX1IYJeHaUOYQidTDkgeD5RUVzE.jpg";

    carImage.onload = function () {
        carImage.dimensions = getScaledDimensions(
            carImage,
            maxCarWidth,
            maxCarHeight
        );
    };
    enemyImage.onload = function () {
        enemyImage.dimensions = getScaledDimensions(
            enemyImage,
            maxObstacleWidth,
            maxObstacleHeight
        );
    };

    const carWidth = 50;
    const carHeight = 100;
    let carX = canvas.width / 2 - carWidth / 2;
    let carY = canvas.height - carHeight - 20;
    let moveLeft = false;
    let moveRight = false;
    let backgroundY = 0;
    let obstacles = [];
    let score = 0;
    let gameSpeed = 3;
    let gameRunning = true;
    let gameTimer = 0;

    const maxCarWidth = 50;
    const maxCarHeight = 100;
    const maxObstacleWidth = 50;
    const maxObstacleHeight = 100;

    function getScaledDimensions(img, maxWidth, maxHeight) {
        if (
            !img.dimensions ||
            img.maxWidth !== maxWidth ||
            img.maxHeight !== maxHeight
        ) {
            let ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
            img.dimensions = {
                width: img.width * ratio,
                height: img.height * ratio,
            };
            img.maxWidth = maxWidth;
            img.maxHeight = maxHeight;
        }
        return img.dimensions;
    }

    canvas.addEventListener("touchstart", handleTouchStart, false);
    canvas.addEventListener("touchend", handleTouchEnd, false);
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

    function drawBackground() {
        backgroundY += gameSpeed;
        if (backgroundY >= canvas.height) backgroundY = 0;
        ctx.drawImage(
            roadImage,
            0,
            backgroundY - canvas.height,
            canvas.width,
            canvas.height
        );
        ctx.drawImage(roadImage, 0, backgroundY, canvas.width, canvas.height);
    }

    function drawCar() {
        let carDimensions = getScaledDimensions(
            carImage,
            maxCarWidth,
            maxCarHeight
        );

        ctx.drawImage(
            carImage,
            carX,
            carY,
            carDimensions.width,
            carDimensions.height
        );
    }

    function generateObstacles() {
        let obstacleGenerationThreshold =
            0.05 + 0.02 * Math.floor(gameTimer / 500);
        obstacleGenerationThreshold = Math.min(
            obstacleGenerationThreshold,
            0.4
        );
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

    function drawObstacles() {
        obstacles.forEach((obstacle) => {
            let obstacleDimensions = getScaledDimensions(
                enemyImage,
                maxObstacleWidth,
                maxObstacleHeight
            );
            ctx.drawImage(
                enemyImage,
                obstacle.x,
                obstacle.y,
                obstacleDimensions.width,
                obstacleDimensions.height
            );
            obstacle.y += obstacle.speed;
        });
        obstacles = obstacles.filter((obstacle) => obstacle.y <= canvas.height);
    }

    function checkCollision() {
        const carDimensions = getScaledDimensions(carImage, 50, 100);
        obstacles.forEach((obstacle) => {
            const obstacleDimensions = getScaledDimensions(enemyImage, 30, 30);
            if (
                carX < obstacle.x + obstacleDimensions.width &&
                carX + carDimensions.width > obstacle.x &&
                carY < obstacle.y + obstacleDimensions.height &&
                carY + carDimensions.height > obstacle.y
            ) {
                gameRunning = false;
            }
        });
    }
    function updateScore() {
        score++;
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.fillText("Score: " + score, 10, 30);
    }

    function gameOver() {
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText(
            "Iemācies rev-matchot! Spied R, lai restartētu!",
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
        drawBackground();
        if (moveLeft && carX > 0) carX -= 5;
        if (moveRight && carX < canvas.width - carWidth) carX += 5;
        drawCar();
        generateObstacles();
        drawObstacles();
        checkCollision();
        updateScore();
        gameTimer++;
        requestAnimationFrame(updateGame);
    }

    updateGame();
});
