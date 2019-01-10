export class Track{
    coordinates : string[][] = [];
    carts : Set<Cart> = new Set();
    cleanTrackCoordinates : string[][] = [];
    firstCrash : string = '';

    public runRace() {
        while (this.firstCrash == '') {
            this.moveCarts();
        }
    }

    public moveCarts() {
        let orderedCarts : Cart[] = [];
        for (let y = 0; y < this.coordinates.length; y++) {
            for (let x = 0; x < this.coordinates[y].length; x++) {
                for (let cart of this.carts) {
                    if (cart.xPosition == x && cart.yPosition == y) {
                        orderedCarts.push(cart);
                    }
                }
            }
        }
        for (let cart of orderedCarts) {
            this.moveToNextPosition(cart);
            this.changeDirection(cart);
        }
    }

    public moveToNextPosition(cart : Cart) {
        this.coordinates[cart.yPosition][cart.xPosition] = this.cleanTrackCoordinates[cart.yPosition][cart.xPosition].valueOf();
        if (cart.direction == '^') {
            cart.yPosition = cart.yPosition - 1;
        } else if (cart.direction == '>') {
            cart.xPosition = cart.xPosition + 1;
        } else if (cart.direction == 'v') {
            cart.yPosition = cart.yPosition + 1;
        } else if (cart.direction == '<') {
            cart.xPosition = cart.xPosition - 1;
        }
    }

    public changeDirection(cart: Cart) {
        let trackCoordinate : string = this.coordinates[cart.yPosition][cart.xPosition].toString();
        if (trackCoordinate == '/' && cart.direction == '^') {
            cart.direction = '>';
        } else if (trackCoordinate == '/' && cart.direction == '<') {
            cart.direction = 'v';
        } else if (trackCoordinate == '/' && cart.direction == 'v') {
            cart.direction = '<';
        } else if (trackCoordinate == '/' && cart.direction == '>') {
            cart.direction = '^';
        }

        if (trackCoordinate == '\\' && cart.direction == '<') {
            cart.direction = '^';
        } else if (trackCoordinate == '\\' && cart.direction == '^') {
            cart.direction = '<';
        } else if (trackCoordinate == '\\' && cart.direction == '>') {
            cart.direction = 'v';
        } else if (trackCoordinate == '\\' && cart.direction == 'v') {
            cart.direction = '>';
        }

        if (trackCoordinate == '+' && cart.direction == '<') {
            if (cart.turn == Turn.left) {
                cart.direction = 'v';
            } else if (cart.turn == Turn.right) {
                cart.direction = '^';
            }
            cart.nextTurn();
        } else if (trackCoordinate == '+' && cart.direction == '^') {
            if (cart.turn == Turn.left) {
                cart.direction = '<';
            } else if (cart.turn == Turn.right) {
                cart.direction = '>';
            }
            cart.nextTurn();
        } else if (trackCoordinate == '+' && cart.direction == '>') {
            if (cart.turn == Turn.left) {
                cart.direction = '^';
            } else if (cart.turn == Turn.right) {
                cart.direction = 'v';
            }
            cart.nextTurn();
        } else if (trackCoordinate == '+' && cart.direction == 'v') {
            if (cart.turn == Turn.left) {
                cart.direction = '>';
            } else if (cart.turn == Turn.right) {
                cart.direction = '<';
            }
            cart.nextTurn();
        }
        this.coordinates[cart.yPosition][cart.xPosition] = cart.direction;
        if (trackCoordinate != '/' && trackCoordinate != '\\' && trackCoordinate != '+' && trackCoordinate != '-' && trackCoordinate != '|') {
            this.coordinates[cart.yPosition][cart.xPosition] = 'X';
            this.firstCrash = cart.xPosition + ',' + cart.yPosition;
        }
    }

    constructor(input : string) {
        let inputLines : string[] = input.split("\n");
        let longestLine : number = 0;
        for (let line of inputLines) {
            if (line.length > longestLine) {
                longestLine = line.length;
            }
        }
        let y : number = 0;
        for (let line of inputLines) {
            this.coordinates[y] = [];
            for (let x = 0; x < longestLine; x++) {
                if (x >= line.length) {
                    this.coordinates[y][x] = ' ';
                } else {
                    let currentChar : string = line.charAt(x);
                    this.coordinates[y][x] = currentChar;
                    if (currentChar == '^' || currentChar == 'v' || currentChar == '<' || currentChar == '>') {
                        this.carts.add(new Cart(currentChar, x, y));
                    }
                }
            }
            y++;
        }
        let coordinatesLength : number = this.coordinates.length;
            this.cleanTrackCoordinates  = new Array(coordinatesLength);
        for (let i = 0; i < coordinatesLength; ++i) {
            this.cleanTrackCoordinates[i] = [...this.coordinates[i]];
        }
        for (let y = 0; y < this.coordinates.length; y++) {
            for (let x = 0; x < this.coordinates[y].length; x++) {
                if (this.coordinates[y][x] == '^' || this.coordinates[y][x] == 'v') {
                    this.cleanTrackCoordinates[y][x] = '|';
                } else if (this.coordinates[y][x] == '<' || this.coordinates[y][x] == '>') {
                    this.cleanTrackCoordinates[y][x] = '-';
                }
            }
        }
    }
}

export class Cart{

    turn : Turn = Turn.left;

    public nextTurn() {
        if (this.turn == Turn.left) {
            this.turn = Turn.straight;
        } else if (this.turn == Turn.straight) {
            this.turn = Turn.right;
        } else if (this.turn == Turn.right) {
            this.turn = Turn.left;
        }
    }

    constructor(public direction : string, public xPosition : number, public yPosition : number) {
    }
}

export enum Turn {
    left, right, straight
}