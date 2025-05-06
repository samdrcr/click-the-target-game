const startBtn = document.getElementById("start-btn");
const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");

let score = 0;
let timeLeft = 30;
let gameInterval;
let targetTimeout;

function getRandomPosition(max) {
  return Math.floor(Math.random() * max);
}

function spawnTarget() {
  const target = document.createElement("div");
  target.classList.add("target");

  const size = 50; 
  const areaWidth = gameArea.clientWidth;
  const areaHeight = gameArea.clientHeight;

  const x = getRandomPosition(areaWidth - size);
  const y = getRandomPosition(areaHeight - size);

  target.style.left = `${x}px`;
  target.style.top = `${y}px`;

  target.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = score;
    gameArea.removeChild(target);
    spawnTarget(); 
  });

  gameArea.appendChild(target);

  targetTimeout = setTimeout(() => {
    if (gameArea.contains(target)) {
      gameArea.removeChild(target);
      spawnTarget();
    }
  }, 1500);
}

function startGame() {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;

  startBtn.disabled = true;
  gameArea.innerHTML = "";

  spawnTarget();

  gameInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      clearTimeout(targetTimeout);
      gameArea.innerHTML = "";
      alert(`Game over! Your score: ${score}`);
      startBtn.disabled = false;
    }
  }, 1000);
}

startBtn.addEventListener("click", startGame);
