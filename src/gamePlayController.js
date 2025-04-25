import Player from "./factories/playerFactory.js";
import Gameboard from "./factories/gameboardFactory.js";
import Ship from "./factories/shipFactory.js";
import Game from "./factories/gameFactory.js";

//start new game
let game;

//create players
//let player = game.player;
//let playerBoard = new Gameboard();
//let player;
let playerBoard;

//let computer = game.computer;
//let computerBoard = new Gameboard();
//let computer;
let computerBoard;

//initialize gameboards - this will overwrite all objects
export function initGame() {
  game = new Game();
  //const player = game.player;
  playerBoard = game.player.gameboard;
  //computer = game.computer;
  computerBoard = game.computer.gameboard;
  //computerBoard = new Gameboard();

  // player.gameboard = playerBoard;
  // computer.gameboard = computerBoard;
}

//create ships
let playerCarrier = new Ship(5);
let playerBattleship = new Ship(4);
let playerCruiser = new Ship(3);
let playerSubmarine = new Ship(3);
let playerDestroyer = new Ship(2);

let playerShipsToPlace = [
  playerCarrier,
  playerBattleship,
  playerCruiser,
  playerSubmarine,
  playerDestroyer,
];

let compCarrier = new Ship(5);
let compBattleship = new Ship(4);
let compCruiser = new Ship(3);
let compSubmarine = new Ship(3);
let compDestroyer = new Ship(2);

let computerShipsToPlace = [
  compCarrier,
  compBattleship,
  compCruiser,
  compSubmarine,
  compDestroyer,
];

export function createPlayerBoard(grid) {
  for (let i = 0; i < grid.board.length; i++) {
    for (let j = 0; j < grid.board.length; j++) {
      const div = document.createElement("div");
      const playerBoard = document.querySelector("#player-board");
      div.textContent = `${i} ${j}`;
      div.setAttribute("id", `player-${i}-${j}`);

      playerBoard.append(div);
      if (grid.board[i][j] instanceof Ship) {
        div.textContent = "ship";
        div.classList.add("ship");
      }
    }
  }
}

export function createComputerBoard(grid) {
  for (let i = 0; i < grid.board.length; i++) {
    for (let j = 0; j < grid.board.length; j++) {
      const div = document.createElement("div");
      const computerBoard = document.querySelector("#computer-board");
      div.textContent = `${i} ${j}`;
      div.setAttribute("id", `computer-${i}-${j}`);

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
  // console.log("comp", computerBoard);
  // console.log("player", playerBoard);

  if (game.currentPlayer !== "player") return;

  if (game.checkGameOver().gameOver) return;
  const target = event.target;
  const [boardName, row, col] = target.id.split("-");
  const i = Number(row);
  const j = Number(col);

  //ensure spot has not already been attacked
  if (
    computerBoard.board[i][j] === "miss" ||
    computerBoard.board[i][j] === "hit"
  )
    return;
  //make sure its player's turn - current
  if (this.classList.contains("ship")) {
    console.log("hit");
    computerBoard.receiveAttack(i, j);
    target.classList.add("hit");
  } else {
    console.log("miss");
    computerBoard.receiveAttack(i, j);
    target.classList.add("miss");
  }

  //check if game is already over
  if (game.checkGameOver().gameOver) {
    console.log(`${game.currentPlayer} won!`);
    endGame(game.checkGameOver().winner);
    return;
  }

  game.switchTurn();
  computerAttack();
}

function computerAttack() {
  console.log("computer's turn");
  if (game.currentPlayer !== "computer") return;
  if (game.checkGameOver().gameOver) return;

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
  playerBoard.receiveAttack(row, col);

  //update board
  const hitDiv = document.getElementById(`player-${row}-${col}`);

  if (playerBoard.board[row][col] === "miss") {
    hitDiv.classList.add("miss");
  }

  if (playerBoard.board[row][col] === "hit") {
    hitDiv.classList.add("hit");
  }

  if (game.checkGameOver().gameOver) {
    console.log(`${game.currentPlayer} won!`);
    endGame(game.checkGameOver().winner);
    return;
  }

  game.switchTurn();
  playerAttack();
}

export function placeShipsRandomly() {
  //place player board ships
  playerShipsToPlace.forEach((ship) => {
    let attempts = 0;
    let direction, row, col;
    let isShipPlaced;
    direction = Math.random() > 0.5 ? "horizontal" : "vertical";
    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
      attempts++;
      if (attempts > 100) {
        console.log("failed to place ships");
        break;
      }
      isShipPlaced = playerBoard.placeShip(ship, row, col, direction);
    } while (!isShipPlaced);
  });
  createPlayerBoard(playerBoard);

  //place computer board ships
  computerShipsToPlace.forEach((ship) => {
    let attempts = 0;
    let direction, row, col;
    let isShipPlaced;
    direction = Math.random() > 0.5 ? "horizontal" : "vertical";
    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
      attempts++;
      if (attempts > 100) {
        console.log("failed to place ships");
        break;
      }
      isShipPlaced = computerBoard.placeShip(ship, row, col, direction);
    } while (!isShipPlaced);
  });
  createComputerBoard(computerBoard);
}

