export function determineTime(workers: number, stepDurations : number, points : Set<Point>) : number {
    let done : string[] = [];
    let readyToDo : string[] = [];
    let remainingPoints : Set<Point> = new Set(points);
    let steps : number = -1;
    let workingWorkers : Worker[] = [];
    for (let i = 0; i < workers; i++) {
        workingWorkers.push(new Worker());
    }
    while (done.length < points.size) {
        iterateForOrderWithSeveralWorkers(workingWorkers, remainingPoints, done, readyToDo, stepDurations);
        steps++;
    }
    return (steps);
}

export function iterateForOrderWithSeveralWorkers(workersWorking : Worker[], remainingPoints : Set<Point>, done : string[], readyToDo : string[], stepDurations : number) {
    let alphabet : {[key : string] : number} = { 'A' : 1, 'B': 2, 'C' : 3, 'D' : 4, 'E' : 5, 'F' : 6, 'G' : 7, 'H' : 8, 'I' : 9, 'J': 10,
        'K' : 11, 'L' : 12, 'M' : 13, 'N' : 14, 'O' : 15, 'P' : 16, 'Q': 17, 'R' : 18, 'S' : 19, 'T' : 20,
        'U' : 21, 'V' : 22, 'W' : 23, 'X' : 24, 'Y' : 25, 'Z' : 26};
    for(let worker of workersWorking) {
        if (worker.stepsNeeded == 0) {
            if (worker.workingOn != '') {
                done.push(worker.workingOn);
                worker.workingOn = '';
                worker.stepsDone = 0;
            }
        }
    }
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
    for(let worker of workersWorking) {
        if (worker.stepsNeeded == 0) {
            if (worker.workingOn != '') {
                done.push(worker.workingOn);
                worker.workingOn = '';
                worker.stepsDone = 0;
            }
            if (worker.workingOn == '') {
                if (readyToDo.length > 0) {
                    worker.workingOn = readyToDo[0];
                    worker.stepsNeeded = alphabet[worker.workingOn] + stepDurations;
                    worker.stepsDone = 0;
                    readyToDo.splice(0, 1);
                }
            }
        }
        if (worker.stepsNeeded > 0) {
            worker.stepsDone++;
            worker.stepsNeeded--;
        }
    }
}

export class Worker {
    get stepsNeeded(): number {
        return this._stepsNeeded;
    }

    set stepsNeeded(value: number) {
        this._stepsNeeded = value;
    }
    get workingOn(): string {
        return this._workingOn;
    }

    set workingOn(value: string) {
        this._workingOn = value;
    }
    get stepsDone(): number {
        return this._stepsDone;
    }

    set stepsDone(value: number) {
        this._stepsDone = value;
    }
    private _workingOn : string;
    private _stepsNeeded : number;
    private _stepsDone : number;

    constructor() {
        this._workingOn = '';
        this._stepsNeeded = 0;
        this._stepsDone = 0;
    }
}

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

type PointName = string

export function generatePoints(input: string[]) : Set<Point> {
    let splittedInput : string[][] = splitInput(input);
    let points : Set<Point> = new Set();
    let pointedTo : Set<PointName> = new Set();
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
    const pointsAsStrings = [...points].map(point => point.node);
    pointedTo.forEach(pointerTo => {
        if (!pointsAsStrings.includes(pointerTo)) {
            let newPoint : Point = new Point(pointerTo);
            points.add(newPoint);
        }
    });
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