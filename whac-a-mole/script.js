const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.getElementById("time-left");

const score = document.getElementById("score");

let result = 0;
let hitPosition;
let time = 60;
let movingMole;
let timeLeftCounter;

const randomSquare = () => {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });

  let randomSquareForMole = squares[Math.floor(Math.random() * 9)];
  randomSquareForMole.classList.add("mole");

  hitPosition = randomSquareForMole.id;
};

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (square.id == hitPosition) {
      result++;
      score.textContent = result;
    }
  });
});

const moveMole = () => {
  movingMole = setInterval(randomSquare, 500);
};

moveMole(); //into button

function countDown() {
  time--;
  timeLeft.innerText = time;
  if (time === 0) {
    clearInterval(timeLeftCounter);
    clearInterval(movingMole);
    alert(`GAME OVER! Your final score is ${result}`);
  }
}

// const counter = setInterval(countDown, 300);

timeLeftCounter = setInterval(countDown, 1000);
