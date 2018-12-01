var fs = require('fs');
var array = fs.readFileSync('src/2018/December1st/input').toString().split("\n");
var value = 0;
for (var i in array) {
    var change = parseInt(array[i]);
    value = value + change;
    console.log(value + ' (' + array[i] + ')');
}
