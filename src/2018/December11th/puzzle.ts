import {calculateLargestSquare} from "./Day11";

let square : {[key : string] : number} = calculateLargestSquare(5468, false);
console.log(square);

let squareVariable : {[key : string] : number} = calculateLargestSquare(5468, true);
console.log(squareVariable);
