import Player from "./factories/playerFactory.js";
import Gameboard from "./factories/gameboardFactory.js";
import Ship from "./factories/shipFactory.js";
import Game from "./factories/gameFactory.js";

//start new game
let game = new Game();
//create players
let player1 = game.player;
let gb1 = new Gameboard();
player1.gameboard = gb1;

let player2 = game.computer;
let gb2 = new Gameboard();
player2.gameboard = gb2;

//create ships
let carrier = new Ship(5);
let battleship = new Ship(4);
let cruiser = new Ship(3);
let submarine = new Ship(3);
let destroyer = new Ship(2);

let shipsToPlace = [carrier, battleship, cruiser, submarine, destroyer];

//initialize boards and players
//let player1 = new Player("player");
// let player1 = game.player;
// export let gb1 = new Gameboard();
// player1.gameboard = gb1;
// let carrier1 = new Ship(5);
// let battleship1 = new Ship(4);
// let cruiser1 = new Ship(3);
// let submarine1 = new Ship(3);
// let destroyer1 = new Ship(2);
// gb1.placeShip(carrier1, 9, 1, "horizontal");
// gb1.placeShip(battleship1, 4, 7, "vertical");
// gb1.placeShip(cruiser1, 4, 1, "horizontal");
// gb1.placeShip(submarine1, 6, 3, "horizontal");
// gb1.placeShip(destroyer1, 2, 5, "horizontal");
// //display player board
// createPlayerBoard(gb1);

// //let player2 = new Player("computer");
// let player2 = game.computer;
// let gb2 = new Gameboard();
// player2.gameboard = gb2;
// let carrier2 = new Ship(5);
// let battleship2 = new Ship(4);
// let cruiser2 = new Ship(3);
// let submarine2 = new Ship(3);
// let destroyer2 = new Ship(2);
// gb2.placeShip(carrier2, 1, 1, "horizontal");
// gb2.placeShip(battleship2, 5, 0, "horizontal");
// gb2.placeShip(cruiser2, 2, 6, "vertical");
// gb2.placeShip(submarine2, 4, 9, "vertical");
// gb2.placeShip(destroyer2, 8, 5, "horizontal");
// //display computer board
// createComputerBoard(gb2);

export function gamePlay() {
  //player goes first
  console.log("player's turn");
  //switch turn
  newGame.switchTurn();
  //computer goes
}

export function createPlayerBoard(grid) {
  //const playerBoardElements = [];
  for (let i = 0; i < grid.board.length; i++) {
    for (let j = 0; j < grid.board.length; j++) {
      const div = document.createElement("div");
      const playerBoard = document.querySelector("#player-board");
      div.textContent = `${i} ${j}`;
      div.setAttribute("id", `[${i}, ${j}]`);
      playerBoard.append(div);

      //playerBoardElements.push({ div, i, j });

      if (grid.board[i][j] instanceof Ship) {
        div.textContent = "ship";
        div.classList.add("ship");
      }
    }
  }
  //return playerBoardElements;
}

export function createComputerBoard(grid) {
  for (let i = 0; i < grid.board.length; i++) {
    for (let j = 0; j < grid.board.length; j++) {
      const div = document.createElement("div");
      const computerBoard = document.querySelector("#computer-board");
      div.textContent = `${i} ${j}`;
      div.setAttribute("id", `[${i}, ${j}]`);
      computerBoard.append(div);
      if (grid.board[i][j] instanceof Ship) {
        div.textContent = "ship";
        div.classList.add("ship");
      }
      div.addEventListener("click", playerAttack);
    }
  }
}

function playerAttack() {
  if (game.currentPlayer !== "player") return;

  if (game.checkGameOver()) return;
  const target = event.target;

  const [i, j] = target.id
    .replace(/[\[\]]/g, "")
    .split(",")
    .map(Number);
  console.log("x:", i, "y:", j);

  //ensure spot has not already been attacked
  if (gb2.board[i][j] === "miss" || gb2.board[i][j] === "hit") return;
  //make sure its player's turn - current
  //check if game is already over
  if (this.classList.contains("ship")) {
    console.log("hit");
    gb2.receiveAttack(i, j);
    target.classList.add("hit");
  } else {
    console.log("miss");
    gb2.receiveAttack(i, j);
    target.classList.add("miss");
  }

  if (game.checkGameOver()) {
    console.log(`${game.currentPlayer} won!`);
    return;
  }

  game.switchTurn();
  computerAttack();
}

function computerAttack() {
  console.log("computer's turn");
  if (game.currentPlayer !== "computer") return;
  if (game.checkGameOver()) return;

  let attackedCoordinates = [];
  let row, col;
  //check if coordinates have been attacked before?
  do {
    row = Math.floor(Math.random() * 10);
    col = Math.floor(Math.random() * 10);
  } while (attackedCoordinates.some(([x, y]) => row === x && col === y));
  //have to probably ensure it continues to do this if previous hit was not "hit"/"nothing sunk"

  //if hit nothing, continue random hits
  //but cannot select "miss/hit areas"
  console.log("computer attack", row, col);
  gb1.receiveAttack(row, col);

  //update board
  const hitDiv = document.getElementById(`[${row}, ${col}]`);

  if (gb1.board[row][col] === "miss") {
    hitDiv.classList.add("miss");
  }

  if (gb1.board[row][col] === "hit") {
    hitDiv.classList.add("hit");
  }

  if (game.checkGameOver()) {
    console.log(`${game.currentPlayer} won!`);
    return;
  }

  game.switchTurn();
  playerAttack();
}

function updateBoard() {
  if (game.currentPlayer === "player") {
  }
}

//after game over
function startNewGame() {}

function placeShipsRandomly() {
  shipsToPlace.forEach((ship) => {
    let attempts = 0;
    let direction, row, col;
    let isShipPlaced;
    direction = Math.random() > 0.5 ? "horizontal" : "vertical";
    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
      console.log("ship", ship, "row", row, "col", col, "dir", direction);
      attempts++;
      if (attempts > 100) {
        console.log("failed to place ships");
        break;
      }
      isShipPlaced = gb1.placeShip(ship, row, col, direction);
    } while (!isShipPlaced);
    //gb1.placeShip(ship, row, col, direction);
  });
  createPlayerBoard(gb1);

  shipsToPlace.forEach((ship) => {
    let attempts = 0;
    let direction, row, col;
    let isShipPlaced;
    direction = Math.random() > 0.5 ? "horizontal" : "vertical";
    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
      console.log("ship", ship, "row", row, "col", col, "dir", direction);
      attempts++;
      if (attempts > 100) {
        console.log("failed to place ships");
        break;
      }
      isShipPlaced = gb2.placeShip(ship, row, col, direction);
    } while (!isShipPlaced);
  });
  createComputerBoard(gb2);
}

placeShipsRandomly();
