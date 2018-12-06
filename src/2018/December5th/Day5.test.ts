import {performAlchemicalReaction} from "./Day5";
import {expect} from "chai";

describe('Alchemical reactions', () => {

    const testPolymer: string = 'dabAcCaCBAcCcaDA';
    const testPolymer2: string = 'dabAcCaaaaaaaaCBAcCcaDA';


        it('should perform the alchemical reactions', () => {
        let reactedPolymer: string = performAlchemicalReaction(testPolymer);
        let reactedPolymer2: string = performAlchemicalReaction(testPolymer2);


        expect(reactedPolymer).to.deep.equal('dabCBAcaDA');
        console.log('resulting polymer: ' + reactedPolymer + ', polymer length: ' + reactedPolymer.length);
        expect(reactedPolymer2).to.deep.equal('dabaaaaaaaCBAcaDA');
        console.log('resulting polymer: ' + reactedPolymer2 + ', polymer length: ' + reactedPolymer2.length);
    });
}
)