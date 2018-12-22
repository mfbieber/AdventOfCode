import {determineHighScore, Knoten, playGame} from "./Day9";
import {expect} from "chai";

describe('Marble Mania', () => {

    /*
     09 players; last marble is worth 25 points: high score is 23
     10 players; last marble is worth 1618 points: high score is 8317
     13 players; last marble is worth 7999 points: high score is 146373
     17 players; last marble is worth 1104 points: high score is 2764
     21 players; last marble is worth 6111 points: high score is 54718
     30 players; last marble is worth 5807 points: high score is 37305
     */

    /*it('should play the game correctly', () => {
        let expectedGame : string[] = [
            '(0) ',
            '0 (1) ',
            '0 (2) 1 ',
            '0 2 1 (3) ',
            '0 (4) 2 1 3 ',
            '0 4 2 (5) 1 3 ',
            '0 4 2 5 1 (6) 3 ',
            '0 4 2 5 1 6 3 (7) ',
            '0 (8) 4 2 5 1 6 3 7 ',
            '0 8 4 (9) 2 5 1 6 3 7 ',
            '0 8 4 9 2 (10) 5 1 6 3 7 ',
            '0 8 4 9 2 10 5 (11) 1 6 3 7 ',
            '0 8 4 9 2 10 5 11 1 (12) 6 3 7 ',
            '0 8 4 9 2 10 5 11 1 12 6 (13) 3 7 ',
            '0 8 4 9 2 10 5 11 1 12 6 13 3 (14) 7 ',
            '0 8 4 9 2 10 5 11 1 12 6 13 3 14 7 (15) ',
            '0 (16) 8 4 9 2 10 5 11 1 12 6 13 3 14 7 15 ',
            '0 16 8 (17) 4 9 2 10 5 11 1 12 6 13 3 14 7 15 ',
            '0 16 8 17 4 (18) 9 2 10 5 11 1 12 6 13 3 14 7 15 ',
            '0 16 8 17 4 18 9 (19) 2 10 5 11 1 12 6 13 3 14 7 15 ',
            '0 16 8 17 4 18 9 19 2 (20) 10 5 11 1 12 6 13 3 14 7 15 ',
            '0 16 8 17 4 18 9 19 2 20 10 (21) 5 11 1 12 6 13 3 14 7 15 ',
            '0 16 8 17 4 18 9 19 2 20 10 21 5 (22) 11 1 12 6 13 3 14 7 15 ',
            '0 16 8 17 4 18 (19) 2 20 10 21 5 22 11 1 12 6 13 3 14 7 15 ',
            '0 16 8 17 4 18 19 2 (24) 20 10 21 5 22 11 1 12 6 13 3 14 7 15 ',
            '0 16 8 17 4 18 19 2 24 20 (25) 10 21 5 22 11 1 12 6 13 3 14 7 15 '
        ];
        let game : [{[key: number] : number}, {[key : number] : Knoten}, string[]] = playGame(9, 25);

        expect(game[2]).to.deep.equal(expectedGame);
    });*/


    it('should determine a high score of 32 for 9 players and with the highes marble value of 25', () => {
        let game : [{[key: number] : number}, {[key : number] : Knoten}, string[]] = playGame(9, 25);
        expect(determineHighScore(game[0])).to.equal(32);
    });

    it('should determine a high score of 8317 for 10 players and with the highes marble value of 1618', () => {
        let game : [{[key: number] : number}, {[key : number] : Knoten}, string[]] = playGame(10, 1618);

        expect(determineHighScore(game[0])).to.equal(8317);
    });

    it('should determine a high score of 146373 for 13 players and with the highes marble value of 7999', () => {
        let game : [{[key: number] : number}, {[key : number] : Knoten}, string[]] = playGame(13, 7999);

        expect(determineHighScore(game[0])).to.equal(146373);
    });

    it('should determine a high score of 2764 for 17 players and with the highes marble value of 1104', () => {
        let game : [{[key: number] : number}, {[key : number] : Knoten}, string[]] = playGame(17, 1104);

        expect(determineHighScore(game[0])).to.equal(2764);
    });

    it('should determine a high score of 54718 for 21 players and with the highes marble value of 6111', () => {
        let game : [{[key: number] : number}, {[key : number] : Knoten}, string[]] = playGame(21, 6111);

        expect(determineHighScore(game[0])).to.equal(54718);
    });

    it('should determine a high score of 37305 for 30 players and with the highes marble value of 5807', () => {
        let game : [{[key: number] : number}, {[key : number] : Knoten}, string[]] = playGame(30, 5807);

        expect(determineHighScore(game[0])).to.equal(37305);
    });

})