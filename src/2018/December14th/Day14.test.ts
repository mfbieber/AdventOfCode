import {Elf, findNextRecipes, assignRecipes, findScore} from "./Day14";
import {expect} from "chai";

describe ('Chocolate Charts', () => {
    let elfA : Elf = new Elf(0);
    let elfB : Elf = new Elf(1);
    let initialRecipes : number[] = [3, 7];

    it ('finds the score of the ten recipes after a specific number of recipes', () => {
        expect(findScore(9, initialRecipes, [elfA, elfB])).to.equal('5158916779');
        expect(findScore(5, initialRecipes, [elfA, elfB])).to.equal('0124515891');
        expect(findScore(18, initialRecipes, [elfA, elfB])).to.equal('9251071085');
        expect(findScore(2018, initialRecipes, [elfA, elfB])).to.equal('5941429882');
    });

    it ('assigns the next recipe to each elf', () => {
        let recipes : number[] = findNextRecipes(initialRecipes, [elfA, elfB]);

        let nextElfAssignments : Elf[] = assignRecipes(recipes, [elfA, elfB]);

        expect(nextElfAssignments).to.deep.equal([new Elf(0), new Elf(1)]);
    });

    it ('creates new recipes', () => {
        let recipes : number[] = findNextRecipes(initialRecipes, [elfA, elfB]);

        let expectedRecipes : number[] = [3, 7, 1, 0];

        expect(recipes).to.deep.equal(expectedRecipes);
    });
});