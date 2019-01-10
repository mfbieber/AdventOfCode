import {Track, Cart} from "./Day13";
import {expect} from "chai";

describe ('Mine Cart Madness', () => {
    let straightTrackInput : string =
        '|\n' +
        'v\n' +
        '|\n' +
        '|\n' +
        '|\n' +
        '^\n' +
        '|';

    let complexTrackInput : string =
        '/->-\\        \n' +
        '|   |  /----\\\n' +
        '| /-+--+-\\  |\n' +
        '| | |  | v  |\n' +
        '\\-+-/  \\-+--/\n' +
        '  \\------/   ';

    let otherTrackInput : string =
        '/>-<\\  \n' +
        '|   |  \n' +
        '| /<+-\\\n' +
        '| | | v\n' +
        '\\>+</ |\n' +
        '  |   ^\n' +
        '  \\<->/';

    it ('determines the position of the last not crashed car', () => {
        let otherTrack : Track = new Track(otherTrackInput);

        otherTrack.findSurvivor();
        let expectedCart : Set<Cart> = new Set();
        expectedCart.add(new Cart('^', 6, 4));

        expect(otherTrack.carts).to.deep.equal(expectedCart);
    });

    it ('removes crashed cars', () => {
        let otherTrack : Track = new Track(otherTrackInput);

        let outcomeAfterOneMove : Track = new Track(
            '/---\\  \n' +
            '|   |  \n' +
            '| v-+-\\\n' +
            '| | | |\n' +
            '\\-+-/ |\n' +
            '  |   |\n' +
            '  ^---^');

        otherTrack.raceAndRemoveCrash();

        expect(otherTrack.carts).to.deep.equal(outcomeAfterOneMove.carts);

        let outcomeAfterTwoMoves : Track = new Track(
            '/---\\  \n' +
            '|   |  \n' +
            '| /-+-\\\n' +
            '| v | |\n' +
            '\\-+-/ |\n' +
            '  ^   ^\n' +
            '  \\---/');

        otherTrack.raceAndRemoveCrash();

        expect(otherTrack.carts).to.deep.equal(outcomeAfterTwoMoves.carts);

        let outcomeAfterThreeMoves : Track = new Track(
            '/---\\  \n' +
            '|   |  \n' +
            '| /-+-\\\n' +
            '| | | |\n' +
            '\\-+-/ ^\n' +
            '  |   |\n' +
            '  \\---/');

        otherTrack.raceAndRemoveCrash();

        expect(otherTrack.carts).to.deep.equal(outcomeAfterThreeMoves.carts);
    });

    it ('finds the position of the first crash', () => {
        let complexTrack : Track = new Track(complexTrackInput);

        complexTrack.runRace();

        expect(complexTrack.crash).to.deep.equal(7 + ',' + 3);
    });

    it ('can make carts move on the more complex test track', () => {
        let complexTrack : Track = new Track(complexTrackInput);
        complexTrack.moveCarts();

        let outcomeAfterOneMove : Track = new Track(
            '/-->\\        \n' +
            '|   |  /----\\\n' +
            '| /-+--+-\\  |\n' +
            '| | |  | |  |\n' +
            '\\-+-/  \\->--/\n' +
            '  \\------/   ');

        expect(complexTrack.coordinates).to.deep.equal(outcomeAfterOneMove.coordinates);

        complexTrack.moveCarts();

        let ouctomeAfterTwoMoves : Track = new Track(
            '/---v        \n' +
            '|   |  /----\\\n' +
            '| /-+--+-\\  |\n' +
            '| | |  | |  |\n' +
            '\\-+-/  \\-+>-/\n' +
            '  \\------/   ');

        expect(complexTrack.coordinates).to.deep.equal(ouctomeAfterTwoMoves.coordinates);

        complexTrack.moveCarts();

        let outcomeAfterThreeMoves : Track = new Track(
            '/---\\        \n' +
            '|   v  /----\\\n' +
            '| /-+--+-\\  |\n' +
            '| | |  | |  |\n' +
            '\\-+-/  \\-+->/\n' +
            '  \\------/   ');

        expect(complexTrack.coordinates).to.deep.equal(outcomeAfterThreeMoves.coordinates);

        complexTrack.moveCarts();

        let outcomeAfterFourMoves : Track = new Track(
            '/---\\        \n' +
            '|   |  /----\\\n' +
            '| /->--+-\\  |\n' +
            '| | |  | |  |\n' +
            '\\-+-/  \\-+--^\n' +
            '  \\------/   ');

        expect(complexTrack.coordinates).to.deep.equal(outcomeAfterFourMoves.coordinates);

        complexTrack.moveCarts();

        let outcomeAfterFiveMoves : Track = new Track(
            '/---\\        \n' +
            '|   |  /----\\\n' +
            '| /-+>-+-\\  |\n' +
            '| | |  | |  ^\n' +
            '\\-+-/  \\-+--/\n' +
            '  \\------/   ');

        expect(complexTrack.coordinates).to.deep.equal(outcomeAfterFiveMoves.coordinates);

        complexTrack.moveCarts();

        let outcomeAfterSixMoves : Track = new Track(
            '/---\\        \n' +
            '|   |  /----\\\n' +
            '| /-+->+-\\  ^\n' +
            '| | |  | |  |\n' +
            '\\-+-/  \\-+--/\n' +
            '  \\------/   ');

        expect(complexTrack.coordinates).to.deep.equal(outcomeAfterSixMoves.coordinates);

        complexTrack.moveCarts();

        let outcomeAfterSevenMoves : Track = new Track(
            '/---\\        \n' +
            '|   |  /----<\n' +
            '| /-+-->-\\  |\n' +
            '| | |  | |  |\n' +
            '\\-+-/  \\-+--/\n' +
            '  \\------/   ');

        expect(complexTrack.coordinates).to.deep.equal(outcomeAfterSevenMoves.coordinates);

        for (let i = 7; i < 14; i++) {
            complexTrack.moveCarts();
        }

        let outcomeAfterFourteenMoves : Track = new Track(
            '/---\\        \n' +
            '|   |  /----\\\n' +
            '| /-+--+-\\  |\n' +
            '| | |  X |  |\n' +
            '\\-+-/  \\-+--/\n' +
            '  \\------/   ');

        expect(complexTrack.coordinates).to.deep.equal(outcomeAfterFourteenMoves.coordinates);
    });

    it ('can make carts move on the straight line test track', () => {
        let straightTrack : Track = new Track(straightTrackInput);
        straightTrack.moveCarts();

        let firstCartSet : Set<Cart> = new Set();
        firstCartSet.add(new Cart('v', 0, 2));
        firstCartSet.add(new Cart('^', 0, 4));

        expect(straightTrack.carts).to.deep.equal(firstCartSet);

        straightTrack.moveCarts();

        let secondCartSet : Set<Cart> = new Set();
        secondCartSet.add(new Cart('v', 0, 3));
        secondCartSet.add(new Cart('^', 0, 3));

        expect(straightTrack.carts).to.deep.equal(secondCartSet);
        expect(straightTrack.coordinates[3][0]).to.equal('X');
    });

    it ('can make carts and position them correctly from the straight line test input', () => {
        let straightTrack : Track = new Track(straightTrackInput);

        let topCart : Cart = new Cart('v', 0, 1);
        let bottomCart : Cart = new Cart('^', 0, 5);
        let cartSet : Set<Cart> = new Set();
        cartSet.add(topCart);
        cartSet.add(bottomCart);

       expect(straightTrack.carts).to.deep.equal(cartSet);
    });

    it ('can make carts and position them correctly from the more complex test input', () => {
        let complexTrack : Track = new Track(complexTrackInput);

        let cartSet : Set<Cart> = new Set();
        cartSet.add(new Cart('>', 2, 0));
        cartSet.add(new Cart('v', 9, 3));

        expect(complexTrack.carts).to.deep.equal(cartSet);
    });

    it('can build up a track', () => {
        let expectedTrackOutput : Track = new Track('');
        expectedTrackOutput.coordinates = [
            ['/', '-', '-', '-', '-', '\\'],
            ['|', ' ', ' ', ' ', ' ', '|'],
            ['|', ' ', ' ', ' ', ' ', '|'],
            ['\\', '-', '-', '-', '-', '/'],
        ];

        let trackInput : string =
            '/----\\\n' +
            '|    |\n' +
            '|    |\n' +
            '\\----/';

        let track : Track = new Track(trackInput);

        expect(track.coordinates).to.deep.equal(expectedTrackOutput.coordinates);
    });

    it('can build up a more complex track', () => {
        let expectedTrackOutput : Track = new Track('');
        expectedTrackOutput.coordinates = [
            ['/', '-', '-', '-', '-', '-', '\\', ' ', ' ', ' '],
            ['|', ' ', ' ', ' ', ' ', ' ', '|', ' ', ' ', ' '],
            ['|', ' ', ' ', '/', '-', '-', '+', '-', '-', '\\'],
            ['|', ' ', ' ', '|', ' ', ' ', '|', ' ', ' ', '|'],
            ['\\', '-', '-', '+', '-', '-', '/', ' ', ' ', '|'],
            [' ', ' ', ' ', '|', ' ', ' ', ' ', ' ', ' ', '|'],
            [' ', ' ', ' ', '\\', '-', '-', '-', '-', '-', '/']
        ];

        let trackInput : string =
            '/-----\\\n' +
            '|     |\n' +
            '|  /--+--\\\n' +
            '|  |  |  |\n' +
            '\\--+--/  |\n' +
            '   |     |\n' +
            '   \\-----/';

        let track : Track = new Track(trackInput);

        expect(track.coordinates).to.deep.equal(expectedTrackOutput.coordinates);
    });
});