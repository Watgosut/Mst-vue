import { Graph } from "@/backend/Graph";

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export function getRandomConnectedGraph(numVertices) {
    let g = new Graph(numVertices);
    let generatedEdges = {};

    // 随机生成边，以确保图满足连通条件
    for (let i = 0; i < numVertices - 1; i++) {
        let dest = i + 1;
        let weight = getRandomInt(1, 10);
        g.addEdge(i, dest, weight, i);
        generatedEdges[`${i}-${dest}`] = true;
    }

    // 随机生成额外的边以确保连通性
    let maxEdges = Math.ceil(Math.random() * (numVertices * (numVertices - 1) / 2 ));
    for (let i = 0; i < maxEdges + 1; i++) {
        let src = getRandomInt(0, numVertices - 3);
        let dest = getRandomInt(src + 2, numVertices - 1);
        let weight = getRandomInt(1, 10);
        if(!generatedEdges[`${src}-${dest}`]){
            g.addEdge(src, dest, weight, i + numVertices - 1);
            generatedEdges[`${src}-${dest}`] = true;
        }
    }

    return g;
}

export function getGraphFromInput(numVertices, graphInput){
    let g = new Graph(numVertices);
    let edges = graphInput.split('\n');
    for(let i = 0; i < edges.length; i++){
        edges[i] = edges[i].split(',');
        let start = parseInt(edges[i][0]);
        let end = parseInt(edges[i][1]);
        let weight = parseInt(edges[i][2]);
        try{
            g.addEdge(start, end, weight, i);
        }
        catch (e){
            console.log(e);
            return null
        }

    }
    return g;
}