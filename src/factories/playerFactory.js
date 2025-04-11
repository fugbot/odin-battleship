import Gameboard from "./gameboardFactory.js";

class Player {
  constructor(type) {
    if (!["player", "computer"].includes(type)) {
      throw new Error("Invalid player type");
    }
    this.type = type;
    this.gameboard = new Gameboard();
  }
}

export default Player;
