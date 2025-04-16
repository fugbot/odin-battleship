import {
  createPlayerBoard,
  createComputerBoard,
  placeShipsRandomly,
  startGame,
} from "./gamePlayController.js";

document.addEventListener("DOMContentLoaded", () => {
  startGame();
});

const newBtn = document.querySelector("button#new-game");
newBtn.addEventListener("click", () => {
  document.getElementById("player-board").innerHTML = "";

  document.getElementById("computer-board").innerHTML = "";

  placeShipsRandomly();
  newBtn.style.display = "none";
});
