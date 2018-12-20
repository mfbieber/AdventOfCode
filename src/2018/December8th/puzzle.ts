import {constructTree, Knoten} from "./Day8";

const fs = require('fs');
let inputArray : number[] = fs.readFileSync('src/2018/December8th/input').toString().split(" ").map((value : string) => parseInt(value));

let treeNodes : Set<Knoten> = constructTree(inputArray);
let sum : number = 0;
for (let node of treeNodes) {
    for (let metaDataEntry of node.metadataEntries) {
        sum = sum + metaDataEntry;
    }
}

console.log('sum of metaDataEntries: ' + sum);