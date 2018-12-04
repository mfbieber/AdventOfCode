import {Claim, FabricsOverlap, SquareInchesOverlaping} from "./Day3-Puzzle1";
import {expect} from "chai";

describe('Fabrics', () => {

    const testClaims : string[] = ['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2'];

    it(`claim ${testClaims[0]} overlaps with claim ${testClaims[1]} for coordinates (4,4) (4,5) (5,4) (5,5).`, () => {
        const firstClaim : Claim = new Claim(testClaims[0]);
        const secondClaim : Claim = new Claim(testClaims[1]);

        let result = FabricsOverlap.find(firstClaim, secondClaim);

        expect(result[0]).to.deep.equal([4,4]);
        expect(result[1]).to.deep.equal([4,5]);
        expect(result[2]).to.deep.equal([5,4]);
        expect(result[3]).to.deep.equal([5,5]);

    });

    it(`claim ${testClaims[0]} does not overlap with claim ${testClaims[2]}.`, () => {
        const firstClaim : Claim = new Claim(testClaims[0]);
        const secondClaim : Claim = new Claim(testClaims[2]);

        const result = FabricsOverlap.find(firstClaim, secondClaim);

        expect(result[0]).to.equal(undefined);
    });

    it('returns 4 square inches for test data.', () => {
        let result = SquareInchesOverlaping.calculate(testClaims);

        expect(result).to.equal(4);
    })

})