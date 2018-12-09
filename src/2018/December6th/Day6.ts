export function calculateLargestFiniteAreas(coordinateSystem : ChronalCoordinateSystem, coordinates : number[][]) : number {
    let finiteAreaCoordinates : string[] = [];
    for (let coordinate of coordinates) {
        if (coordinate[0] > coordinateSystem.xValueMin + 1 && coordinate[0] < coordinateSystem.xValueMax - 1 &&
        coordinate[1] > coordinateSystem.yValueMin + 1 && coordinate[1] < coordinateSystem.yValueMax - 1) {
            finiteAreaCoordinates.push(coordinate[0] + ',' + coordinate[1]);
        }
    }
    let largestArea : number = 0;
    for (let finiteAreaCoordinate of finiteAreaCoordinates) {
        let area: number = 0;
        for(let x = coordinateSystem.xValueMin; x <= coordinateSystem.xValueMax; x++) {
            for(let y = coordinateSystem.yValueMin; y <= coordinateSystem.yValueMax; y++) {
                if (coordinateSystem.coordinateSystem[x + ',' + y].owner == finiteAreaCoordinate) {
                    let inBorder : boolean = false;
                    for(let xBorder = coordinateSystem.xValueMin; xBorder <= coordinateSystem.xValueMax; xBorder++) {
                        if(coordinateSystem.coordinateSystem[xBorder + ',' + coordinateSystem.yValueMin].owner == finiteAreaCoordinate) {
                            inBorder = true;
                        }
                        if(coordinateSystem.coordinateSystem[xBorder + ',' + coordinateSystem.yValueMax].owner == finiteAreaCoordinate) {
                            inBorder = true;
                        }
                    }
                    for(let yBorder = coordinateSystem.yValueMin + 1; yBorder <= coordinateSystem.yValueMax - 1; yBorder++) {
                        if(coordinateSystem.coordinateSystem[coordinateSystem.xValueMin + ',' + yBorder].owner == finiteAreaCoordinate) {
                            inBorder = true;
                        }
                        if(coordinateSystem.coordinateSystem[coordinateSystem.xValueMax + ',' + yBorder].owner == finiteAreaCoordinate) {
                            inBorder = true;
                        }
                    }
                    if(!inBorder) {
                        area++;
                    }
                }
            }
        }
        if (area > largestArea) {
            largestArea = area;
        }
    }
    return largestArea;
}

export function calculateOwnership(coordinateSystem : ChronalCoordinateSystem, coordinates : number[][]) : ChronalCoordinateSystem {
    let coordinateSystemWithOwners : ChronalCoordinateSystem = coordinateSystem;
    for(let y = coordinateSystem.yValueMin; y <= coordinateSystem.yValueMax; y++) {
        for(let x = coordinateSystem.xValueMin; x <= coordinateSystem.xValueMax; x++) {
            let distancesToCoordinates : {[key: string] : number} = {};
            for (let element of coordinates) {
                distancesToCoordinates[element[0] + ',' + element[1]] = calculateDistance(coordinateSystem.coordinateSystem[element[0] + ',' + element[1]], coordinateSystem.coordinateSystem[x + ',' + y]);
            }
            let smallestDistance : number = calculateDistance(new Coordinate([coordinateSystem.xValueMin, coordinateSystem.yValueMin], 'min'), new Coordinate([coordinateSystem.xValueMax, coordinateSystem.yValueMax], 'max'));
            let closestCoordinates : string[] = [];
            for (let distanceToCoordinates in distancesToCoordinates) {
                if (distancesToCoordinates[distanceToCoordinates] < smallestDistance) {
                    smallestDistance = distancesToCoordinates[distanceToCoordinates];
                }
            }
            for (let distanceToCoordinates in distancesToCoordinates) {
                if (distancesToCoordinates[distanceToCoordinates] == smallestDistance) {
                    closestCoordinates.push(distanceToCoordinates);
                }
            }
            if (closestCoordinates.length == 1) {
                coordinateSystemWithOwners.coordinateSystem[x + ',' + y].owner = closestCoordinates[0];
            } else {
                coordinateSystemWithOwners.coordinateSystem[x + ',' + y].owner = '.';
            }
        }
    }
    return coordinateSystemWithOwners;
}

export function positionChronalCoordinatesIntoCoordinateSystem(coordinates : number[][]) : ChronalCoordinateSystem {
    let coordinateSystem : ChronalCoordinateSystem = new ChronalCoordinateSystem(coordinates);

    for (let element of coordinates) {
        let coordinate : Coordinate = coordinateSystem.coordinateSystem[element[0] + ',' + element[1]];
        coordinate.owner = element[0] + ',' + element[1];
    }

    return coordinateSystem;
}

export function calculateDistance(coordinateA : Coordinate, coordinateB : Coordinate): number {

    let distance = Math.abs(coordinateA.xValue - coordinateB.xValue) + Math.abs(coordinateA.yValue - coordinateB.yValue);

    return distance;
}


export class Coordinate {
    get owner(): string {
        return this._owner;
    }

    set owner(value: string) {
        this._owner = value;
    }

    xValue: number;
    yValue : number;
    coordinateId : string;
    private _owner : string = '.';

    constructor(coordinate : number[], id : string) {
        this.xValue = coordinate[0];
        this.yValue = coordinate[1];
        this.coordinateId = id;
    }

}

export class ChronalCoordinateSystem {

    xValueMin : number;
    yValueMin : number;
    xValueMax: number;
    yValueMax : number;
    coordinateSystem : {[key : string] : Coordinate} = {};

    constructor(containedElements : number[][]) {
        let biggestXValue : number = -1;
        let biggestYValue : number = -1;
        for (let element of containedElements) {
            if(element[0] > biggestXValue) {
                biggestXValue = element[0];
            }
            if(element[1] > biggestYValue) {
                biggestYValue = element[1];
            }
        }
        let smallestXValue : number = biggestXValue;
        let smallestYValue : number = biggestYValue;
        for (let element of containedElements) {
            if(element[0] < smallestXValue) {
                smallestXValue = element[0];
            }
            if(element[1] < smallestYValue) {
                smallestYValue = element[1];
            }
        }
        this.xValueMin = smallestXValue - 1;
        this.yValueMin = smallestYValue - 1;
        this.xValueMax = biggestXValue + 1;
        this.yValueMax = biggestYValue + 1;

        for (let x = smallestXValue - 1; x <= biggestXValue + 1; x++) {
            for (let y = smallestYValue - 1; y <= biggestYValue + 1; y++) {

                this.coordinateSystem[x + ',' + y] = new Coordinate ([x, y], '.');
            }
        }
    }
}