export function whichGuardWasAsleepMost(asleepTimePerGuard : {[key: number]: number[]}) : number[] {
    let mostAsleepGuard : number = 0;
    let mostAsleepTime : number = 0;
    let mostSleptMinute : number = -1;
    for(let guard in asleepTimePerGuard) {
        if (asleepTimePerGuard[guard][0] > mostAsleepTime) {
            mostAsleepGuard = parseInt(guard);
            mostAsleepTime = asleepTimePerGuard[guard][0];
            mostSleptMinute = asleepTimePerGuard[guard][1];
        }
    }
    return [mostAsleepGuard, mostSleptMinute];
}

export function determineAsleepTimePerGuard(shiftsPerGuard: {[key: number]: Date[]}): {[key: number]: number[]} {
    let asleepTimePerGuard : {[key: number]: number[]} = {};

    for(let guard in shiftsPerGuard) {
        let times = shiftsPerGuard[guard];
        let totalAsleepTime : number = 0;
        let hour : {[key: number]: number} = {};

        for(let t = 0; t < times.length; t = t + 2) {
            totalAsleepTime = totalAsleepTime + times[t + 1].getMinutes() - times[t].getMinutes();
            for(let m = times[t].getMinutes(); m < times[t + 1].getMinutes(); m++) {
                if(!(m in hour)) {
                    hour[m] = 0;
                }
                hour[m] = hour[m] + 1;
            }
        }

        let mostSleptMinute : number = -1;
        let highestFrequency : number = 0;
        for(let minute in hour) {
            if(hour[minute] > highestFrequency) {
                mostSleptMinute = parseInt(minute);
                highestFrequency = hour[minute];
            }
        }
        asleepTimePerGuard[guard] = [totalAsleepTime, mostSleptMinute];
    }
    return asleepTimePerGuard;
}

export function determineShiftsPerGuard(log : string[]) : {[key: number]: Date[]} {
    let shifts : {[key: number] : Date[]} = Shifts.determine(log);
    let shiftsPerGuard: {[key: number]: Date[]} = {};
    for (let shift in shifts) {
        if(!(shift in shiftsPerGuard)) {
            shiftsPerGuard[shift] = [];
        }
        let times : Date[] = shifts[shift];
        shiftsPerGuard[shift] = shiftsPerGuard[shift].concat(shifts[shift]);
    }
    return shiftsPerGuard;
}

export class Shifts {
    public static determine(log : string[]) {
        let sortedLog : LogEntry[] = sortLogEntries(log);
        let shifts : {[key: number] : Date[]} = {};
        let guardNumber : number = 0;
        for (let logLine of sortedLog)  {
            if (logLine.entryType == EntryType.Guard) {
                guardNumber = logLine.guard;
                if(shifts[guardNumber] == undefined) {
                    shifts[guardNumber] = [];
                }
            } else if(logLine.entryType == EntryType.falls || logLine.entryType == EntryType.wakes) {
                shifts[guardNumber] = shifts[guardNumber].concat(logLine.date);
            }
        }
        return shifts;
    }
}

export function sortLogEntries(log : string[]) : LogEntry[] {
    let logEntries : LogEntry[] = [];
    for (let logLine of log) {
        logEntries.push(new LogEntry(logLine));
    }
    logEntries.sort((a, b) => a.date.valueOf()-b.date.valueOf());

    return logEntries;
}

enum EntryType {
    Guard = 'Guard',
    falls = 'falls',
    wakes = 'wakes'}

export class LogEntry {

    entryType : string = '';
    date : Date;
    guard : number;

    constructor(logEntry : string ){
        let entryFormSplit : string = logEntry.split(/\s/)[2];
        if (entryFormSplit == EntryType.Guard) {
            this.entryType = EntryType.Guard;
        } else if (entryFormSplit == EntryType.falls) {
            this.entryType = EntryType.falls;
        } else if (entryFormSplit == EntryType.wakes) {
            this.entryType = EntryType.wakes;
        }

        let dateString : string[] = logEntry.split(/\[(.*?)\]/);
        this.date = new Date(dateString[1] + ':00');

        this.guard = 0;
        if (this.entryType == EntryType.Guard) {
            let guardSplit : string[] = logEntry.split(/\#(.*?)\s/);
            this.guard = parseInt(guardSplit[1], 10);
        }

    }
}