function playerPlacesShips() {
  //create create board
  const createBoard = document.querySelector("#create-board");
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const div = document.createElement("div");
      div.textContent = `${i} ${j}`;
      div.setAttribute("id", `create-${i}-${j}`);

      createBoard.append(div);
    }
  }

  let currentShipIndex = 0;
  let ship = playerShipsToPlace[currentShipIndex];
  let direction = "horizontal"; //default

  const createDivs = document.querySelectorAll("#create-board div");

  createDivs.forEach((div) => {
    div.addEventListener("mouseenter", (event) => {
      const target = event.target;
      target.style.backgroundColor = "pink";
      const [boardName, row, col] = target.id.split("-");
      const i = Number(row);
      const j = Number(col);

      if (direction === "horizontal") {
        for (let k = 0; k < ship.length; k++) {
          const adjacentDiv = document.getElementById(`create-${i}-${j + k}`);
          if (adjacentDiv) {
            adjacentDiv.style.backgroundColor = "pink";
          }
        }
      }

      if (direction === "vertical") {
        for (let k = 0; k < ship.length; k++) {
          const adjacentDiv = document.getElementById(`create-${i + k}-${j}`);
          if (adjacentDiv) {
            adjacentDiv.style.backgroundColor = "pink";
          }
        }
      }
    });

    div.addEventListener("mouseleave", () => {
      createDivs.forEach((div) => (div.style.backgroundColor = ""));
    });

    div.addEventListener("click", () => {
      const target = event.target;
      const [boardName, row, col] = target.id.split("-");
      const i = Number(row);
      const j = Number(col);

      playerBoard.placeShip(ship, i, j, direction);
      updateBoardDisplay(playerBoard);

      currentShipIndex++;
      ship = playerShipsToPlace[currentShipIndex];

      if (currentShipIndex >= playerShipsToPlace.length) {
        console.log("all ships placed");
        createBoard.innerHTML = "";
        createPlayerBoard(playerBoard);
        return;
      }
    });
  });

  //allow player to rotate ship
  const rotateBtn = document.querySelector("button#rotate");
  rotateBtn.addEventListener("click", () => {
    direction = direction === "horizontal" ? "vertical" : "horizontal";
  });
}

function updateBoardDisplay(grid) {
  //const div = document.createElement("div");

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (grid.board[i][j] instanceof Ship) {
        const div = document.getElementById(`create-${i}-${j}`);

        div.textContent = "ship";
        div.classList.add("ship");
      }
    }
  }
}

function endGame(winner) {
  const dialog = document.querySelector("dialog");
  const msg = document.querySelector("dialog .msg");
  const winnerMsg = document.createElement("p");

  msg.appendChild(winnerMsg);
  winnerMsg.textContent = `${winner} won!`;
  dialog.showModal();
  const resetBtn = document.querySelector(".reset");
  resetBtn.addEventListener("click", () => {
    console.log("reset game");
    document.getElementById("player-board").innerHTML = "";

    document.getElementById("computer-board").innerHTML = "";
    dialog.close();
    winnerMsg.remove();

    const newBtn = document.querySelector("button#new-game");
    newBtn.style.display = ""; //todo: way to reset all objects? https://stackoverflow.com/questions/684575/how-to-quickly-clear-a-javascript-object?rq=3
  });
}
