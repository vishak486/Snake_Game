// Drawing the Game Board
const canvas = document.getElementById("snakecanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

// Snake properties
let snake;
let snakeLength;

// Food properties
let food;

// Movement direction (dx, dy)
let dx, dy;

// Score properties
let score;
let highScore = 0;

// Function to reset the game
function resetGame() {
    snake = [{ x: 10, y: 10 }];
    snakeLength = 1;
    food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
    dx = 1;
    dy = 0;
    score = 0; // Reset score
    updateScoreDisplay();
}

// Change direction of the snake
function changeDirection(event) {
    const LEFT_KEY = 37;
    const UP_KEY = 38;
    const RIGHT_KEY = 39;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;

    if (keyPressed === LEFT_KEY && dx === 0) {
        dx = -1;
        dy = 0;
    } else if (keyPressed === UP_KEY && dy === 0) {
        dx = 0;
        dy = -1;
    } else if (keyPressed === RIGHT_KEY && dx === 0) {
        dx = 1;
        dy = 0;
    } else if (keyPressed === DOWN_KEY && dy === 0) {
        dx = 0;
        dy = 1;
    }
}

// Update the snake's position
function updateSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Check if snake eats the food
    if (head.x === food.x && head.y === food.y) {
        snakeLength++;
        score++; // Increase score
        // Update high score if the current score is greater
        if (score > highScore) {
            highScore = score;
        }
        // Generate new food location
        food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
        updateScoreDisplay(); // Update score display
    } else {
        // Remove the last part of the snake if not growing
        if (snake.length > snakeLength) {
            snake.pop();
        }
    }
}

// Draw the snake on the canvas
function drawSnake() {
    ctx.fillStyle = "black";
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

// Draw the food on the canvas
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Draw border around the canvas
function drawBorder() {
    ctx.strokeStyle = 'black'; // Border color
    ctx.lineWidth = 2;         // Border thickness
    ctx.strokeRect(0, 0, canvas.width, canvas.height); // Draw the border
}

// Check for collisions with the wall or itself
function checkCollision() {
    const head = snake[0];

    // Check if the snake hits the wall
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        return true;
    }

    // Check if the snake hits itself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }

    return false;
}

// Update score display
function updateScoreDisplay() {
    document.getElementById("score").innerText = `Score: ${score}`;
    document.getElementById("highscore").innerText = `High Score: ${highScore}`;
}

// Game loop to refresh the canvas
function gameLoop() {
    if (checkCollision()) {
        alert("Game Over");
        resetGame(); // Reset the game after game over
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    drawBorder();   // Draw the border
    drawFood();     // Draw food
    updateSnake();  // Update snake's position
    drawSnake();    // Draw the snake

    setTimeout(gameLoop, 100); // Set game speed
}

document.addEventListener('keydown', changeDirection);

// Start the game
resetGame();
gameLoop();
