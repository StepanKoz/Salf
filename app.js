const tg = window.Telegram.WebApp;
tg.expand();

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = Math.min(390, window.innerHeight - 40); // Учитываем отступы

canvas.width = canvasSize;
canvas.height = canvasSize;

let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

let food = {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box
};

let score = 0;
let d;

document.addEventListener("keydown", direction);

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

canvas.addEventListener('touchstart', handleTouchStart, false);
canvas.addEventListener('touchend', handleTouchEnd, false);

function handleTouchStart(event) {
    const firstTouch = event.touches[0];
    touchStartX = firstTouch.clientX;
    touchStartY = firstTouch.clientY;
}

function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].clientX;
    touchEndY = event.changedTouches[0].clientY;
    handleSwipe();
}

function handleSwipe() {
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0 && d != "LEFT") {
            d = "RIGHT";
        } else if (diffX < 0 && d != "RIGHT") {
            d = "LEFT";
        }
    } else {
        if (diffY > 0 && d != "UP") {
            d = "DOWN";
        } else if (diffY < 0 && d != "DOWN") {
            d = "UP";
        }
    }
}

function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (event.keyCode == 38 && d != "DOWN") {
        d = "UP";
    } else if (event.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (event.keyCode == 40 && d != "UP") {
        d = "DOWN";
    }
}

function collision(newHead, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "orange" : "goldenrod"; // Цвета змейки
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "darkorange"; // Обводка змейки
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(food.x + box / 2, food.y + box / 2, box / 2, 0, Math.PI * 2);
    ctx.fill();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box
        };
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (
        snakeX < 0 ||
        snakeY < 0 ||
        snakeX >= canvasSize ||
        snakeY >= canvasSize ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "25px Arial";
    ctx.fillText(score, box, 1.6 * box);
}

let game = setInterval(draw, 100);

document.addEventListener('touchmove', function(event) {
    event.preventDefault();
}, { passive: false });

document.addEventListener('gesturestart', function(event) {
    event.preventDefault();
    document.body.style.zoom = 1.0;
}, { passive: false });

document.addEventListener('gesturechange', function(event) {
    event.preventDefault();
    document.body.style.zoom = 1.0;
}, { passive: false });

document.addEventListener('gestureend', function(event) {
    event.preventDefault();
    document.body.style.zoom = 1.0;
}, { passive: false });
