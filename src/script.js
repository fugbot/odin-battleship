import {
  createPlayerBoard,
  createComputerBoard,
  initGame,
  placeShipsRandomly,
} from "./gamePlayController.js";

/* document.addEventListener("DOMContentLoaded", () => {
  initGameboards();
}); */

const newBtn = document.querySelector("button#new-game");
newBtn.addEventListener("click", () => {
  document.getElementById("player-board").innerHTML = "";

  document.getElementById("computer-board").innerHTML = "";

  initGame();
  placeShipsRandomly(); //todo: remove later just for testing
  newBtn.style.display = "none";

  //todo: add are you sure popup
  //initGameboards()
});

const randomBtn = document.querySelector("button#random");
const createBoard = document.querySelector(".create");
randomBtn.addEventListener("click", () => {
  initGame();
  console.log("Place ships randomly");

  //todo: if random clicked, clear gameboard objects
  placeShipsRandomly();

  //remove create board elements
  createBoard.innerHTML = "";
});
