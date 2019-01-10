export function findScore(numberOfRecipes : number, initialRecipes : number[], elves : Elf[]) : string {
    let recipes : number[] = [...initialRecipes];
    while (recipes.length <= numberOfRecipes + 10) {
        recipes = findNextRecipes(recipes, elves);
        elves = assignRecipes(recipes, elves);
    }
    let scoreArray : number[] = recipes.slice(numberOfRecipes, numberOfRecipes + 10);
    let score : string = '';
    for (let scoreDigit of scoreArray) {
        score = score + scoreDigit;
    }
    return score;
}

export function assignRecipes(recipes : number[], elves : Elf[]) : Elf[] {
    let elvesWithNextAssignments : Elf[] = [];
    for (let elf of elves) {
        let nextRecipeIndex : number = elf.currentRecipe;
        for (let steps = 1; steps <= recipes[elf.currentRecipe] + 1; steps++) {
            if ((nextRecipeIndex + 1) <= recipes.length - 1) {
                nextRecipeIndex = nextRecipeIndex + 1;
            } else {
                nextRecipeIndex = 0;
            }
        }
        elvesWithNextAssignments.push(new Elf(nextRecipeIndex));
    }
    return elvesWithNextAssignments;
}

export function findNextRecipes(recipes : number[], elves : Elf[]) : number[] {
    let scoreSum : number = 0;
    for (let elf of elves) {
        scoreSum = scoreSum + recipes[elf.currentRecipe];
    }
    let newDigits : string[] = scoreSum.toString().split('');
    let nextRecipes : number[] = [...recipes];
    for (let digit of newDigits) {
        nextRecipes.push(parseInt(digit));
    }
    return nextRecipes;
}

export class Elf{
    constructor(public currentRecipe : number) {
    }
}