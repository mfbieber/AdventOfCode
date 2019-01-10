import {Elf, findScore} from "./Day14";

let elfA : Elf = new Elf(0);
let elfB : Elf = new Elf(1);
let initialRecipes : number[] = [3, 7];

console.log(findScore(170641, initialRecipes, [elfA, elfB]));