import {buildNodeSet, constructTree, Knoten, determineValue} from "./Day8";
import {expect} from "chai";

describe('Memory Maneuver', () => {

    const testInput: number[] = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2];

    it('should determine the four nodes inside the tree', () => {
        let nodeA : Knoten = new Knoten(2, 3);
        let nodeB : Knoten = new Knoten(0, 3);
        let nodeC : Knoten = new Knoten(1, 1);
        let nodeD : Knoten = new Knoten(0, 1);
        nodeA.metadataEntries = [1, 1, 2];
        nodeA.children = [nodeB, nodeC];
        nodeB.metadataEntries = [10, 11, 12];
        nodeC.children = [nodeD];
        nodeC.metadataEntries = [2];
        nodeD.metadataEntries = [99];

        type NodeSet = Set<Knoten>;

        let nodeSet : NodeSet = new Set();
        nodeSet.add(nodeA);
        nodeSet.add(nodeB);
        nodeSet.add(nodeC);
        nodeSet.add(nodeD);

        expect(buildNodeSet(testInput)).to.deep.equal(nodeSet);
    });

    it('should return a value of 66 for the first node of the test data', () => {
        let parentNode : Knoten = constructTree(testInput);

        expect(determineValue(parentNode, 0)).to.equal(66);
    })
})