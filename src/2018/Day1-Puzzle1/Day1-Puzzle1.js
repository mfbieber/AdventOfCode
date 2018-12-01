var fs = require('fs');
console.log(process.cwd());
var array = fs.readFileSync('src/2018/Day1-Puzzle1/input').toString().split("\n");
var value = 0;
for (var i in array) {
    var change = parseInt(array[i]);
    value = value + change;
    console.log(value + ' (' + array[i] + ')');
}
