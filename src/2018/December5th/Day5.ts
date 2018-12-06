export function bestTrimmedPolymer(startingMaterial : string) : number {
    let trimmedStaringMaterials : {[key: string] : string} = performTrimming(startingMaterial);
    let shortestReactionProductLength : number = startingMaterial.length;
    for(let trimmedStartingMaterial in trimmedStaringMaterials) {
        let reactionProductLength: number = performAlchemicalReaction(trimmedStaringMaterials[trimmedStartingMaterial]).length;
        if(reactionProductLength < shortestReactionProductLength) {
            shortestReactionProductLength = reactionProductLength;
        }
    }
    return shortestReactionProductLength;
}

export function performTrimming(startingMaterial: string) : {[key: string] : string} {
    let alphabet : string[] = ['a' ,'b', 'c', 'd', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let trimmedPolymers : {[key: string] : string} = {};
    for(let letter of alphabet) {
        let trimmedPolymer : string = '';
        let trimmingPerformed : boolean = false;
        for (let position = 0; position < startingMaterial.length; position++) {
            if (startingMaterial.charAt(position).toLowerCase() !== letter) {
                trimmedPolymer = trimmedPolymer + startingMaterial.slice(position, position + 1)
            }  else {
                trimmingPerformed = true;
            }
        }
        if(trimmingPerformed) {
            trimmedPolymers[letter] = trimmedPolymer;
        }
    }
    return trimmedPolymers;
}

export function performAlchemicalReaction(startingMaterial : string) : string {
    let reactionStep : Reaction = performAlchemicalReactionStep(startingMaterial);
    let reactionPerformed : boolean = reactionStep.reactionPerformed;
    while (reactionPerformed) {
        reactionStep = performAlchemicalReactionStep(reactionStep.reactionProduct);
        reactionPerformed = reactionStep.reactionPerformed;
    }
    return reactionStep.reactionProduct;
}

export function performAlchemicalReactionStep(startingMaterial : string) : Reaction {
    let reactionProduct : string = '';
    let reactionPerformed : boolean = false;
    for(let unit = 0; unit < startingMaterial.length; unit++) {
        if(startingMaterial.charAt(unit) === startingMaterial.charAt(unit + 1)) {
            reactionProduct = reactionProduct + startingMaterial.slice(unit, unit + 1);
        } else if(startingMaterial.charAt(unit).toLowerCase() === startingMaterial.charAt(unit + 1) ||
            startingMaterial.charAt(unit).toUpperCase() === startingMaterial.charAt(unit + 1)) {
            unit++;
            reactionPerformed = true;
        } else {
            reactionProduct = reactionProduct + startingMaterial.slice(unit, unit + 1);
        }
    }
    return new Reaction(reactionProduct, reactionPerformed);
}

export class Reaction {
    reactionProduct : string;
    reactionPerformed : boolean;

    constructor(reactionProduct : string, reactionPerformed : boolean) {
        this.reactionProduct = reactionProduct;
        this.reactionPerformed = reactionPerformed;
    }
}
