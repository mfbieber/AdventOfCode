import {determineHighScore} from "./Day9";
import {expect} from "chai";

describe('Knoten Mania', () => {

    /*
     09 players; last marble is worth 25 points: high score is 23
     10 players; last marble is worth 1618 points: high score is 8317
     13 players; last marble is worth 7999 points: high score is 146373
     17 players; last marble is worth 1104 points: high score is 2764
     21 players; last marble is worth 6111 points: high score is 54718
     30 players; last marble is worth 5807 points: high score is 37305
     */

    it('should determine a high score of 23 for 9 players and with the highes marble value of 25', () => {
        expect(determineHighScore(9, 25)).to.equal(23);
    });

})