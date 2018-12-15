import {generatePoints, determineOrder, determineDependencies, splitInput} from "./Day7";
import {expect} from "chai";

describe('The Sum of Its Parts', () => {

    const testInput : string[] = ['Step C must be finished before step A can begin.',
        'Step C must be finished before step F can begin.',
        'Step A must be finished before step B can begin.',
        'Step A must be finished before step D can begin.',
        'Step B must be finished before step E can begin.',
        'Step D must be finished before step E can begin.',
        'Step F must be finished before step E can begin.'];

    it('transform the input correctly', () => {
        let expectedSplittedInput : string[][] = [['C', 'A'], ['C', 'F'], ['A', 'B'], ['A', 'D'], ['B', 'E'], ['D', 'E'], ['F', 'E']];

        expect(splitInput(testInput)).to.deep.equal(expectedSplittedInput);
    });

    it ('should sort points to execution order', () => {
        let expectedSortedPoints : string[] = [];
        expectedSortedPoints[0] = 'C';
        expectedSortedPoints[1] = 'A';
        expectedSortedPoints[2] = 'B';
        expectedSortedPoints[3] = 'D';
        expectedSortedPoints[4] = 'F';
        expectedSortedPoints[5] = 'E';

        expect(determineOrder(determineDependencies(generatePoints(testInput)))).to.deep.equal(expectedSortedPoints);
    });
})