export function totalPowerOfSquare(y: number, x: number, power: number, cells: Cell[][]) {
    for (let yP = y; yP < y + 3; yP++) {
        for (let xP = x; xP < x + 3; xP++) {
            power = power + cells[yP][xP].powerLevel;
        }
    }
    return power;
}

export function calculateLargestSquare(serialNumber : number) : {[key : string] : number} {
    let grid : Grid = new Grid(300, 300, serialNumber);
    let cells : Cell[][] = grid.cells;
    let totalPower : number = 0;
    let square : number[] = [];
    for (let y = 1; y <= 300 - 3; y++) {
        for (let x = 1; x <= 300 - 3; x ++) {
            let power : number = 0;
            power = totalPowerOfSquare(y, x, power, cells);
            if (power > totalPower) {
                totalPower = power;
                square[0] = x;
                square[1] = y;
            }
        }
    }
    return {'x' : square[0], 'y' : square[1], 'totalPower' : totalPower};
}

export class Grid {
    cells : Cell[][] = [];

    private fillGrid() {
        for (let y = 1; y <= this.ySize; y++) {
            this.cells[y] = [];
            for (let x = 1; x <= this.xSize; x++) {
                this.cells[y][x] = new Cell(x, y, this.serialNumber);
            }
        }
    }

    constructor(public readonly xSize : number, public readonly ySize : number, public readonly serialNumber : number) {
        this.fillGrid();
    }
}

export class Cell {

    powerLevel : number = 0;

    private calculatePowerLevel() {
        let rackId : number = this.x + 10;
        let powerLevel : number = (rackId * this.y + this.serialNumber) * rackId;
        if (powerLevel >= 100) {
            powerLevel = Math.floor((powerLevel / 100) % 10);
        } else {
            powerLevel = 0;
        }
        this.powerLevel = powerLevel - 5;
    }

    constructor(public readonly x : number, public readonly y : number, public readonly serialNumber : number){
        this.calculatePowerLevel();
    }
}