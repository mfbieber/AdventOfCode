const fs = require('fs');

let array = fs.readFileSync('src/2018/December1st/input').toString().split("\n");
let value = 0;
let results : number[] = [];
let firstDouble: number;

while (firstDouble == null) {
    frequency();
}

function frequency() {
    for (let i of array) {
        let change = parseInt(i);
        value = value + change;
        for (let j of results) {
            if (j == value) {
                firstDouble = j;
                break;
            }
        }
        console.log(value + ' (' + i + ')');
        if (firstDouble == value) {
            console.log('first double: ' + firstDouble);
            break;
        }
        results.push(value)
    }
}