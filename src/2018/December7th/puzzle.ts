import {generatePoints, determineOrder, determineDependencies, splitInput} from "./Day7";

const fs = require('fs');
let inputArray : string[] = fs.readFileSync('src/2018/December7th/input').toString().split("\n");


let steps : string[] = determineOrder(determineDependencies(generatePoints(inputArray)));
let outputString : string = '';
for (let step of steps) {
    outputString= outputString.concat(step);
}
console.log(outputString);