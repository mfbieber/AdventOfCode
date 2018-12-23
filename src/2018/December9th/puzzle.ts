//435 players; last marble is worth 71184 points

import {Knoten, playGame, determineHighScore} from "./Day9";

let game : [{[key: number] : number}, {[key : number] : Knoten}, string[]] = playGame(435, 71184*100, false);
console.log('high score: ' + determineHighScore(game[0]));
