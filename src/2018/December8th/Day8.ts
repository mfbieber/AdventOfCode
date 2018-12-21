export function determineValue(node : Knoten, value : number) : number {
    if (node.numberOfChildren == 0) {
        for (let metaDataEntry of node.metadataEntries) {
            value = value + metaDataEntry;
        }
    } else {
        for (let metaDataEntry of node.metadataEntries) {
            if (node.children.length >= metaDataEntry) {
                value = determineValue(node.children[metaDataEntry - 1], value);
            }
        }
    }
    return value;
}

type NodeSet = Set<Knoten>;
export function buildNodeSet(header : number[]) : NodeSet {
    let parentNode : Knoten = constructTree(header);
    let nodeSet : NodeSet = new Set();
    addNodesToSet(parentNode, nodeSet);
    console.log(nodeSet);
    return nodeSet;
}

export function constructTree(header : number[]) : Knoten {
    let firstNode : Knoten = new Knoten(header[0], header[1]);
    addChildren(header, 2, firstNode);
    return firstNode;
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

export function addNodesToSet(node : Knoten, tree : NodeSet) {
    tree.add(node);
    for (let child of node.children) {
       tree.add(child);
       addNodesToSet(child, tree);
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