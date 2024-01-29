export class Edge {
    constructor(src, dest, weight, id) {
        this.src = src;
        this.dest = dest;
        this.weight = weight;
        this.id = id;
    }

    toString() {
        return `${this.src} -> ${this.dest} cost: ${this.weight}`;
    }
}

export class Graph {
    constructor(vertices) {
        this.V = vertices;
        this.E = [];
        this.graph = Array.from({ length: vertices }, () => []);
    }

    addEdge(src, dest, weight, id) {
        this.E.push(new Edge(src, dest, weight, id));
        this.graph[src].push(new Edge(src, dest, weight, id));
        this.graph[dest].push(new Edge(dest, src, weight, id));
    }

    getEdges(src) {
        return this.graph[src];
    }
}
