"use strict";

const board = document.getElementById("board");
const squares = document.getElementsByClassName("square");
const players = ["X", "O"];
let gameOver = false;
let currentPlayer = players[0];

const endMessage = document.createElement("h2");
endMessage.textContent = "X's turn";
endMessage.style.marginTop = "20px";
endMessage.style.textAlign = "center";
board.after(endMessage);

const winningCombinations = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [6, 7, 8],
  [2, 4, 6],
  [3, 4, 5],
  [2, 5, 8],
  [1, 4, 7],
];

for (let i = 0; i < squares.length; i++) {
  squares[i].addEventListener("click", () => {
    if (gameOver || squares[i].textContent !== "") {
      return;
    }
    squares[i].textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
      endMessage.textContent = `Game Over! ${currentPlayer} wins`;
      gameOver = true;
      return;
    }
    if (checkTie()) {
      endMessage.textContent = `Game is Tied!`;
      gameOver = true;
      return;
    }
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    if (currentPlayer == players[0]) {
      endMessage.textContent = `It's X's turn!`;
    } else {
      endMessage.textContent = `It's O's turn!`;
    }
  });
}

function checkWin(currentPlayer) {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      squares[a].textContent === currentPlayer &&
      squares[b].textContent === currentPlayer &&
      squares[c].textContent === currentPlayer
    ) {
      return true;
    }
  }
  return false;
}

function checkTie() {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].textContent === "") {
      return false;
    }
  }
  return true;
}

function restartButton() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].textContent = "";
  }
  endMessage.textContent = "X's turn";
  currentPlayer = players[0];
  gameOver = false;
}
