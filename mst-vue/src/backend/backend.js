class Graph {
    constructor(vertices) {
        this.V = vertices;
        this.E = [];
        this.graph = new Array(vertices).fill().map(() => []);
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

class Edge {
    constructor(u, v, w, id) {
        this.src = u;
        this.dest = v;
        this.weight = w;
        this.id = id;
    }

    lt(other) {
        return this.weight < other.weight;
    }
}

class UnionFind {
    constructor(n) {
        this.depth = new Array(n).fill(1);
        this.parent = [...Array(n + 1).keys()];
    }

    find(x) {
        if (x !== this.parent[x]) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x, y) {
        const px = this.find(x);
        const py = this.find(y);
        if (this.depth[px] < this.depth[py]) {
            this.parent[px] = py;
        }
        if (this.depth[px] > this.depth[py]) {
            this.parent[py] = px;
        }
        if (this.depth[px] === this.depth[py]) {
            this.parent[px] = py;
            this.depth[py] += 1;
        }
    }

    connected(x, y) {
        return this.find(x) === this.find(y);
    }
}

function kruskal(graph) {
    const edges = graph.E;
    const num_vertices = graph.V;
    edges.sort((a, b) => a.weight - b.weight);
    const uf = new UnionFind(num_vertices);
    const mst_edges = [];
    for (const edge of edges) {
        if (!uf.connected(edge.src, edge.dest)) {
            uf.union(edge.src, edge.dest);
            mst_edges.push(edge);
            if (mst_edges.length === num_vertices - 1) {
                break;
            }
        }
    }
    return mst_edges;
}

function prim(graph) {
    const num_vertices = graph.V;
    const visited = Array(num_vertices).fill(false);
    const dist = Array(num_vertices).fill(Infinity);
    const mst_edges = [];
    
    dist[0] = 0;
    
    const pq = [];
    const src = 0;
    visited[src] = true;
    for (const edge of graph.getEdges(src)) {
        dist[edge.dest] = edge.weight;
        pq.push(edge);
    }
    
    while (pq.length > 0) {
        const edge = pq.shift();
    
        if (visited[edge.dest]) {
            continue;
        }
    
        visited[edge.dest] = true;
        mst_edges.push(edge);
        if (mst_edges.length === num_vertices - 1) {
            return mst_edges;
        }
        for (const e of graph.getEdges(edge.dest)) {
            if (!visited[e.dest] && e.weight < dist[e.dest]) {
                dist[e.dest] = e.weight;
                pq.push(e);
            }
        }
    }
    return mst_edges;
}



function test() {
    const num_vertices = 4;
    const edges = [
        [0, 1, 3],
        [0, 2, 3],
        [0, 3, 7],
        [1, 2, 2],
        [1, 3, 4],
        [2, 3, 6],
    ];
    const graph = new Graph(num_vertices);
    let id = 0;
    for (const [src, dest, weight] of edges) {
        graph.addEdge(src, dest, weight, id);
        id += 1;
    }

    for (const e of prim(graph)) {
        console.log(e.src, e.dest, e.weight);
    }
}
test()