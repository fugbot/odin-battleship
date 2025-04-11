import { createPlayerBoard } from "./gamePlayController";
import { gb1 } from "./gamePlayController";

const computerAttackLogic = () => {
  //first random hit
  const RandomHit = () => {
    let row;
    let col;

    row = Math.floor(Math.random() * 10);
    col = Math.floor(Math.random() * 10);
  };

  //if hit nothing, continue random hits
  if (gb1.board[row][col] === "miss" || gb1.board[row][col] === "hit") {
    console.log("Already attacked this spot.");
  }
  //but cannot select "miss/hit areas"

  //if hit ship
  //select one of 4 spots around it
  //if miss, select 3 spots, etc.
  //if hit, continue in same direction
  //if miss, go in other direction past first hit
};
