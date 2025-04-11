class Gameboard {
  constructor() {
    this.board = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));
    this.shipsCollector = [];
  }

  // checkBounds(ship, row, col) {
  //   //position outside of board
  //   if (row > 10 || row < 0 || col > 10 || col < 0) {
  //     throw new Error("Invalid position!");
  //   } else if (row + ship.length > 10 || col + ship.length > 10) {
  //     throw new Error("Ship is out of bounds. Pick new placement.");
  //   }
  // }

  // checkOverlappingShip(ship, row, col, direction) {}

  // checkPlacement(ship, row, col){

  // }

  placeShip(ship, row, col, direction) {
    // Logic to place ship on the board
    if (direction === "horizontal") {
      // Check bounds
      if (col + ship.length > 10 || row >= 10) {
        throw new Error("Ship is out of bounds. Pick new placement.");
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
    }

    if (direction === "vertical") {
      // Check bounds
      if (row + ship.length > 10 || col >= 10) {
        throw new Error("Ship is out of bounds. Pick new placement.");
      }
      // Check if on top of another ship
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row + i][col]) return false;
      }
      // Place ship
      for (let i = 0; i < ship.length; i++) {
        this.board[row + i][col] = ship;
      }
      this.shipsCollector.push(ship); // Add ship to shipsCollector once
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
    // Logic to check if all ships are sunk
    //get all ships
    this.shipsCollector.every((ship) => ship.isSunk());
    //check if all ships are sunk
  }

  updateBoard() {}
}

export default Gameboard;
