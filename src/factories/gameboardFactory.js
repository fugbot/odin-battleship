class Gameboard {
  constructor() {
    this.board = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));
    this.shipsCollector = [];
  }

  placeShip(ship, row, col, direction) {
    // Logic to place ship on the board
    if (direction === "horizontal") {
      // Check bounds
      if (col + ship.length > 10 || row >= 10) {
        console.log("Ship is out of bounds. Pick new placement.");
        return false;
      }
      // Check if on top of another ship
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row][col + i]) return false;
      }
      // Place ship
      for (let i = 0; i < ship.length; i++) {
        this.board[row][col + i] = ship;
      }
      this.shipsCollector.push(ship); // Add ship to shipsCollector once
      return true;
    }

    if (direction === "vertical") {
      // Check bounds
      if (row + ship.length > 10 || col >= 10) {
        console.log("Ship is out of bounds. Pick new placement.");
        return false;
      }
      // Check if on top of another ship
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row + i][col]) return false;
      }
      // Place ship
      for (let i = 0; i < ship.length; i++) {
        this.board[row + i][col] = ship;
      }
      this.shipsCollector.push(ship);
      return true;
    }
  }

  receiveAttack(row, col) {
    // Logic to handle attack on the board
    if (row > 10 || row < 0 || col > 10 || col < 0) {
      throw new Error("Invalid position!");
    }

    //if no ship
    if (this.board[row][col] === null) {
      this.board[row][col] = "miss";
    }

    if (typeof this.board[row][col] === "string") {
      return false;
    }
    //if ship hit
    if (typeof this.board[row][col] === "object") {
      //get ship at that position
      const hitShip = this.board[row][col];
      //hit ship
      hitShip.hit();
      //mark ship as hit on board
      this.board[row][col] = "hit";
    }
  }

  allShipsSunk() {
    //console.log(this.board.shipsCollector);
    return this.shipsCollector.every((ship) => ship.isSunk());
  }
}

export default Gameboard;
