import {buildNodeSet, Knoten, determineValue, constructTree} from "./Day8";

const fs = require('fs');
let inputArray : number[] = fs.readFileSync('src/2018/December8th/input').toString().split(" ").map((value : string) => parseInt(value));

let nodeSet : Set<Knoten> = buildNodeSet(inputArray);
let sum : number = 0;
for (let node of nodeSet) {
    for (let metaDataEntry of node.metadataEntries) {
        sum = sum + metaDataEntry;
    }
}
console.log('sum of metaDataEntries: ' + sum);

console.log('value of parent node: ' + determineValue(constructTree(inputArray), 0));