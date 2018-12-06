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
