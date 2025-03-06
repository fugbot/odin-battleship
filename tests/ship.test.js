import Ship from "../src/factories/shipFactory";

test("hello", () => {
  expect("hello").toBe("hello");
});

test("Ship factory creates a ship", () => {
  let ship = new Ship();
  expect(ship).toBeDefined();
});

test("Adds hit to ship", () => {
  let ship = new Ship();
  ship.hit();
  expect(ship.hitCount).toBe(1);
});

test("Sinks ship", () => {
  let ship = new Ship();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test("Last hit, update sinks status", () => {
  let ship = new Ship();
  ship.hit();
  expect(ship.sunk).toBe(true);
});

test.skip("Ship cannot have 0 length", () => {
  let ship = new Ship(0);
  expect(ship).toBeUndefined();
});

test("Hit count cannot exceed length", () => {
  let ship = new Ship();
  ship.hit();
  ship.hit();
  expect(ship.hitCount).toBe(1);
});
