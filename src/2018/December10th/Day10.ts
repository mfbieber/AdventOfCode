export function findMessage(messageInput : string) : string {
    let stars : Star[] = generateStarsFromInput(messageInput);
    let messageStars : Star[] = [];
    let smallestSize : number = 1000000^2;
    for (let seconds = 0; seconds <= 15000; seconds++) {
        let movedStars : Star[] = [];
        let xRange : number[] = [0, 0];
        let yRange : number[] = [0, 0];
        for (let star of stars) {
            let moveStar : Star = star.determinePositionAfterSeconds(seconds);
            if (moveStar.x > xRange[1]) {
                xRange[1] = moveStar.x;
            }
            if (moveStar.x < xRange[0]) {
                xRange[0] = moveStar.x;
            }
            if (moveStar.y > yRange[1]) {
                yRange[1] = moveStar.y;
            }
            if (moveStar.y < yRange[0]) {
                yRange[0] = moveStar.y;
            }
            movedStars.push(moveStar);
        }
        let fieldSize : number = ((Math.abs(xRange[1]) + Math.abs(xRange[0])) * (Math.abs(yRange[1]) + Math.abs(yRange[0])));
        if (Math.abs(fieldSize) < smallestSize) {
            smallestSize = fieldSize;
            messageStars = movedStars;
            console.log('It took ' + seconds + ' s.');
        }
        /*if (fieldSize/smallestSize > 10) {
            break;
        }*/
        if((seconds % 100) == 0) {
            console.log(seconds/15000 * 100 + ' %');
        }
    }
    return generateOutputField(messageStars);
}

export function determinePositionsAfterSeconds(messageInput : string, seconds : number) : string {
    let stars : Star[] = generateStarsFromInput(messageInput);
    let movedStars : Star[] = [];
    for (let star of stars) {
        movedStars.push(star.determinePositionAfterSeconds(seconds));
    }
    return generateOutputField(movedStars);
}

export function determineInitialPositions(messageInput : string) : string {
    let stars : Star[] = generateStarsFromInput(messageInput);
    return generateOutputField(stars);
}

export function generateOutputField(stars: Star[]) : string {
    let xRange : number[] = [0, 0];
    let yRange : number[] = [0, 0];
    let output : {[key : number] : {[key: number] : string}} = {};
    for (let star of stars) {
        if (star.x > xRange[1]) {
            xRange[1] = star.x;
        }
        if (star.x < xRange[0]) {
            xRange[0] = star.x;
        }
        if (star.y > yRange[1]) {
            yRange[1] = star.y;
        }
        if (star.y < yRange[0]) {
            yRange[0] = star.y;
        }
        if (output[star.y] == undefined) {
            output[star.y] = {};
        }
        output[star.y][star.x] = '#';
    }
    let outputField : string = '';
    for (let y = yRange[0]; y <= yRange[1]; y++) {
        if (output[y] == undefined) {
            output[y] = {};
        }
        let horizontalLine : string = '';
        for (let x = xRange[0]; x <= xRange[1]; x++) {
            if (output[y][x] == '#') {
                horizontalLine = horizontalLine.concat('#');
            }
            else {
                horizontalLine = horizontalLine.concat('.');
            }
        }
        outputField = outputField.concat(horizontalLine + '\n');
    }
    return outputField;
}

export function generateStarsFromInput(messageInput: string) : Star[] {
    let inputArray : string[] = messageInput.split("\n");
    let stars : Star[] = [];
    for (let line of inputArray) {
        let entry : string[] = line.match((/-?\d+/g))!;
        stars.push(new Star(parseInt(entry[0]), parseInt(entry[1]), parseInt(entry[2]), parseInt(entry[3])));
    }
    return stars;
};

export class Star {

    public determinePositionAfterSeconds(second : number) : Star {
        return new Star(this.x + this.velocityX * second, this.y + this.velocityY * second, 0, 0);
    }

    constructor(public readonly x : number, public readonly y : number, public readonly velocityX : number, public readonly velocityY : number) {
    }

}