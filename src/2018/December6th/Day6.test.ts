import {ChronalCoordinateSystem, Coordinate, calculateDistance, positionChronalCoordinatesIntoCoordinateSystem, calculateOwnership, calculateLargestFiniteAreas} from "./Day6";
import {expect} from "chai";

describe('Chronal coordinates', () => {

    const testInput : number[][] = [[1, 1], [1, 6], [8, 3], [3, 4], [5, 5], [8, 9]];
    let coordinateA : Coordinate = new Coordinate(testInput[0], 'A');
    let coordinateB : Coordinate = new Coordinate(testInput[1], 'B');
    let coordinateC : Coordinate = new Coordinate(testInput[2], 'C');
    let coordinateD : Coordinate = new Coordinate(testInput[3], 'D');
    let coordinateE : Coordinate = new Coordinate(testInput[4], 'E');
    let coordinateF : Coordinate = new Coordinate(testInput[5], 'F');

    it('determines the limits of the coordinate system', () => {
        let coordinateSystem : ChronalCoordinateSystem = new ChronalCoordinateSystem(testInput);

        expect(coordinateSystem.xValueMin).to.equal(0);
        expect(coordinateSystem.yValueMin).to.equal(0);
        expect(coordinateSystem.xValueMax).to.equal(9);
        expect(coordinateSystem.yValueMax).to.equal(10);
    });

    it ('calculates the manhattan distances for the chronal coordinates', () => {
        expect(calculateDistance(coordinateA, coordinateB)).to.equal(5);
        expect(calculateDistance(coordinateA, coordinateC)).to.equal(9);
        expect(calculateDistance(coordinateA, coordinateD)).to.equal(5);
        expect(calculateDistance(coordinateA, coordinateE)).to.equal(8);
        expect(calculateDistance(coordinateA, coordinateF)).to.equal(15);
        expect(calculateDistance(coordinateB, coordinateC)).to.equal(10);
        expect(calculateDistance(coordinateB, coordinateD)).to.equal(4);
        expect(calculateDistance(coordinateB, coordinateF)).to.equal(10);
        expect(calculateDistance(coordinateC, coordinateD)).to.equal(6);
        expect(calculateDistance(coordinateC, coordinateF)).to.equal(6);
        expect(calculateDistance(coordinateD, coordinateF)).to.equal(10);
    });

    it('positions the chronal coordinates into the coordinate system', () => {
        let coordinateSystem : ChronalCoordinateSystem = positionChronalCoordinatesIntoCoordinateSystem(testInput);

        expect(coordinateSystem.coordinateSystem[1 + ',' + 1].owner).to.equal(1 + ',' + 1);
        expect(coordinateSystem.coordinateSystem[1 + ',' + 6].owner).to.equal(1 + ',' + 6);
        expect(coordinateSystem.coordinateSystem[8 + ',' + 3].owner).to.equal(8 + ',' + 3);
        expect(coordinateSystem.coordinateSystem[3 + ',' + 4].owner).to.equal(3 + ',' + 4);
        expect(coordinateSystem.coordinateSystem[5 + ',' + 5].owner).to.equal(5 + ',' + 5);
        expect(coordinateSystem.coordinateSystem[8 + ',' + 9].owner).to.equal(8 + ',' + 9);
        expect(coordinateSystem.coordinateSystem[7 + ',' + 7].owner).to.equal('.');
    });

    it ('calculates for each field of the coordinate system to which chronal coordinate it belongs', () => {
        let coordinateSystemWithOwners : ChronalCoordinateSystem = calculateOwnership(positionChronalCoordinatesIntoCoordinateSystem(testInput), testInput);

        expect(coordinateSystemWithOwners.coordinateSystem[1 + ',' + 1].owner).to.equal(1 + ',' + 1);
        expect(coordinateSystemWithOwners.coordinateSystem[1 + ',' + 6].owner).to.equal(1 + ',' + 6);
        expect(coordinateSystemWithOwners.coordinateSystem[8 + ',' + 3].owner).to.equal(8 + ',' + 3);
        expect(coordinateSystemWithOwners.coordinateSystem[3 + ',' + 4].owner).to.equal(3 + ',' + 4);
        expect(coordinateSystemWithOwners.coordinateSystem[5 + ',' + 5].owner).to.equal(5 + ',' + 5);
        expect(coordinateSystemWithOwners.coordinateSystem[8 + ',' + 9].owner).to.equal(8 + ',' + 9);

        expect(coordinateSystemWithOwners.coordinateSystem[4 + ',' + 2].owner).to.equal(3 + ',' + 4);
        expect(coordinateSystemWithOwners.coordinateSystem[2 + ',' + 4].owner).to.equal(3 + ',' + 4);
        expect(coordinateSystemWithOwners.coordinateSystem[4 + ',' + 9].owner).to.equal(8 + ',' + 9);

        expect(coordinateSystemWithOwners.coordinateSystem[5 + ',' + 1].owner).to.equal('.');
        expect(coordinateSystemWithOwners.coordinateSystem[1 + ',' + 4].owner).to.equal('.');
        expect(coordinateSystemWithOwners.coordinateSystem[2 + ',' + 5].owner).to.equal('.');
        expect(coordinateSystemWithOwners.coordinateSystem[3 + ',' + 6].owner).to.equal('.');

        for(let y = coordinateSystemWithOwners.yValueMin; y <= coordinateSystemWithOwners.yValueMax; y++) {
            let owners : string[] = [];
            for(let x = coordinateSystemWithOwners.xValueMin; x <= coordinateSystemWithOwners.xValueMax; x++) {
                owners.push(coordinateSystemWithOwners.coordinateSystem[x + ',' + y].owner)
            }
            console.log(owners);
        }

    });

    it('calculates the area of the chronal coordinates with finite areas', () => {
        let largestArea : number = calculateLargestFiniteAreas(calculateOwnership(positionChronalCoordinatesIntoCoordinateSystem(testInput), testInput), testInput);

        expect(largestArea).to.equal(17);
    });
}
)