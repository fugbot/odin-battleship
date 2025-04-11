import Player from "./factories/playerFactory.js";
import Gameboard from "./factories/gameboardFactory.js";
import Ship from "./factories/shipFactory.js";
import Game from "./factories/gameFactory.js";

//start new game
let game = new Game();

//initialize boards and players
//let player1 = new Player("player");
let player1 = game.player;
export let gb1 = new Gameboard();
player1.gameboard = gb1;
let carrier1 = new Ship(5);
let battleship1 = new Ship(4);
let cruiser1 = new Ship(3);
let submarine1 = new Ship(3);
let destroyer1 = new Ship(2);
gb1.placeShip(carrier1, 9, 1, "horizontal");
gb1.placeShip(battleship1, 4, 7, "vertical");
gb1.placeShip(cruiser1, 4, 1, "horizontal");
gb1.placeShip(submarine1, 6, 3, "horizontal");
gb1.placeShip(destroyer1, 2, 5, "horizontal");
//display player board
createPlayerBoard(gb1);

//let player2 = new Player("computer");
let player2 = game.computer;
let gb2 = new Gameboard();
player2.gameboard = gb2;
let carrier2 = new Ship(5);
let battleship2 = new Ship(4);
let cruiser2 = new Ship(3);
let submarine2 = new Ship(3);
let destroyer2 = new Ship(2);
gb2.placeShip(carrier2, 1, 1, "horizontal");
gb2.placeShip(battleship2, 5, 0, "horizontal");
gb2.placeShip(cruiser2, 2, 6, "vertical");
gb2.placeShip(submarine2, 4, 9, "vertical");
gb2.placeShip(destroyer2, 8, 5, "horizontal");
//display computer board
createComputerBoard(gb2);

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

function playerAttack(event) {
  if (game.currentPlayer !== "player") return;

  if (game.checkGameOver()) return;
  const target = event.target;

  const [i, j] = target.id
    .replace(/[\[\]]/g, "")
    .split(",")
    .map(Number);
  console.log("x:", i, "y:", j);
  //make sure its player's turn - current
  //check if game is already over
  if (this.classList.contains("ship")) {
    console.log("hit");
    gb2.receiveAttack(i, j);
    target.classList.add("hit");

    this.removeEventListener("click", playerAttack);

    if (game.checkGameOver()) {
      console.log(`${game.currentPlayer} won!`);
      return;
    }
    this.removeEventListener("click", playerAttack);
    game.switchTurn();
    setTimeout(computerAttack, 1000);
  } else {
    console.log("miss");
    gb2.receiveAttack(i, j);
    target.classList.add("miss");

    this.removeEventListener("click", playerAttack);
    game.switchTurn();
    setTimeout(computerAttack, 1000);
  }
}

function computerAttack() {
  console.log("computer's turn");
  if (game.currentPlayer !== "computer") return;
  if (game.checkGameOver()) return;
  //first random hit
  const RandomHit = () => {
    let row;
    let col;

    row = Math.floor(Math.random() * 10);
    col = Math.floor(Math.random() * 10);
  };

  //if hit nothing, continue random hits
  if (gb1.board[row][col] === "miss" || gb1.board[row][col] === "hit") {
    console.log("Already attacked this spot.");
  }
  //but cannot select "miss/hit areas"

  //if hit ship
  //select one of 4 spots around it
  //if miss, select 3 spots, etc.
  //if hit, continue in same direction
  //if miss, go in other direction past first hit
}
