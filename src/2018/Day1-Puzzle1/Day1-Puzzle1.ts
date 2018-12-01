const fs = require('fs');

console.log(process.cwd());

let array = fs.readFileSync('src/2018/Day1-Puzzle1/input').toString().split("\n");
let value = 0;
for(let i in array) {
    let change = parseInt(array[i]);
    value = value + change;
    console.log(value + ' (' + array[i] + ')');
}