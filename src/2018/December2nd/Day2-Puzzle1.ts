{const fs = require('fs');

let array : String[] = fs.readFileSync('src/2018/December2nd/input').toString().split("\n");
let singles : number = 0;
let doubles : number = 0;
let triples : number = 0;
let total : number = 0;

for (let line of array) {
    let charLine : String[] = [];
    let twoTimeCount : String[] = [];
    let threeTimeCount: String[] = [];
    let doublesOfLine : number = 0;
    let triplesOfLine : number = 0;
    for (let pos = 0; pos < line.length; pos++) {
        let charOfLine : String = line.charAt(pos);
        singles++;
        total++;
        if(charLine.indexOf(charOfLine) > -1) {
            if(twoTimeCount.indexOf(charOfLine) == -1) {
                twoTimeCount.push(charOfLine);
                doublesOfLine++;
            } else {
                if(threeTimeCount.indexOf(charOfLine) == -1) {
                    threeTimeCount.push(charOfLine);
                    triplesOfLine++;
                    doublesOfLine--;
                } else {
                    triplesOfLine--;
                }
            }
        } else {
            charLine.push(charOfLine);
        }
    }
    if (doublesOfLine > 0) {
        doubles++;
    }
    if (triplesOfLine > 0) {
        triples++;
    }
    console.log('firstTimeCount: ' + charLine + ', secondTimeCount: ' + twoTimeCount +  ', threeTimeCount: ' + threeTimeCount +', singles: ' + singles+ ', doubles: ' + doubles + ', triples: ' + triples);
}
console.log('doubles: ' + doubles);
console.log('triples: ' + triples);
console.log('cheksum: ' + (doubles*triples));
}