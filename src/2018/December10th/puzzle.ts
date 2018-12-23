import {determineInitialPositions, findMessage, generateStarsFromInput} from "./Day10";

const fs = require('fs');
let messageInput : string = fs.readFileSync('src/2018/December10th/input').toString();
//console.log(generateStarsFromInput(messageInput));
console.log(findMessage(messageInput));