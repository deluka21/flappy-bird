// Game variables
let canvas;
let ctx;
let bird;
let pipes = [];
let score = 0;
let gameover = false;

// Bird object
class Bird {
    constructor(x, y, radius, gravity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.gravity = gravity;
        this.velocity = 0;
    }

    flap() {
        this.velocity = -7; // Flap velocity
    }

    update() {
        this.velocity += this.gravity; // Apply gravity
        this.y += this.velocity; // Update position

        // Collision detection
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            gameOver();
        }
    }

    draw() {
        ctx.fillStyle = "#f0db4f"; // Yellow color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Pipe object
class Pipe {
    constructor(x) {
        this.x = x;
        this.y = Math.random() * (canvas.height - 200) + 100; // Random y position
        this.width = 50;
        this.height = 200;
        this.dx = -2; // Pipe speed
    }

    update() {
        this.x += this.dx; // Move pipe to the left

        // Remove pipes that go off-screen
        if (this.x + this.width < 0) {
            pipes.shift(); // Remove first pipe in array
            score++; // Increase score
        }

        // Collision detection with bird
        if (
            bird.x + bird.radius > this.x && bird.x - bird.radius < this.x + this.width &&
            bird.y + bird.radius > this.y && bird.y - bird.radius < this.y + this.height
        ) {
            gameOver();
        }
    }

    draw() {
        ctx.fillStyle = "#6dc2b6"; // Green color
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Game initialization
function startGame() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    bird = new Bird(100, canvas.height / 2, 20, 0.5);

    // Event listeners
    canvas.addEventListener("click", () => bird.flap());

    // Start game loop
    gameLoop();
}

// Main game loop
function gameLoop() {
    if (!gameover) {
        update();
        draw();
        requestAnimationFrame(gameLoop); // Looping
    }
}

// Update game objects
function update() {
    bird.update();

    // Add pipes
    if (frames % 100 === 0) {
        pipes.push(new Pipe(canvas.width));
    }

    // Update pipes
    pipes.forEach(pipe => pipe.update());
}

// Draw game objects
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    // Draw bird
    bird.draw();

    // Draw pipes
    pipes.forEach(pipe => pipe.draw());

    // Draw score
    ctx.fillStyle = "#fff"; // White color
    ctx.font = "24px Arial";
    ctx.fillText(`Score: ${score}`, 20, 40);
}

// Game over function
function gameOver() {
    gameover = true;
    ctx.fillStyle = "black";
    ctx.fillRect(100, 200, 200, 100);
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("Game Over!", 120, 250);
    ctx.fillText(`Score: ${score}`, 140, 290);
}

// Start the game when page loads
window.onload = startGame;
