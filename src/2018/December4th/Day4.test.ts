import {LogEntry, Shifts, determineShiftsPerGuard, determineAsleepTimePerGuard, whichGuardWasAsleepMost} from "./Day4";
import {expect} from "chai";
const moment = require("moment");
import {Moment} from "moment";

describe('NightShifts', () => {

    const testLog: string[] =[
        '[1518-11-05 00:03] Guard #99 begins shift',
        '[1518-11-01 00:00] Guard #10 begins shift',
        '[1518-11-01 00:05] falls asleep',
        '[1518-11-04 00:02] Guard #99 begins shift',
        '[1518-11-03 00:24] falls asleep',
        '[1518-11-01 00:25] wakes up',
        '[1518-11-01 00:30] falls asleep',
        '[1518-11-01 00:55] wakes up',
        '[1518-11-01 23:58] Guard #99 begins shift',
        '[1518-11-02 00:40] falls asleep',
        '[1518-11-02 00:50] wakes up',
        '[1518-11-03 00:05] Guard #10 begins shift',
        '[1518-11-03 00:29] wakes up',
        '[1518-11-04 00:36] falls asleep',
        '[1518-11-04 00:46] wakes up',
        '[1518-11-05 00:45] falls asleep',
        '[1518-11-05 00:55] wakes up'];

    let expectedShiftsPerGuard : {[key: number]: Date[]} = {
        10: [new Date('1518-11-01 00:05:00'),
            new Date('1518-11-01 00:25:00'),
            new Date('1518-11-01 00:30:00'),
            new Date('1518-11-01 00:55:00'),
            new Date('1518-11-03 00:24:00'),
            new Date('1518-11-03 00:29:00')],
        99: [new Date('1518-11-02 00:40:00'),
            new Date('1518-11-02 00:50:00'),
            new Date('1518-11-04 00:36:00'),
            new Date('1518-11-04 00:46:00'),
            new Date('1518-11-05 00:45:00'),
            new Date('1518-11-05 00:55:00')]

    };
    let expectedAsleepTimePerGuard : {[key: number]: number[]} = {
        10: [(20+25+5), 24],
        99: [(10+10+10), 45]
    };

    it('should say that guard 10 was asleep most of the time', () => {
        let mostAsleepGuard : number[] = whichGuardWasAsleepMost(expectedAsleepTimePerGuard);

        expect(mostAsleepGuard).to.deep.equal([10, 24])
        console.log((mostAsleepGuard[0]*mostAsleepGuard[1]) + ': result of Puzzle1')
    });

    it('should return 50 min for guard 10 asleep and most asleep in minute 24', () => {
        let asleepTimePerGuard : {[key: number]: number[]} = determineAsleepTimePerGuard(expectedShiftsPerGuard);

        expect(asleepTimePerGuard).to.deep.equal(expectedAsleepTimePerGuard);
    });

    it('should return shifts for two guards', () => {
        let shiftsPerGuard : {[key: number]: Date[]} = determineShiftsPerGuard(testLog);

        expect(shiftsPerGuard).to.deep.equal(expectedShiftsPerGuard);
    });

    it('parsing of guard log entry', () => {
        let testDate : Date = new Date('1518-11-01 00:00:00');
        let logEntry : LogEntry = new LogEntry('[1518-11-01 00:00] Guard #10 begins shift');

        expect(logEntry.date).to.deep.equal(testDate);
        expect(logEntry.guard).to.equal(10);
        expect(logEntry.entryType).to.equal('Guard');
    });

    it('parsing of falling asleep log entry', () => {
        let testDate : Date = new Date('1518-11-01 00:05:00');
        let logEntry : LogEntry = new LogEntry('[1518-11-01 00:05] falls asleep',);

        expect(logEntry.date).to.deep.equal(testDate);
        expect(logEntry.guard).to.equal(0);
        expect(logEntry.entryType).to.equal('falls');
    });

    it('parsing of awakening log entry', () => {
        let testDate : Date = new Date('1518-11-01 00:25:00');
        let logEntry : LogEntry = new LogEntry('[1518-11-01 00:25] wakes up',);

        expect(logEntry.date).to.deep.equal(testDate);
        expect(logEntry.guard).to.equal(0);
        expect(logEntry.entryType).to.equal('wakes');
    });

    }
)