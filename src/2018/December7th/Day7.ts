export function sortPoints(input: string[]) : {[key: number] : Point} {
    let points : {[key: string] : Point} = generatePoints(input);
    let pointKeysDone : {[key: string] : boolean} = {};
    let maxsize : number = 0;
    for (let point in points) {
        maxsize++;
        pointKeysDone[point] = false;
    }
    let sortedStartingPoints : {[key: number] : Point} = determineStartingPoint(points);
    for (let sortedStartingPoint in sortedStartingPoints) {
        points[sortedStartingPoint] = sortedStartingPoints[sortedStartingPoint];
        pointKeysDone[sortedStartingPoints[sortedStartingPoint].node] = true;
    }
    let size : number = 1;
    while (size <= maxsize) {
        let workInProgress : [{[key: number] : Point}, {[key: string] : boolean}] = orderPointsIteration(points, pointKeysDone);
        points = workInProgress[0];
        pointKeysDone = workInProgress[1];
        console.log(points);
        console.log(pointKeysDone);
        size++;
    }
    console.log(points);
    return points;
}

export function orderPointsIteration(points : {[key: string] : Point}, pointKeysDone : {[key: string] : boolean}) : [{[key: number] : Point}, {[key: string] : boolean}] {
    let needed : boolean = true;
    for (let donePoint in pointKeysDone) {
       let count : number = 0;
       for (let point in points) {
           count++
       }
       for (let pointKeyDone in pointKeysDone) {
           if (pointKeysDone[pointKeyDone]) {
               count--;
           }
       }
       if (pointKeysDone[donePoint]) { //if the point has already been done
           let pointers : string[] = points[donePoint].pointingTo;
           pointers.sort((a, b) => a.localeCompare(b));
           for (let pointer of pointers) { //take the first pointer to continue with
               for (let donePoint2 in pointKeysDone) {
                   if (!pointKeysDone[donePoint2]) { //take the points not done yet
                       let donePoint2pointers : string[] = points[donePoint2].pointingTo;
                       for (let donePoint2Pointer in donePoint2pointers) {
                           if (donePoint2Pointer != pointer) { //check if one of them points to the pointer to continue with
                                needed = false;
                           }
                       }
                   }
               }
               if (!needed) {
                   points[count] = points[pointer];
                   pointKeysDone[pointer] = true;
               }
           }
       }

   }
   return [points, pointKeysDone];
}

export function determineStartingPoint(points : {[key: string] : Point}) : {[key: number] : Point} {
    let nodes : string[] = [];
    let startingNodes : string[] = [];
    let sortedStartingPoints : {[key: number] : Point} = {};
    for (let point in points) {
        nodes.push(point);
    }
    for (let node of nodes) {
        let pointingToNode = false;
        for (let point in points) {
            for (let pointer of points[point].pointingTo) {
                if (pointer == node) {
                    pointingToNode = true;
                    break;
                }
            }
        }
        if (!pointingToNode) {
            startingNodes.push(node);
        }
    }
    startingNodes.sort((a, b) => a.localeCompare(b));
    let count : number = 1;
    for (let startingNode of startingNodes) {
        sortedStartingPoints[count] = points[startingNode];
        sortedStartingPoints[count].neededBy.push('none');
        sortedStartingPoints[count].order = count;
        count++;
    }
    return sortedStartingPoints;
}

export function generatePoints(input: string[]) : {[key: string] : Point} {
    let splittedInput : string[][] = splitInput(input);
    let points : {[key: string] : Point} = {};
    for (let element of splittedInput) {
        if (!points[element[0]]) {
            points[element[0]] = new Point(element[0]);
            points[element[0]].pointingTo.push(element[1]);
        } else {
            for (let pointer of points[element[0]].pointingTo) {
                if (pointer != element[1]) {
                    points[element[0]].pointingTo.push(element[1]);
                    break;
                }
            }
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
    get neededBy(): string[] {
        return this._neededBy;
    }

    set neededBy(value: string[]) {
        this._neededBy = value;
    }
    get pointingTo(): string[] {
        return this._pointingTo;
    }

    set pointingTo(value: string[]) {
        this._pointingTo = value;
    }
    node : string;
    private _pointingTo : string[] = [];
    private _neededBy : string[] = [];
    private _order : number = 0;

    constructor(node : string) {
        this.node = node;
    }
}