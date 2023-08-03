const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const startAgainButton = document.querySelector(".start-again");
const clearScoresButton = document.querySelector(".clear-scores");

const circlePlayer = document.querySelector("#player-circle");
const crossPlayer = document.querySelector("#player-cross");

const startsCells = ["", "", "", "", "", "", "", "", ""];

let go = "circle";

let crossAllWins = 0;
let circleAllWins = 0;

infoDisplay.textContent = "Circle goes first";

const clearScores = () => {
  const allSquares = document.querySelectorAll(".square");
  crossAllWins = 0;
  circleAllWins = 0;
  infoDisplay.textContent = "Circle goes first";
  allSquares.forEach((square) => {
    square.firstChild && square.removeChild(square.firstChild);
    square.addEventListener("click", addGo);
  });
  go = "circle";

  setUpScores();
};

const setUpScores = (circleWinsUpdate, crossWinsUpdate) => {
  if (circleWinsUpdate || crossWinsUpdate) {
    circlePlayer.innerText = `Circle All Wins: ${
      circleWinsUpdate ? circleWinsUpdate : circleAllWins
    }`;
    crossPlayer.innerText = `Cross All Wins: ${
      crossWinsUpdate ? crossWinsUpdate : crossAllWins
    }`;
  }

  circlePlayer.innerText = `Circle wins: ${circleAllWins}`;
  crossPlayer.innerText = `Cross wins: ${crossAllWins}`;
};

const checkScore = () => {
  const allSquares = document.querySelectorAll(".square");
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  winningCombos.forEach((array) => {
    const circleWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("circle")
    );
    if (circleWins) {
      infoDisplay.textContent = "Circle Wins!";
      setUpScores(circleAllWins++);
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });

  winningCombos.forEach((array) => {
    const crossWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("cross")
    );
    if (crossWins) {
      infoDisplay.textContent = "Cross Wins!";
      setUpScores(crossAllWins++);
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });
};

const addGo = (e) => {
  const currentCell = e.target;
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(go);
  currentCell.append(goDisplay);
  go = go === "circle" ? "cross" : "circle";
  infoDisplay.textContent = ` It is now ${go}'s go.`;
  currentCell.removeEventListener("click", addGo);
  checkScore();
};

const startAgain = () => {
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach((square) => {
    square.firstChild && square.removeChild(square.firstChild);
    square.addEventListener("click", addGo);
  });
  go = "circle";
  infoDisplay.textContent = "Circle goes first";
};

const createBoard = () => {
  startsCells.forEach((_cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addGo);
    gameBoard.append(cellElement);
  });
  startAgainButton.addEventListener("click", startAgain);
  clearScoresButton.addEventListener("click", clearScores);
  setUpScores();
};

createBoard();
