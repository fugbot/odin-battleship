import Player from "./playerFactory.js";

class Game {
  constructor() {
    this.player = new Player("player");
    this.computer = new Player("computer");
    this.currentPlayer = "player";
  }

  switchTurn() {
    this.currentPlayer =
      this.currentPlayer === "player" ? "computer" : "player";
  }

  checkGameOver() {
    if (
      this.player.gameboard.allShipsSunk() ||
      this.computer.gameboard.allShipsSunk()
    ) {
      return true;
    }
    return false;
  }
}

export default Game;
