export function determineHighScore(numberOfPlayers : number, marbleHighestValue : number) : number {
    let players : {[key: number] : number} = {};
    let marbleValue : number = 0;
    let previousNode : Knoten = new Knoten(0);
    marbleValue++;
    while (marbleValue <= marbleHighestValue) {
        for (let player = 1; player <= numberOfPlayers; player++) {
            let node : Knoten = new Knoten(marbleValue);
            if ((marbleValue % 23) == 0) {
                players[player] = players[player] + marbleValue;
                let lastLeftNode : Knoten = previousNode;
                for (let i = 1; i <=7; i++) {
                    lastLeftNode = lastLeftNode.marbleLeft;
                }
                lastLeftNode.marbleLeft = node;
                lastLeftNode.marbleLeft.marbleRight = node;
                if (players[player]) {
                    players[player] = 0;
                }
                players[player] = players[player] + lastLeftNode.marble;
                previousNode = lastLeftNode.marbleRight;
            } else {
                node.marbleLeft = previousNode;
                node.marbleRight = previousNode.marbleRight;
                console.log(node);
                previousNode.marbleRight.marbleLeft = node;
                previousNode.marbleRight = node;
                previousNode = node;
            }
            marbleValue++;
        }
    }
    return marbleValue;
}

type Marble = number;
export class Knoten {
    marble : Marble;
    marbleLeft : Knoten;
    marbleRight : Knoten;

    constructor(marbleValue : number) {
        this.marble = marbleValue;
        this.marbleRight = this;
        this.marbleLeft= this;
    }
}