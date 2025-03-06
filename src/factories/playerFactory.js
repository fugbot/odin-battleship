import Gameboard from "./gameboardFactory";

class Player {
  constructor(type) {
    if (!["human", "computer"].includes(type)) {
      throw new Error("Invalid player type");
    }
    this.type = type;
    this.gameboard = new Gameboard();
  }
}

export default Player;
