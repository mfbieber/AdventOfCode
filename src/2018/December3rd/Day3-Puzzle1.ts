export class DoesClaimOverlap {

    public static calculate(input : string[]): number {
        let claimId : number = 0;
        for (let i = 0; i < input.length; i++) {
            let foundOverlap : boolean = false;
            for (let j = 0; j < input.length; j++) {
                if(i == j){
                    continue;
                }
                let overlapResult = FabricsOverlap.find(new Claim(input[i]), new Claim(input[j]));
                if(overlapResult.length > 0) {
                    foundOverlap = true;
                    break;
                }
            }
            if (!foundOverlap) {
                let claimSplit : string[] = input[i].split(/\D/);
                for (let digit of claimSplit) {
                    if (parseInt(digit) >= 0) {
                        claimId = parseInt(digit);
                        break;
                    }
                }
                break;
            }
        }
        return claimId;
    }
}


export class SquareInchesOverlaping {

    public static calculate(input : string[]): number {
        let result = [];
        for (let i = 0; i < input.length; i++) {
            for (let j = i + 1; j < input.length; j++) {
                let overlap : number[][] = FabricsOverlap.find(new Claim(input[i]), new Claim(input[j]));
                for (let coordinates of overlap) {
                    if(result.length > 0) {
                        let isAlreadyInResult : boolean = false;
                        for (let resultCoordinates of result) {
                            if((resultCoordinates[0] == coordinates[0]) && (resultCoordinates[1] == coordinates[1])) {
                                isAlreadyInResult = true;
                                break;
                            }
                        }
                        if(!isAlreadyInResult) {
                            result.push(coordinates);
                        }
                    } else {
                        result.push(coordinates);
                    }
                }
            }
        }
        console.log(result.length + ' squareInches');
        return result.length;
    }
}

export class FabricsOverlap {

    public static find(firstClaim : Claim, secondClaim : Claim): number[][] {
        let overlapCoordinates : number[][] = [];
        let firstFabric : Fabric = new Fabric(firstClaim);
        let secondFabric : Fabric = new Fabric(secondClaim);
        for (let firstArrayCoordinates of firstFabric.fabricArray) {
            for (let secondArrayCoordinates of secondFabric.fabricArray) {
                if ((firstArrayCoordinates[0] == secondArrayCoordinates[0]) && (firstArrayCoordinates[1] == secondArrayCoordinates[1])) {
                    overlapCoordinates.push(firstArrayCoordinates);
                }
            }
        }
        return overlapCoordinates;
    }
}

export class Fabric {
    fabricArray : number[][] = [];

    public static from(claim : Claim): Fabric {
        return new Fabric(claim);
    }

    constructor(claim : Claim) {
        let xDimensionStart = claim.xEdge + 1;
        let xDimensionEnd =  claim.xEdge + claim.xDimension;
        let yDimensionStart = claim.yEdge + 1;
        let yDimensionEnd = claim.yEdge + claim.yDimension;
        for (let xCoordinates : number = xDimensionStart; xCoordinates <= xDimensionEnd; xCoordinates++){
            for (let yCoordinates : number = yDimensionStart; yCoordinates <= yDimensionEnd; yCoordinates++){
                this.fabricArray.push([xCoordinates, yCoordinates]);
            }
        }
    }
}

export class Claim{
    xEdge : number;
    yEdge : number;
    xDimension : number;
    yDimension : number;

    constructor(claim : string) {
        let claimSplit : string[] = claim.split(/\D/);
        let claimSplitDigits : number[] = [];
        for (let digit of claimSplit) {
            if (parseInt(digit) >= 0) {
                claimSplitDigits.push(parseInt(digit));
            }
        }
        this.xEdge = claimSplitDigits[1];
        this.yEdge = claimSplitDigits[2];
        this.xDimension = claimSplitDigits[3];
        this.yDimension = claimSplitDigits[4];
    }
}