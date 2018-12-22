export function playGame(numberOfPlayers : number, marbleHighestValue : number) : [{[key: number] : number}, {[key : number] : Knoten}, string[]] {
    let nodes : {[key : number] : Knoten} = {};
    let players : {[key: number] : number} = {};
    let nodesStrings : string[] = ['(0) '] ;
    let marbleValue : number = 0;
    let previousNode : Knoten = new Knoten(0);
    nodes[0] = previousNode;
    marbleValue++;
    while (marbleValue <= marbleHighestValue) {
        for (let player = 1; player <= numberOfPlayers; player++) {
            if (players[player] == null) {
                players[player] = 0;
            }
            let node : Knoten = new Knoten(marbleValue);
            if ((marbleValue % 23) == 0) {
                players[player] = players[player] + marbleValue;
                let lastLeftNode : Knoten = previousNode;
                for (let i = 1; i <= 8; i++) {
                    lastLeftNode = lastLeftNode.marbleLeft;
                }
                players[player] = players[player] + lastLeftNode.marbleRight.marble;
                lastLeftNode.marbleRight = lastLeftNode.marbleRight.marbleRight;
                previousNode = lastLeftNode.marbleRight;
            } else {
                node.marbleLeft = previousNode.marbleRight;
                node.marbleRight = previousNode.marbleRight.marbleRight;
                previousNode.marbleRight.marbleRight.marbleLeft = node;
                previousNode.marbleRight.marbleRight = node;
                previousNode = node;
            }
            nodes[marbleValue] = node;
            /*let value : number = 0;
            let nodesString : string = '';
            do {
                if (nodes[value] != undefined) {
                    if (value == marbleValue) {
                        nodesString = nodesString.concat('(' + nodes[value].marble.toString() + ')' + ' ');
                    } else {
                        nodesString = nodesString.concat(nodes[value].marble.toString() + ' ');
                    }
                    value = nodes[value].marbleRight.marble;
                }
            } while (value != 0);
            nodesStrings.push(nodesString);*/
            if (marbleValue == marbleHighestValue) {
                return [players, nodes, nodesStrings];
            }
            marbleValue++;
            if((marbleValue % 100) == 0) {
                console.log(marbleValue/marbleHighestValue * 100 + ' %');
            }
        }
    }
    return [players, nodes, nodesStrings];
}

export function determineHighScore(players : {[key: number] : number}) : number {
    let highScore : number = 0;
    for (let player in players) {
        if (players[player] > highScore) {
            highScore = players[player];
        }
    }
    return highScore;
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