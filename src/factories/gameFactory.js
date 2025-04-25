import Gameboard from "./gameboardFactory.js";
import Player from "./playerFactory.js";

class Game {
  constructor() {
    this.player = new Player("player");
    this.computer = new Player("computer");
    this.currentPlayer = "player";

    this.player.gameboard = new Gameboard();
    this.computer.gameboard = new Gameboard();
  }

  switchTurn() {
    this.currentPlayer =
      this.currentPlayer === "player" ? "computer" : "player";
  }

  checkGameOver() {
    const playerLost = this.player.gameboard.allShipsSunk();
    const computerLost = this.computer.gameboard.allShipsSunk();
    if (playerLost) {
      return { gameOver: true, winner: "computer" };
    } else if (computerLost) {
      return { gameOver: true, winner: "player" };
    } else {
      return { gameOver: false, winner: null };
    }
  }
}

export default Game;
