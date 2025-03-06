import Gameboard from "../src/factories/gameboardFactory";
import Ship from "../src/factories/shipFactory";

test("Place ship horizontally", () => {
  let gb = new Gameboard();
  let ship1 = new Ship();
  gb.placeShip(ship1, 1, 1, "horizontal");
  expect(gb.board[1][1]).toBe(ship1);
});

test("Place ship vertically", () => {
  let gb = new Gameboard();
  let ship2 = new Ship(2);
  gb.placeShip(ship2, 3, 3, "vertical");
  expect(gb.board[3][3]).toBe(ship2);
  expect(gb.board[4][3]).toBe(ship2);
  expect(gb.board[5][3]).toBeNull();
});

test("Try to place ship out of gameboard bounds", () => {
  let gb = new Gameboard();
  let ship1 = new Ship();
  expect(() => {
    gb.placeShip(ship1, 11, 11, "vertical");
  }).toThrow(/ship is out of bounds. pick new placement./i);
});

test("Miss a shot - records coordinates", () => {
  let gb = new Gameboard();
  gb.receiveAttack(1, 1);
  expect(gb.board[1][1]).toEqual("miss");
});

test("Hit a ship - hits correct ship & is sunk", () => {
  let gb = new Gameboard();
  let ship1 = new Ship();
  gb.placeShip(ship1, 1, 1, "horizontal");
  gb.receiveAttack(1, 1);
  expect(gb.board[1][1]).toEqual("hit");
  expect(ship1.hitCount).toEqual(1);
  expect(ship1.isSunk()).toBe(true);
});

test("Attack already attacked position - returns false", () => {
  let gb = new Gameboard();
  let ship1 = new Ship();
  gb.receiveAttack(1, 1);
  expect(gb.board[1][1]).toEqual("miss");
  expect(gb.receiveAttack(1, 1)).toBe(false);
});

test("Report all ships sunk", () => {
  let gb = new Gameboard();
  // expect(() => {
  //   gb.allShipsSunk();
  // }).toBe(true);
  expect(gb.allShipsSunk()).toBe(true);
});

test("Report NOT all ships sunk", () => {
  let gb = new Gameboard();
  let ship1 = new Ship();
  gb.placeShip(ship1, 1, 1, "horizontal");
  expect(gb.allShipsSunk()).toBe(false);
});
