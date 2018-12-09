import {calculateLargestFiniteAreas, calculateOwnership, positionChronalCoordinatesIntoCoordinateSystem, calculateRegionSize} from "./Day6";

const fs = require('fs');
let inputArray : string[] = fs.readFileSync('src/2018/December6th/input').toString().split("\n");

let input : number[][] = [];
for (let line of inputArray) {
    input.push(line.split(', ').map(value => parseInt(value)));
}

let largestArea : number = calculateLargestFiniteAreas(calculateOwnership(positionChronalCoordinatesIntoCoordinateSystem(input), input), input);
console.log('lagerst Area: ' + largestArea);

let safeArea : number = calculateRegionSize(input, 10000);
console.log('safeAreaSize: ' + safeArea);
