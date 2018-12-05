import {determineShiftsPerGuard, determineAsleepTimePerGuard, whichGuardWasAsleepMost} from "./Day4";

const fs = require('fs');
let inputArray : string[] = fs.readFileSync('src/2018/December4th/input').toString().split("\n");

let shiftsPerGuard : {[key: number]: Date[]} = determineShiftsPerGuard(inputArray);
let asleepTimePerGuard : {[key: number]: number[]} = determineAsleepTimePerGuard(shiftsPerGuard);
let mostAsleepGuard : number[] = whichGuardWasAsleepMost(asleepTimePerGuard);

console.log('result of puzzle 1: ' + (mostAsleepGuard[0] * mostAsleepGuard[1]));
console.log('guard that slept most: ' + (mostAsleepGuard[0]));
console.log('minute he slept most: ' + (mostAsleepGuard[1]));