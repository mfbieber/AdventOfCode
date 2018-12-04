import {isNullOrUndefined} from "util";

const fs = require('fs');

let array = fs.readFileSync('src/2018/December1st/input').toString().split("\n");
let value = 0;
let results : number[] = [];
// @ts-ignore
let firstDouble: number = null;
let starttime: number = process.uptime();

for (let i = -100000; i < 100000; i++) {
    results[i] = i;
}

while (firstDouble == null) {
    frequency();
}

function frequency() {
    for (let i of array) {
        let change = parseInt(i);
        value = value + change;
        if (results[value] == value) {
            results[value] = 0;
        } else {
            firstDouble = value;
            console.log('first double: ' + firstDouble);
            console.log('this calculation took: ' + (process.uptime() - starttime).toString() + ' s')
            break;
        }
    }
}