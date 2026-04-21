let blockSize = 25;
let totalRows = 25;
let totalColumns = 25;
let board;
let context;

let snakeXAxis = blockSize * 5;
let snakeYAxis = blockSize * 5;

let velX = 0;
let velY = 0;

let snakeBody = [];

let apples = [];
let volume = 0;

let gameOver = false;

window.onload = function () {
    board = document.getElementById("board");
    board.height = totalRows * blockSize;
    board.width = totalColumns * blockSize;
    context = board.getContext("2d");

    placeAllApples();
    document.addEventListener("keyup", switchDirection);
    setInterval(update, 1000 / 10);
};

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle = "white";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "black";
    context.font = "20px Comic Sans MS";
    context.fillText("Volume: " + volume, 10, 25);

    for (let i = 0; i < apples.length; i++) {
        context.fillStyle = apples[i].color;
        context.fillRect(apples[i].x, apples[i].y, blockSize, blockSize);
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeXAxis, snakeYAxis];
    }

    snakeXAxis += velX * blockSize;
    snakeYAxis += velY * blockSize;

    for (let i = 0; i < apples.length; i++) {
        if (snakeXAxis == apples[i].x && snakeYAxis == apples[i].y) {
            volume += apples[i].value;
            snakeBody.push([0, 0]);

            if (volume < 0) {
                volume = 0;
            }

            respawnApple(i);
        }
    }

    context.fillStyle = "green";
    context.fillRect(snakeXAxis, snakeYAxis, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (
        snakeXAxis < 0 ||
        snakeXAxis >= totalColumns * blockSize ||
        snakeYAxis < 0 ||
        snakeYAxis >= totalRows * blockSize
    ) {
        endGame();
        return;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeXAxis == snakeBody[i][0] && snakeYAxis == snakeBody[i][1]) {
            endGame();
            return;
        }
    }
}

function switchDirection(e) {
    if (e.key == "ArrowUp" && velY != 1) {
        velX = 0;
        velY = -1;
    } 
    else if (e.key == "ArrowDown" && velY != -1) {
        velX = 0;
        velY = 1;
    } 
    else if (e.key == "ArrowLeft" && velX != 1) {
        velX = -1;
        velY = 0;
    } 
    else if (e.key == "ArrowRight" && velX != -1) {
        velX = 1;
        velY = 0;
    }
}

function placeAllApples() {
    apples = [
        createApple("red", 1),
        createApple("gold", 5),
        createApple("blue", -1),
        createApple("black", -5)
    ];
}

function createApple(color, value) {
    return {
        x: Math.floor(Math.random() * totalColumns) * blockSize,
        y: Math.floor(Math.random() * totalRows) * blockSize,
        color: color,
        value: value
    };
}

function respawnApple(index) {
    let color = apples[index].color;
    let value = apples[index].value;
    apples[index] = createApple(color, value);
}

function endGame() {
    gameOver = true;
    alert("Game Over");
    restartGame();
}

function restartGame() {
    snakeXAxis = blockSize * 5;
    snakeYAxis = blockSize * 5;
    velX = 0;
    velY = 0;
    snakeBody = [];
    volume = 0;
    gameOver = false;
    placeAllApples();
}