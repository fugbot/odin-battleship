import Player from "./factories/playerFactory";
import Gameboard from "./factories/gameboardFactory";

const gameModule = () => {
  let player1 = new Player("human");
  let player2 = new Player("computer");

  //set up random gameboard
  //gameboard - carrier 5, battleship 4, cruiser 3, submarine 3, destroyer 2
  let gb1 = new Gameboard();
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

  let gb2 = new Gameboard();
  player2.gameboard = gb2;
  let carrier2 = new Ship(5);
  let battleship2 = new Ship(4);
  let cruiser2 = new Ship(3);
  let submarine2 = new Ship(3);
  let destroyer2 = new Ship(2);
  gb1.placeShip(carrier2, 1, 1, "horizontal");
  gb1.placeShip(battleship2, 5, 0, "horizontal");
  gb1.placeShip(cruiser2, 2, 6, "vertical");
  gb1.placeShip(submarine2, 4, 9, "vertical");
  gb1.placeShip(destroyer2, 8, 5, "horizontal");

  //display board
  for (let i = 0; i < gb1.board.length; i++) {
    for (let j = 0; j < gb1.board.length; i++) {
      const div = document.createElement("div");
      const playerBoard = document.getElementById("player-board");
      playerBoard.append(div);
    }
  }
};

gameModule();
