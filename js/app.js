
const cosmonaut = document.getElementById ('cosmonaut');
const scoreDisplay = document.getElementById('score');
const resetButton = document.getElementById('reset-button');
const messageDisplay = document.getElementById('message');
const showInstructionsBtn = document.getElementById('show-instructions'); 
const instructionsContainer = document.getElementById('instructions-container'); 
const closeInstructionsBtn = document.getElementById('close-instructions');

let playerScore = 100;
let gameInterval;
let asteroidInterval;
let powerInterval;
let cosmonautPosition = 50;

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && cosmonautPosition > 0) {
        cosmonautPosition -= 5;
    } else if (event.key === 'ArrowRight' && cosmonautPosition < 95) {
        cosmonautPosition += 5;
    }
    cosmonaut.style.left = cosmonautPosition + '%';
});

//show instructions

showInstructionsBtn.addEventListener('click', () => { 
    instructionsContainer.style.display = 'flex'; 
}); 

//close instructions

closeInstructionsBtn.addEventListener('click', () => { 
    instructionsContainer.style.display = 'none'; 
});

// create asteroids

function createAsteroid() {
    const asteroid = document.createElement('div');
    asteroid.classList.add('asteroid');
    asteroid.style.left = Math.random() * 100 + '%';
    asteroid.style.top = '-30px';
    document.getElementById('game-container').appendChild(asteroid);

    // Move asteroids

    let asteroidPosition = 0;
    const fallInterval = setInterval(() => {
        asteroidPosition += 5;
        asteroid.style.top = asteroidPosition + 'px';

        // Collision

        if (checkCollision(asteroid)) {
            playerScore -= getRandomPoints();
            scoreDisplay.textContent = 'Points: ' + playerScore;
            clearInterval(fallInterval);
            asteroid.remove();
        }

        // clear asteroid

        if (asteroidPosition > window.innerHeight) {
            clearInterval(fallInterval);
            asteroid.remove();
        }

    }, 50);
}

// Create powers

function createPower() {
    const power = document.createElement('div');
    power.classList.add('power');
    power.style.left = Math.random() * 100 + '%';
    power.style.top = '-30px';
    document.getElementById('game-container').appendChild(power);

    // Move power

    let powerPosition = 0;
    const fallInterval = setInterval(() => {
        powerPosition += 5;
        power.style.top = powerPosition + 'px';

        // Collision

        if (checkCollision(power)) {
            playerScore += getPowerPoints();
            scoreDisplay.textContent = 'Points: ' + playerScore;
            clearInterval(fallInterval);
            power.remove();
        }

        // clear power

        if (powerPosition > window.innerHeight) {
            clearInterval(fallInterval);
            power.remove();
        }

    }, 50);
}

// collision with cosmonaut

function checkCollision(object) {
    const cosmonautRect = cosmonaut.getBoundingClientRect();
    const objectRect = object.getBoundingClientRect();

    return !(cosmonautRect.right < objectRect.left ||
        cosmonautRect.left > objectRect.right ||
        cosmonautRect.bottom < objectRect.top ||
        cosmonautRect.top > objectRect.bottom);
}

// random points for asteroid

function getRandomPoints() {
    const points = [5, 10, 20];
    return points[Math.floor(Math.random() * points.length)];
}

// random points for powers

function getPowerPoints() {
    const points = [5, 10, 20];
    return points[Math.floor(Math.random() * points.length)];
}

// Restart Game

function startGame() {
    playerScore = 100;
    scoreDisplay.textContent = 'Points: ' + playerScore;

    gameInterval = setInterval(() => {
        if (playerScore <= 0) {
            clearInterval(gameInterval);
            clearInterval(asteroidInterval);
            clearInterval(powerInterval);
            showMessage ('Game Over! you lose!');

        } else if (playerScore >= 1000) {
            clearInterval(gameInterval);
            clearInterval(asteroidInterval);
            clearInterval(powerInterval);
            showMessage ('Congratulations! You win!');
        }
    }, 100);

    asteroidInterval = setInterval(createAsteroid, 1000);
    powerInterval = setInterval(createPower, 3000);
}

// Restartbutton

resetButton.addEventListener('click', () => {
    clearInterval(gameInterval);
    clearInterval(asteroidInterval);
    clearInterval(powerInterval);
    startGame();
    messageDisplay.style.display = 'none';
});

//show message

function showMessage(text) {
    messageDisplay.textContent = text;
    messageDisplay.style.display = 'block';
}

// Start Game

startGame();
