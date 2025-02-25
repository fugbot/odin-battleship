class Ship {
  constructor(length = 1) {
    this.length = length;
    this.hitCount = 0;
    this.sunk = false;
  }

  hit() {
    if (this.isSunk() === false) {
      this.hitCount++;
      if (this.hitCount === this.length) {
        this.sunk = true;
      }
    }
  }

  isSunk() {
    return this.hitCount === this.length;
  }
}

module.exports = Ship;
