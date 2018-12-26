import {readInitialState, readNotes, Pots, Pot} from "./Day12";
import {expect} from "chai";

describe('Subterranean Sustainability', () => {

    let initialState : string = '#..#.#..##......###...###';

    let notes : string =
        '...## => #\n' +
        '..#.. => #\n' +
        '.#... => #\n' +
        '.#.#. => #\n' +
        '.#.## => #\n' +
        '.##.. => #\n' +
        '.#### => #\n' +
        '#.#.# => #\n' +
        '#.### => #\n' +
        '##.#. => #\n' +
        '##.## => #\n' +
        '###.. => #\n' +
        '###.# => #\n' +
        '####. => #';

    it ('should determine all the states for 20 generations', () => {
       let expectedGenStates : string[] = [
           '...#...#....#.....#..#..#..#..',
           '...##..##...##....#..#..#..##.',
           '..#.#...#..#.#....#..#..#...#..',
           '...#.#..#...#.#...#..#..##..##..',
           '....#...##...#.#..#..#...#...#..',
           '....##.#.#....#...#..##..##..##.',
           '...#..###.#...##..#...#...#...#..',
           '...#....##.#.#.#..##..##..##..##.',
           '...##..#..#####....#...#...#...#..',
           '..#.#..#...#.##....##..##..##..##.',
           '...#...##...#.#...#.#...#...#...#..',
           '...##.#.#....#.#...#.#..##..##..##.',
           '..#..###.#....#.#...#....#...#...#..',
           '..#....##.#....#.#..##...##..##..##.',
           '..##..#..#.#....#....#..#.#...#...#..',
           '.#.#..#...#.#...##...#...#.#..##..##.',
           '..#...##...#.#.#.#...##...#....#...#..',
           '..##.#.#....#####.#.#.#...##...##..##..',
           '.#..###.#..#.#.#######.#.#.#..#.#...#..',
           '.#....##....#####...#######....#.#..##.'
       ]
    });

    it ('should determine the state of the first generation', () => {
        let expectedFirstGenState : string = '..#...#....#.....#..#..#..#..';

        let parsedInitialState = readInitialState(initialState);
        let parsedNotes = readNotes(notes);
        let pots : Pots = new Pots(parsedInitialState, parsedNotes);

        pots.applyNotesToPots();
        let firstGenState : string = pots.generateOutputStateString();

        expect(firstGenState).to.equal(expectedFirstGenState);
    });

    it ('should construct the initial pots from the parsed initial state', () => {
        let expectedPots : Map<number, Pot> = new Map();
        expectedPots.set(1, new Pot(1, true));
        expectedPots.set(2, new Pot(2, false));
        expectedPots.set(3, new Pot(3, false));
        expectedPots.set(4, new Pot(4, true));
        expectedPots.set(5, new Pot(5, false));
        expectedPots.set(6, new Pot(6, true));
        expectedPots.set(7, new Pot(7, false));
        expectedPots.set(8, new Pot(8, false));
        expectedPots.set(9, new Pot(9, true));
        expectedPots.set(10, new Pot(10, true));
        expectedPots.set(11, new Pot(11, false));
        expectedPots.set(12, new Pot(12, false));
        expectedPots.set(13, new Pot(13, false));
        expectedPots.set(14, new Pot(14, false));
        expectedPots.set(15, new Pot(15, false));
        expectedPots.set(16, new Pot(16, false));
        expectedPots.set(17, new Pot(17, true));
        expectedPots.set(18, new Pot(18, true));
        expectedPots.set(19, new Pot(19, true));
        expectedPots.set(20, new Pot(20, false));
        expectedPots.set(21, new Pot(21, false));
        expectedPots.set(22, new Pot(22, false));
        expectedPots.set(23, new Pot(23, true));
        expectedPots.set(24, new Pot(24, true));
        expectedPots.set(25, new Pot(25, true));

        let parsedInitialState = readInitialState(initialState);
        let parsedNotes = readNotes(notes);

        let pots : Pots = new Pots(parsedInitialState, parsedNotes);

        expect(pots.pots).to.deep.equal(expectedPots);
    });

    it('should parse the initial state', () => {
        let expectedParsedInitialState : {[key: number] : string } = {
            1: '#', 2: '.', 3: '.', 4: '#', 5: '.', 6: '#', 7: '.', 8: '.', 9: '#', 10: '#',
            11: '.', 12: '.', 13: '.', 14: '.', 15: '.', 16: '.', 17: '#', 18: '#', 19: '#', 20: '.',
            21: '.', 22: '.', 23: '#', 24: '#', 25: '#'
        };

        expect(readInitialState(initialState)).to.deep.equal(expectedParsedInitialState);
    });

    it ('should parse the notes', () => {
        let expectedParsedNotes : {[key: number] : string[]} = {
            1: ['...##', '#'], 2: ['..#..', '#'], 3: ['.#...', '#'], 4: ['.#.#.', '#'], 5: ['.#.##', '#'],
            6: ['.##..', '#'], 7: ['.####', '#'], 8: ['#.#.#', '#'], 9: ['#.###', '#'], 10: ['##.#.', '#'],
            11: ['##.##', '#'], 12: ['###..', '#'], 13: ['###.#', '#'], 14: ['####.', '#']
        };

        expect(readNotes(notes)).to.deep.equal(expectedParsedNotes);
    });
});