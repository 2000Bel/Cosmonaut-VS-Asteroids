
const cosmonaut = document.getElementById('cosmonaut');
const scoreDisplay = document.getElementById('score');
const resetButton = document.getElementById('reset-button');

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
