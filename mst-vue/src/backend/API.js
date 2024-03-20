import {getGraphFromInput, getRandomConnectedGraph} from "@/backend/Initial";

class UnionFind {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.depth = Array(n).fill(1);
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x, y) {
        const root_x = this.find(x);
        const root_y = this.find(y);
        if (this.depth[root_x] > this.depth[root_y]) {
            this.parent[root_y] = root_x;
        } else if (this.depth[root_x] < this.depth[root_y]) {
            this.parent[root_x] = root_y;
        } else {
            this.parent[root_y] = root_x;
            this.depth[root_x]++;
        }
    }
}

function kruskal(graph) {

    const edges = graph.E.slice();
    const num_vertices = graph.V;
    edges.sort((a, b) => a.weight - b.weight);
    const uf = new UnionFind(num_vertices);

    let min_cost = 0;
    const mst_edges = [];

    const highlight_data = [
        { id: 2, mst_edges: mst_edges.map(e => e.id) },
        { id: 3, mst_edges: mst_edges.map(e => e.id) },
        { id: 4, mst_edges: mst_edges.map(e => e.id) }

    ];

    for (const edge of edges) {
        highlight_data.push({ id: 5, mst_edges: mst_edges.map(e => e.id) });
        if (uf.find(edge.src) !== uf.find(edge.dest)) {
            highlight_data.push({ id: 6, mst_edges: mst_edges.map(e => e.id) });

            uf.union(edge.src, edge.dest);
            highlight_data.push({ id: 7, mst_edges: mst_edges.map(e => e.id) });

            min_cost += edge.weight;
            mst_edges.push(edge);

            highlight_data.push({ id: 8, mst_edges: mst_edges.map(e => e.id) });
            highlight_data.push({ id: 9, mst_edges: mst_edges.map(e => e.id) });

            if (mst_edges.length === num_vertices - 1) {
                highlight_data.push({ id: 10, mst_edges: mst_edges.map(e => e.id) });
                return highlight_data;
            }
        }
    }
    highlight_data.push({ id: 11, mst_edges: mst_edges.map(e => e.id) });
    return highlight_data;
}

function prim(graph, startNode) {
    const num_vertices = graph.V;
    const visited = Array(num_vertices).fill(false);
    const dist = Array(num_vertices).fill(Infinity);
    const mst_edges = [];
    const highlight_data = [
        { id: 2, dist: null, mst_edges: mst_edges.map(e => e.id) },
        { id: 3, dist: [ ...dist ], mst_edges: mst_edges.map(e => e.id) }
    ];

    dist[startNode] = startNode;
    highlight_data.push({ id: 4, dist: [ ...dist ], mst_edges: mst_edges.map(e => e.id) });

    const pq = [];
    const src = startNode;
    visited[src] = true;
    for (const edge of graph.getEdges(src)) {
        dist[edge.dest] = edge.weight;
        pq.push(edge);
    }

    highlight_data.push({ id: 5, dist: [ ...dist ], mst_edges: mst_edges.map(e => e.id) });
    while (pq.length > 0) {
        const edge = pq.shift();

        highlight_data.push({ id: 6, dist: [ ...dist ], mst_edges: mst_edges.map(e => e.id) });
        highlight_data.push({ id: 7, dist: [ ...dist ], mst_edges: mst_edges.map(e => e.id) });
        highlight_data.push({ id: 8, dist: [ ...dist ], mst_edges: mst_edges.map(e => e.id) });
        if (visited[edge.dest]) {
            highlight_data.push({ id: 9, dist: [ ...dist ], mst_edges: mst_edges.map(e => e.id) });
            continue;
        }

        visited[edge.dest] = true;
        mst_edges.push(edge);
        highlight_data.push({ id: 10, dist: [ ...dist ], mst_edges: mst_edges.map(e => e.id) });
        highlight_data.push({ id: 11, dist: [ ...dist ], mst_edges: mst_edges.map(e => e.id) });
        if (mst_edges.length === num_vertices - 1) {
            highlight_data.push({ id: 12, dist: [ ...dist ], mst_edges: mst_edges.map(e => e.id) });


            return highlight_data;
        }
        highlight_data.push({ id: 13, dist: [ ...dist ], mst_edges: mst_edges.map(e => e.id) });
        for (const e of graph.getEdges(edge.dest)) {
            highlight_data.push({ id: 14, dist: [ ...dist ], mst_edges: mst_edges.map(e => e.id) });
            if (!visited[e.dest] && e.weight < dist[e.dest]) {
                dist[e.dest] = e.weight;
                pq.push(e);
                highlight_data.push({ id: 15, dist: [ ...dist ], mst_edges: mst_edges.map(e => e.id) });
                highlight_data.push({ id: 16, dist: [ ...dist ], mst_edges: mst_edges.map(e => e.id) });
            }
        }
    }
    highlight_data.push({ id: 17, dist: [ ...dist ], mst_edges: mst_edges.map(e => e.id) });
    return highlight_data;
}


export function create_and_prim(num_vertices, start, type, graph) {
    let g = null;
    if(type === 'Generate Graph'){
        g = getRandomConnectedGraph(num_vertices);
    }
    else{
        g = getGraphFromInput(num_vertices,graph);
    }
    if(g === null){
        return null;
    }
    const result = { nodes: [], links: [], highlight_data: [] };

    for (let i = 0; i < g.V; i++) {
        result.nodes.push({ id: i, name: i });
    }

    for (const e of g.E) {
        result.links.push({ source: e.src, target: e.dest, weight: e.weight, id: e.id });
    }

    result.highlight = prim(g,start);

    return result;
}

export function create_and_kruskal(num_vertices,type,graph) {
    let g;
    if(type === 'Generate Graph'){
        g = getRandomConnectedGraph(num_vertices);
    }
    else{
        g = getGraphFromInput(num_vertices,graph);
    }
    if(g === null){
        return null;
    }
    // const g = getRandomConnectedGraph(num_vertices);
    const result = { nodes: [], links: [], highlight_data: [] };

    for (let i = 0; i < g.V; i++) {
        result.nodes.push({ id: i, name: i });
    }

    for (const e of g.E) {
        result.links.push({ source: e.src, target: e.dest, weight: e.weight, id: e.id });
    }

    result.highlight = kruskal(g);

    return result;
}
