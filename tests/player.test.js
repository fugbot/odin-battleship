import Player from "../src/factories/playerFactory.js";

test("Should throw error if player is not human/computer", () => {
  expect(() => {
    new Player("fas;dlfkasdf");
  }).toThrow(/invalid player type/i);
});
