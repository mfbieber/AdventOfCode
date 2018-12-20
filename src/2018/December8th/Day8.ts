
type Tree = Set<Knoten>;
export function constructTree(header : number[]) : Tree {
    let firstNode : Knoten = new Knoten(header[0], header[1]);
    addChildren(header, 2, firstNode);
    let tree : Tree = new Set();
    addNodesToTree(firstNode, tree);
    console.log(tree);
    return tree;
}

export function addChildren(header : number[], position : number, node : Knoten)  : number {
    if (node.numberOfChildren > 0) {
        for (let children = node.numberOfChildren; children > 0; children--) {
            let newChild : Knoten = new Knoten(header[position], header[position + 1]);
            node.children.push(newChild);
            position = addChildren(header, position + 2, newChild);
        }
    }
    return addMetaData(header, position, node);
}

export function addMetaData (header : number[], position : number, node : Knoten) : number {
    if (node.numberOfMetadataEntries > 0) {
        for (let data = 0; data < node.numberOfMetadataEntries; data++) {
            node.metadataEntries.push(header[position]);
            position++;
        }
    }
    return position;
}

export function addNodesToTree(node : Knoten, tree : Tree) {
    tree.add(node);
    for (let child of node.children) {
       tree.add(child);
       addNodesToTree(child, tree);
    }
}

export class Knoten {
    numberOfChildren : number;
    children : Knoten[] = [];
    numberOfMetadataEntries : number;
    metadataEntries : number[] = [];

    constructor(numberOfChildren : number, numberOfMetadataEntries : number) {
        this.numberOfChildren = numberOfChildren;
        this.numberOfMetadataEntries = numberOfMetadataEntries;
    }
}