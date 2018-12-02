{const fs = require('fs');

let array : String[] = fs.readFileSync('src/2018/December2nd/input').toString().split("\n");
let sameCharsArray : String[] = [];

let lineLength : number = array[0].length;


for (let i = 0; i < array.length; i++) {
    let lineToCheck : String = array[i];
    for (let j = i + 1; j < array.length; j++) {
        let sameChars: String = '';
        let differentChars: String = '';
        let lineToCompareTo : String = array[j];
        for (let k = 0; k < lineLength; k++) {
            if (lineToCheck.charAt(k) == lineToCompareTo.charAt(k)) {
                sameChars = sameChars.concat(lineToCheck.charAt(k));
            } else {
                differentChars = differentChars.concat(lineToCheck.charAt(k));
            }
        }
        console.log('lineToCheck: ' + lineToCheck + ' - lineToCompareTo: ' + lineToCompareTo + ' - sameChars: ' + sameChars + ' - differentChars: ' + differentChars);
        sameCharsArray.push(sameChars);
        if(sameChars.length == lineLength - 1) {
            break;
        }
    }
    if(sameCharsArray[sameCharsArray.length - 1].length == lineLength - 1) {
        console.log(sameCharsArray[sameCharsArray.length - 1]);
        break;
    }
}
}