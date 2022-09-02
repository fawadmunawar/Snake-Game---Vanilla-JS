
let score = 0;


//Board
let rows = 20;
let Col = 20;
let BlockSize = 25;
let Board;
let Context;

//snake head
let snakeX = BlockSize * 5;
let snakeY = BlockSize * 5;

let velocityX = 0;
let velocityY = 0;

//snake body
let snakeBody = [];

//food
let foodX;
let foodY;

//Gameover
let gameOver = false

window.onload = function() {
    Board = document.getElementById("board");
    Board.height = rows * BlockSize;
    Board.width = Col * BlockSize;
    Context = Board.getContext("2d");

    document.addEventListener("keyup", changeDirection);

    foodPlace();
    setInterval(update, 90);
}

function changeDirection(e) {
    if(e.code == 'ArrowUp' && velocityY != 1){
        velocityY = -1;
        velocityX = 0;
    }
    else if(e.code == 'ArrowDown' && velocityY != -1){
        velocityY = 1;
        velocityX = 0;
    }
    else if(e.code == 'ArrowLeft' && velocityX != 1){
        velocityY = 0;
        velocityX = -1;
    }
    else if(e.code == 'ArrowRight' && velocityX != -1){
        velocityY = 0;
        velocityX = 1;
    }
}

function update() {
    if(gameOver){
        return;
    }
    Context.fillStyle = "black";
    Context.fillRect(0, 0, Board.width, Board.height);

    Context.fillStyle = "red";
    Context.fillRect(foodX, foodY, BlockSize, BlockSize);

    if(snakeX == foodX && snakeY == foodY){
        score++;
        document.getElementById("score").innerText = score
        snakeBody.push([foodX, foodY]);
        foodPlace();
    }

    for(let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    Context.fillStyle = "lime";
    snakeX += velocityX  * BlockSize;
    snakeY += velocityY  * BlockSize;
    Context.fillRect(snakeX, snakeY, BlockSize, BlockSize); //first two arguments are position and other two are width and height

    for(let i = 0; i < snakeBody.length; i++){
        Context.fillRect(snakeBody[i][0], snakeBody[i][1], BlockSize, BlockSize);
    }

    //Game over conditions
    if(snakeX < 0 || snakeX > Col * BlockSize || snakeY < 0 || snakeY > rows * BlockSize){
        gameOver = true;
        alert("Game Over");
    }

    for(let i = 0; i < snakeBody.length; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            alert("Game Over");
        }
    }
}


function foodPlace() {
    foodX = Math.floor(Math.random()*20) * BlockSize;
    foodY = Math.floor(Math.random()*20) * BlockSize;
}