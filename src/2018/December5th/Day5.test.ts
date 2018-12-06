import {performAlchemicalReaction, performTrimming, bestTrimmedPolymer} from "./Day5";
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

    it('trims the polymers', () => {
        let expectedTrimmedPolymers : {[key: string] : string} = {};
        expectedTrimmedPolymers['a'] = 'dbcCCBcCcD';
        expectedTrimmedPolymers['b'] = 'daAcCaCAcCcaDA';
        expectedTrimmedPolymers['c'] = 'dabAaBAaDA';
        expectedTrimmedPolymers['d'] = 'abAcCaCBAcCcaA';

        let trimmedPolymers : {[key: string] : string} = performTrimming(testPolymer);

        expect(trimmedPolymers).to.deep.equal(expectedTrimmedPolymers);
    });

    it('finds the best trimmed polymer', () => {
        let shortestReactionProductLength : number = bestTrimmedPolymer(testPolymer);

        expect(shortestReactionProductLength).to.equal(4);
    });
}
)