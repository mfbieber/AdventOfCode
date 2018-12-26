import {Pots, readInitialState, readNotes} from "./Day12";

let initialState : string = '.#####.##.#.##...#.#.###..#.#..#..#.....#..####.#.##.#######..#...##.#..#.#######...#.#.#..##..#.#.#';

let notes : string =
    '#..#. => .\n' +
    '##... => #\n' +
    '#.... => .\n' +
    '#...# => #\n' +
    '...#. => .\n' +
    '.#..# => #\n' +
    '#.#.# => .\n' +
    '..... => .\n' +
    '##.## => #\n' +
    '##.#. => #\n' +
    '###.. => #\n' +
    '#.##. => .\n' +
    '#.#.. => #\n' +
    '##..# => #\n' +
    '..#.# => #\n' +
    '..#.. => .\n' +
    '.##.. => .\n' +
    '...## => #\n' +
    '....# => .\n' +
    '#.### => #\n' +
    '#..## => #\n' +
    '..### => #\n' +
    '####. => #\n' +
    '.#.#. => #\n' +
    '.#### => .\n' +
    '###.# => #\n' +
    '##### => #\n' +
    '.#.## => .\n' +
    '.##.# => .\n' +
    '.###. => .\n' +
    '..##. => .\n' +
    '.#... => #';


let parsedInitialState = readInitialState(initialState);
let parsedNotes = readNotes(notes);
let pots : Pots = new Pots(parsedInitialState, parsedNotes);
let potNumber : number = pots.countPotsAfterGenerations(20);

console.log(potNumber);