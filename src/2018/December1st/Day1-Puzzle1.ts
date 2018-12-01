{const fs = require('fs');

let array = fs.readFileSync('src/2018/December1st/input').toString().split("\n");
let value = 0;
for(let i in array) {
    let change = parseInt(array[i]);
    value = value + change;
    console.log(value + ' (' + array[i] + ')');
}}