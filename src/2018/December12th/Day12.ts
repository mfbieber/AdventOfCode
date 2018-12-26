export function readInitialState(initialState : string) : {[key: number] : string } {
    let parsedInitialState : {[key: number] : string } = {};
    for (let i = 1; i <= initialState.length; i++) {
        parsedInitialState[i] = initialState.charAt(i-1);
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
    pots : Map<number, Pot> = new Map();
    keys : number[] = [];

    public generateOutputStateString() : string {
        let keys : number[] = this.determineAllKeys(this.pots);
        let outputString : string = '';
        for (let key of keys) {
            console.log(key);
            if (this.pots.get(key)!.containsPlant) {
                outputString = outputString.concat('#');
            } else {
                outputString = outputString.concat('.');
            }
        }
        return outputString;
    }

    private determineAllKeys(pots: Map<number, Pot>) : number[] {
        return Array.from(this.pots.keys()).sort((a,b) => a-b);
    }

    public applyNotesToPots() {
        let keys : number[] = this.determineAllKeys(this.pots);
        if(this.pots.get(keys[0])!.containsPlant) {
            this.pots.set(keys[0]-1, new Pot(keys[0]-1, false));
            this.pots.set(keys[0]-2, new Pot(keys[0]-2, false));
        }
        if (this.pots.get(keys[1])!.containsPlant && !this.pots.get(keys[0])!.containsPlant) {
            this.pots.set(keys[0]-1, new Pot(keys[0]-1, false));
        }
        if (this.pots.get(keys[keys.length-1])!.containsPlant) {
            this.pots.set(keys[keys.length-1]+1, new Pot(keys[keys.length-1]+1, false));
            this.pots.set(keys[keys.length-1]+2, new Pot(keys[keys.length-1]+2, false));
        }
        if (this.pots.get(keys[keys.length-2])!.containsPlant && !this.pots.get(keys[keys.length-1])!.containsPlant) {
            this.pots.set(keys[keys.length-1]+1, new Pot(keys[keys.length-1]+1, false));
        }
        keys = this.determineAllKeys(this.pots);
        let newGenPots : Map<number, Pot> = new Map(this.pots);
        for (let key = keys[2]; key <= keys[keys.length-3]; key++) {
            let hasPlantInNextGen : boolean = false;
            let checkPots : string = '';
            for (let i = key - 2; i <= key + 2; i++) {
                checkPots = checkPots.concat(this.pots.get(i)!.toString())
            }
            for (let note in this.notes) {
                console.log(checkPots + ' ' + this.notes[note][0]);
                if (checkPots == this.notes[note][0]) {
                    console.log(this.notes[note][1]);
                    if (this.notes[note][1] == '#') {
                        hasPlantInNextGen = true;
                    }
                    break;
                }
            }
            newGenPots.set(key, new Pot(key, hasPlantInNextGen));
        }
        this.pots = newGenPots;
    }

    constructor(public initialState : {[key: number] : string }, public readonly notes : {[key: number] : string[]}) {
        for (let entry in initialState){
            let containsPlant : boolean = false;
            if (initialState[entry] == '#') {
                containsPlant = true;
            }
            this.pots.set(parseInt(entry), new Pot(parseInt(entry), containsPlant));
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