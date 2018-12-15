export function determineOrder(points : Set<Point>) : string[] {
    let done : string[] = [];
    let readyToDo : string[] = [];
    let remainingPoints : Set<Point> = points;
    while (remainingPoints.size > 0) {
        iterateForOrder(remainingPoints, done, readyToDo);
    }
    return done;
}

export function iterateForOrder(remainingPoints : Set<Point>, done : string[], readyToDo : string[]) {
    for (let remainingPoint of remainingPoints) {
        let ready = true;
        for (let remainingDependency of remainingPoint.preceededBy){
            if (!done.includes(remainingDependency)) {
                ready = false;
            }
        }
        if(ready) {
            readyToDo.push(remainingPoint.node);
            remainingPoints.delete(remainingPoint);
        }
    }
    readyToDo.sort((a, b) => a.localeCompare(b));
    done.push(readyToDo[0]);
    readyToDo.splice(0, 1);
}

export function determineDependencies(points : Set<Point>) : Set<Point> {
    for (let point of points) {
        for (let pointToCompareTo of points) {
            if (point.node != pointToCompareTo.node) {
                if (pointToCompareTo.pointingTo.has(point.node)) {
                    point.preceededBy.add(pointToCompareTo.node);
                }
            }
        }
    }
    return points;
}

export function generatePoints(input: string[]) : Set<Point> {
    let splittedInput : string[][] = splitInput(input);
    let points : Set<Point> = new Set();
    let pointedTo : Set<string> = new Set();
    for (let line of splittedInput) {
        let newPoint : Point = new Point(line[0]);
        if (points.size == 0) {
            newPoint.pointingTo.add(line[1]);
            pointedTo.add(line[1]);
            points.add(newPoint);
        } else {
            let alreadyContained : boolean = false;
            for (let alreadyContainedPoint of points) {
                if (alreadyContainedPoint.node == newPoint.node) {
                    alreadyContainedPoint.pointingTo.add(line[1]);
                    pointedTo.add(line[1]);
                    alreadyContained = true;
                }
            }
            if (!alreadyContained) {
                newPoint.pointingTo.add(line[1]);
                pointedTo.add(line[1]);
                points.add(newPoint);
            }
        }
    }
    for (let pointerTo of pointedTo) {
        let pointContained = false;
        for (let point of points) {
            if (point.node == pointerTo) {
                pointContained = true;
            }
        }
        if (!pointContained) {
            let newPoint : Point = new Point(pointerTo);
            points.add(newPoint);
        }
    }
    return points;
}

export function splitInput(input : string[]) : string[][] {
    let splittedInput : string[][] = [];
    for (let line of input) {
        let split : string[] = line.split(' ');
        splittedInput.push([split[1], split[7]]);
    }
    return splittedInput;
}

export class Point {
    get order(): number {
        return this._order;
    }

    set order(value: number) {
        this._order = value;
    }
    get preceededBy(): Set<string> {
        return this._preceededBy;
    }

    set preceededBy(value: Set<string>) {
        this._preceededBy = value;
    }
    get pointingTo(): Set<string> {
        return this._pointingTo;
    }

    set pointingTo(value: Set<string>) {
        this._pointingTo = value;
    }
    node : string;
    private _pointingTo : Set<string>  = new Set();
    private _preceededBy : Set<string> = new Set();
    private _order : number = 0;

    constructor(node : string) {
        this.node = node;
    }
}