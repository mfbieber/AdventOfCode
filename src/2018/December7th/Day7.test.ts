import {determineStartingPoint, generatePoints, Point, sortPoints, splitInput} from "./Day7";
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

    it('should determine the starting point', () => {
        expect(determineStartingPoint(generatePoints(testInput))[1].node).to.equal('C');
    });

    it ('should sort points to execution order', () => {
        let pointC = new Point('C');
        pointC.pointingTo.push('A');
        pointC.pointingTo.push('F');
        let pointA = new Point('A');
        pointA.pointingTo.push('B');
        pointA.pointingTo.push('D');
        let pointB = new Point('B');
        pointB.pointingTo.push('E');
        let pointD = new Point('D');
        pointB.pointingTo.push('E');
        let pointF = new Point('F');
        pointB.pointingTo.push('E');
        let pointE = new Point('E');

        let expectedSortedPoints : {[key : number] : Point} = {};
        expectedSortedPoints[1] = pointC;
        expectedSortedPoints[2] = pointA;
        expectedSortedPoints[3] = pointB;
        expectedSortedPoints[4] = pointD;
        expectedSortedPoints[5] = pointF;
        expectedSortedPoints[6] = pointE;

        expect(sortPoints(testInput)).to.deep.equal(expectedSortedPoints);

    });

})