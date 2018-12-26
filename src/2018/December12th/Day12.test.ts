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
           '...#...#....#.....#..#..#..#...',
           '...##..##...##....#..#..#..##..',
           '..#.#...#..#.#....#..#..#...#...',
           '....#.#..#...#.#...#..#..##..##..',
           '.....#...##...#.#..#..#...#...#...',
           '.....##.#.#....#...#..##..##..##..',
           '....#..###.#...##..#...#...#...#...',
           '....#....##.#.#.#..##..##..##..##..',
           '....##..#..#####....#...#...#...#...',
           '...#.#..#...#.##....##..##..##..##..',
           '....#...##...#.#...#.#...#...#...#...',
           '....##.#.#....#.#...#.#..##..##..##..',
           '...#..###.#....#.#...#....#...#...#...',
           '...#....##.#....#.#..##...##..##..##..',
           '...##..#..#.#....#....#..#.#...#...#...',
           '..#.#..#...#.#...##...#...#.#..##..##..',
           '....#...##...#.#.#.#...##...#....#...#...',
           '....##.#.#....#####.#.#.#...##...##..##..',
           '...#..###.#..#.#.#######.#.#.#..#.#...#...',
           '...#....##....#####...#######....#.#..##..'
        ];

        let parsedInitialState = readInitialState(initialState);
        let parsedNotes = readNotes(notes);
        let pots : Pots = new Pots(parsedInitialState, parsedNotes);

        for (let i = 1; i <= 20; i++) {
            pots.applyNotesToPots();
            let twentyGenState : string = pots.generateOutputStateString();
            expect(twentyGenState).to.equal(expectedGenStates[i-1]);
        }
    });

    it ('should determine the correct potNumberSum after 20 generations', () => {
        let parsedInitialState = readInitialState(initialState);
        let parsedNotes = readNotes(notes);
        let pots : Pots = new Pots(parsedInitialState, parsedNotes)

        let potNumberSum : number = pots.countPotsAfterGenerations(20);

        expect(potNumberSum).to.equal(325);
    });

    it ('should determine the state of the first generation', () => {
        let expectedFirstGenState : string = '...#...#....#.....#..#..#..#...';

        let parsedInitialState = readInitialState(initialState);
        let parsedNotes = readNotes(notes);
        let pots : Pots = new Pots(parsedInitialState, parsedNotes);

        pots.applyNotesToPots();
        let firstGenState : string = pots.generateOutputStateString();

        expect(firstGenState).to.equal(expectedFirstGenState);
    });

    it ('should construct the initial pots from the parsed initial state', () => {
        let expectedPots : Pot[] = [];
        expectedPots.push(new Pot(0, true));
        expectedPots.push(new Pot(1, false));
        expectedPots.push(new Pot(2, false));
        expectedPots.push(new Pot(3, true));
        expectedPots.push(new Pot(4, false));
        expectedPots.push(new Pot(5, true));
        expectedPots.push(new Pot(6, false));
        expectedPots.push(new Pot(7, false));
        expectedPots.push(new Pot(8, true));
        expectedPots.push(new Pot(9, true));
        expectedPots.push(new Pot(10, false));
        expectedPots.push(new Pot(11, false));
        expectedPots.push(new Pot(12, false));
        expectedPots.push(new Pot(13, false));
        expectedPots.push(new Pot(14, false));
        expectedPots.push(new Pot(15, false));
        expectedPots.push(new Pot(16, true));
        expectedPots.push(new Pot(17, true));
        expectedPots.push(new Pot(18, true));
        expectedPots.push(new Pot(19, false));
        expectedPots.push(new Pot(20, false));
        expectedPots.push(new Pot(21, false));
        expectedPots.push(new Pot(22, true));
        expectedPots.push(new Pot(23, true));
        expectedPots.push(new Pot(24, true));

        let parsedInitialState = readInitialState(initialState);
        let parsedNotes = readNotes(notes);

        let pots : Pots = new Pots(parsedInitialState, parsedNotes);

        expect(pots.pots).to.deep.equal(expectedPots);
    });

    it('should parse the initial state', () => {
        let expectedParsedInitialState : {[key: number] : string } = {
            0: '#', 1: '.', 2: '.', 3: '#', 4: '.', 5: '#', 6: '.', 7: '.', 8: '#', 9: '#',
            10: '.', 11: '.', 12: '.', 13: '.', 14: '.', 15: '.', 16: '#', 17: '#', 18: '#', 19: '.',
            20: '.', 21: '.', 22: '#', 23: '#', 24: '#'
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