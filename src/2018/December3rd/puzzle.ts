import {SquareInchesOverlaping, DoesClaimOverlap} from "./Day3-Puzzle1";

const fs = require('fs')
let inputArray : string[] = fs.readFileSync('src/2018/December3rd/input').toString().split("\n");

//console.log(SquareInchesOverlaping.calculate(inputArray));

console.log(DoesClaimOverlap.calculate(inputArray));