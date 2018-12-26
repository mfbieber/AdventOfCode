import {expect} from "chai";

export function readInitialState(initialState : string) : {[key: number] : string } {
    let parsedInitialState : {[key: number] : string } = {};
    for (let i = 0; i < initialState.length; i++) {
        parsedInitialState[i] = initialState.charAt(i);
    }
    return parsedInitialState;
}

export function readNotes(notes : string) :  {[key: number] : string[]} {
    let noteArray : string[] = notes.split("\n");
    let parsedNotes :  {[key: number] : string[]} = {};
    let i : number = 1;
    for (let note of noteArray) {
        parsedNotes[i] = [note.split(" ")[0], note.split(" ")[2]];
        i++;
    }
    return parsedNotes;
}

export class Pots {
    pots : Pot[] = [];

    public countPotsAfterGenerations(generations : number) : number {
        for (let i = 1; i <= generations; i++) {
            this.applyNotesToPots();
        }
        let potNumber : number = 0;
        for (let pot of this.pots) {
            if (pot.containsPlant) {
                potNumber = potNumber + pot.potNumber;
            }
        }
        return potNumber;
    }

    public generateOutputStateString() : string {
        let outputString : string = '';
        for (let pot of this.pots) {
            if (pot.containsPlant) {
                outputString = outputString.concat('#');
            } else {
                outputString = outputString.concat('.');
            }
        }
        return outputString;
    }

    private addPotsToStart(pots : Pot[]){
         pots.unshift(new Pot(pots[0].potNumber - 1, false));
    }

    private addPotstoEnd(pots : Pot[]) {
        pots.push(new Pot(pots[pots.length-1].potNumber + 1, false));
    }


    public applyNotesToPots() {
        let enoughEmptyPots : boolean = false;
        while (!enoughEmptyPots) {
            let enoughEmptyPotsAtStart : boolean = false;
            let enoughEmptyPotsAtEnd : boolean = false;
            if (this.pots[0].containsPlant || this.pots[1].containsPlant || this.pots[2].containsPlant) {
                this.addPotsToStart(this.pots);
            } else {
                enoughEmptyPotsAtStart = true;
            }
            if (this.pots[this.pots.length-1].containsPlant || this.pots[this.pots.length-2].containsPlant || this.pots[this.pots.length-3].containsPlant) {
                this.addPotstoEnd(this.pots);
            }
            else {
                enoughEmptyPotsAtEnd = true;
            }
            if (enoughEmptyPotsAtStart && enoughEmptyPotsAtEnd) {
                enoughEmptyPots = true;
            }
        }
        let newGenPots : Pot[] = Array.from(this.pots);
        for (let index = 2; index <= newGenPots.length - 3; index++) {
            let hasPlantInNextGen : boolean = false;
            let checkPots : string = '';
            for (let i = index - 2; i <= index + 2; i++) {
                checkPots = checkPots.concat(this.pots[i].toString())
            }
            for (let note in this.notes) {
                if (checkPots == this.notes[note][0]) {
                    if (this.notes[note][1] == '#') {
                        hasPlantInNextGen = true;
                    }
                    break;
                }
            }
            newGenPots[index] =  new Pot(this.pots[index].potNumber, hasPlantInNextGen);
        }
        this.pots = newGenPots;
    }

    constructor(public initialState : {[key: number] : string }, public readonly notes : {[key: number] : string[]}) {
        for (let entry in initialState){
            let containsPlant : boolean = false;
            if (initialState[entry] == '#') {
                containsPlant = true;
            }
            this.pots.push(new Pot(parseInt(entry), containsPlant));
        }
    }
}

export class Pot {
    public toString() : string {
        if (this.containsPlant) {
            return '#';
        } else {
            return '.';
        }
    }

    constructor(public readonly potNumber: number, public readonly containsPlant : boolean) {
    }
}