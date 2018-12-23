import {Cell, calculateLargestSquare, totalPowerOfSquare, Grid} from "./Day11";
import {expect} from "chai";

describe('Chronal Charge', () => {

    it('should calculate the power level of cells', () => {
        let cellA : Cell = new Cell(3, 5, 8);
        let cellB : Cell = new Cell(122, 79, 57);
        let cellC : Cell = new Cell(217, 196, 39);
        let cellD : Cell = new Cell(101, 153, 71);

        expect(cellA.powerLevel).to.equal(4);
        expect(cellB.powerLevel).to.equal(-5);
        expect(cellC.powerLevel).to.equal(0);
        expect(cellD.powerLevel).to.equal(4);
    });

    it ('should calculate the correct totalPower of a square', () => {
        let cellsA : Cell[][] = new Grid(300, 300, 18).cells;
        let cellsB : Cell[][] = new Grid(300, 300, 42).cells;

        expect(totalPowerOfSquare(45, 33, 0, cellsA)).to.equal(29);
        expect(totalPowerOfSquare(61, 21, 0, cellsB)).to.equal(30);
    });

    it ('should find the correct squares', () => {
        let squareA : {[key : string] : number} = calculateLargestSquare(18);
        let squareB : {[key : string] : number} = calculateLargestSquare(42);

        expect(squareA).to.deep.equal({'x' : 33, 'y' : 45, 'totalPower' : 29});
        expect(squareB).to.deep.equal({'x' : 21, 'y' : 61, 'totalPower' : 30});
    })
});