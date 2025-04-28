import {
  createCreateBoard,
  hideCreateSection,
  initGame,
  placeCompShipsRandomly,
  placePlayerShipsRandomly,
  playerPlacesShips,
} from "./gamePlayController.js";

const gameboards = document.querySelector(".gameboards");
const newBtn = document.querySelector("button#new-game");

document.addEventListener("DOMContentLoaded", () => {
  initGame();
  gameboards.style.display = "none";

  newBtn.style.display = "none";

  createCreateBoard();
  //playerPlacesShips();
});

//click new button
const sureDialog = document.querySelector("dialog.are-you-sure");
const confirmBtn = document.querySelector("button.confirm");
const cancelBtn = document.querySelector("button.cancel");

newBtn.addEventListener("click", () => {
  sureDialog.showModal();
});

confirmBtn.addEventListener("click", () => {
  document.getElementById("player-board").innerHTML = "";
  document.getElementById("computer-board").innerHTML = "";
  gameboards.style.display = "none";

  sureDialog.close();
  initGame();
  createCreateBoard();
  //playerPlacesShips();
  newBtn.style.display = "none";
});

cancelBtn.addEventListener("click", () => {
  sureDialog.close();
});

const randomBtn = document.querySelector("button#random");

randomBtn.addEventListener("click", () => {
  //initGame();
  console.log("Place ships randomly");
  gameboards.style.display = "";
  newBtn.style.display = "";

  //todo: if random clicked, clear gameboard objects
  //placeShipsRandomly();
  placePlayerShipsRandomly();
  placeCompShipsRandomly();

  //remove create board divs & hide buttons
  hideCreateSection();
});
