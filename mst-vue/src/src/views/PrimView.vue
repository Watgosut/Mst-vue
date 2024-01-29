<template>
    <div>
        <el-row>
            <el-col :span="8">
                <div class="prim-algorithm">
                    <pre>
                      <code style="font-size: smaller;text-align: left">
<span ref="codeLine1">Prim(G, start_vertex):</span>
<span ref="codeLine2">    initialize an empty set MST (minimum spanning tree)</span>
<span ref="codeLine3">    initialize a priority queue Q and list dist with INF</span>
<span ref="codeLine4">    set the dist of start_vertex to 0</span>
<span ref="codeLine5">    update edges related to start_vertex into Q and dist with their weights</span>
<span ref="codeLine6">    while Q is not empty:</span>
<span ref="codeLine7">        edge = extract_min(Q)</span>
<span ref="codeLine8">        if visited[edge.dest]:</span>
<span ref="codeLine9">             continue</span>
<span ref="codeLine10">        add edge to MST and visited[edge.dest]=True</span>
<span ref="codeLine11">        if edges of mst equals to number of vertices -1 </span>
<span ref="codeLine12">             return MST</span>
<span ref="codeLine13">       for each vertex v adjacent to u:</span>
<span ref="codeLine14">            if v is in Q and weight(u, v) < dist[v]:</span>
<span ref="codeLine15">                update dist[v] to weight(u, v)</span>
<span ref="codeLine16">                insert (u,v) to Q</span>
<span ref="codeLine17">    return MST</span>
                      </code>
                    </pre>
                </div>
            </el-col>
            <el-col :span="10">
                <div id="network"></div>
            </el-col>
            <el-col :span="6" >
                <div class="prim-algorithm">
                    <div class="text" style="padding: 20px">
                        <p>The core idea of the Prim algorithm is actually the segmentation theorem, which starts from a vertex and continuously expands the graph segmentation until there is no segmentation, constructing the minimum spanning tree.</p>
                        <p>1. Establish an edge set to store results, a node set to store nodes, and a minimum heap of edges to mark whether they have been accessed</p>
                        <p>2. Start traversing all nodes, and if there is no access, add it to the node set, and then add its connected edges to the heap.</p>
                        <p>3. Take the smallest edge from the heap and determine whether the to node has been accessed. If not, add this edge to the spanning tree (the edge we want) and mark the node for access.</p>
                        <p>4. Then add the edges connected to the to node to the minimum heap, otherwise the network will not expand outward (this step is necessary).</p>
                        <p>5. Loop through the above operations until all nodes have been traversed.</p>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center" align="middle">
            <el-col :span="5">
                <el-button size="mini" :type="type[0]" @click="changeSpeed(1000,0)">SLOW</el-button>
                <el-button size="mini" :type="type[1]" @click="changeSpeed(500,1)">MEDIUM</el-button>
                <el-button size="mini" :type="type[2]" @click="changeSpeed(200,2)">HIGH</el-button>
            </el-col>
            <el-col :span="3">
                <el-button  circle @click="startProgress" style="border: none">
                    <i v-if="!start" class="el-icon-video-play size-icon"></i>
                    <i v-else class="el-icon-video-pause size-icon"></i>
                </el-button>
            </el-col>
            <el-col :span="16">
                <input
                        type="range"
                        :min="0"
                        :max="highlight.length"
                        v-model="progress"
                        @input="updateHighlight"
                        style="width: 100%"
                />
            </el-col>
        </el-row>

    </div>
</template>

<script>
import * as d3 from 'd3';
import {create_and_prim} from "@/backend/API";

export default {
  data() {
    return {
      nodes: [],
      links: [],
        highlight:[],
        progress: 0,
        pre:null,
        start:false,
        speed: 1000,
        interval:null,
        type: ['primary','default','default']
    }
  },
    methods:{
      changeSpeed(speed,index){
          this.speed = speed
          this.type = ['default','default','default']
          this.type[index] = 'primary'
          if(this.start){
              clearInterval(this.interval);
              this.interval = this.interval = setInterval(() => {
                  if (this.start) {
                      this.progress += 1;
                      this.updateHighlight();
                  }
              }, this.speed);
          }
      },
        startProgress(){
            if(this.interval !== null && this.start){
                clearInterval(this.interval);
                this.interval = null
            }
            if(!this.start) {
                clearInterval(this.interval);
                this.interval = setInterval(() => {
                    if (this.start) {
                        this.progress += 1;
                        this.updateHighlight();
                    }
                }, this.speed);
            }
            else{
                clearInterval(this.interval);
                this.interval = null
            }
            this.start = !this.start;

        },
        updateHighlight() {
            var index = this.progress;
            if (index >= 0 && index <= this.highlight.length) {
                if(this.pre!=null){
                    this.pre.classList.remove("highlighted-code-line", true);
                }
                const codeLineElement = this.$refs[`codeLine${this.highlight[index-1]['id']}`];
                if (codeLineElement) {
                    codeLineElement.classList.add("highlighted-code-line", true);
                    this.pre = codeLineElement
                }
                this.highlightLink(index);
            }
        },
        highlightLink(index){
            if (index <= this.highlight.length) {
                for(var i=0; i<this.links.length; i++) {
                    var linkId = this.links[i].id;
                    var selectedLink = d3.select("#link-" + linkId);
                    if (this.highlight[index-1]['mst_edges'].indexOf(linkId) !== -1) {
                        selectedLink.classed("highlighted", true);
                    } else {
                        selectedLink.classed("highlighted", false);

                    }
                }

            }
        }
    },
    mounted() {
        var num = parseInt(this.$route.params.num)
        var start = parseInt(this.$route.params.start)
        var type = this.$route.params.type
        var graph = this.$route.params.graph_text
        const res = create_and_prim(num,start,type,graph)
        this.nodes = res.nodes
        this.links = res.links
         this.highlight = res.highlight

         // create a network
         var nodes = this.nodes

         var links = this.links

         var svg = d3.select("#network")
             .append("svg")
             .attr("width", '100%')
             .attr("height", 680);

         var simulation = d3.forceSimulation(nodes)
             .force("link", d3.forceLink(links).id(d => d.id).distance(150))
             .force("charge", d3.forceManyBody().strength(-200))
             .force("center", d3.forceCenter(300, 300))
             .force('collide', d3.forceCollide(20).iterations(1));

         var link = svg.selectAll(".link")
             .data(links)
             .enter().append("line")
             .attr("class", "link")
             .attr("id", d => "link-" + d.id); // 添加边的唯一标识符

         var node = svg.selectAll(".node")
             .data(nodes)
             .enter().append("circle")
             .attr("class", "node")
             .attr("r", 20)
             .call(d3.drag()
                 .on('start', dragstarted)
                 .on('drag', dragged)
                 .on('end', dragended));

         var label = svg.selectAll(".label")
             .data(nodes)
             .enter().append("text")
             .attr("class", "label")
             .text(d => d.name)
             .attr("dx", -15);

         var weightLabel = svg.selectAll(".weight-label")
             .data(links)
             .enter().append("text")
             .attr("class", "weight-label")
             .text(d =>  d.weight)
             .attr("dx", 0);

         simulation.on("tick", () => {
           link
               .attr("x1", d => d.source.x)
               .attr("y1", d => d.source.y)
               .attr("x2", d => d.target.x)
               .attr("y2", d => d.target.y);

           node
               .attr("cx", d => d.x)
               .attr("cy", d => d.y);

           label
               .attr("x", d => d.x + 15)
               .attr("y", d => d.y + 5);

           weightLabel
               .attr("x", d => (d.source.x + d.target.x) / 2)
               .attr("y", d => (d.source.y + d.target.y) / 2);
         });
           function dragstarted(event, d) {
               if (!event.active) simulation.alphaTarget(0.3).restart();
               d.fx = d.x;
               d.fy = d.y;
           }

           function dragged(event, d) {
               d.fx = event.x;
               d.fy = event.y;
           }

           function dragended(event, d) {
               if (!event.active) simulation.alphaTarget(0);
               d.fx = null;
               d.fy = null;
           }
    }
};
</script>

<style>
svg {
    border: 1px solid #ccc;
}
.link {
    stroke: #999;
    stroke-opacity: 0.6;
    stroke-width: 4px;
}

.node {
    fill: #ccc;
    stroke: #fff;
    stroke-width: 2px;
}

.label {
    font-size: 12px;
}

.weight-label {
    font-size: 12px;
}

.highlighted {
    stroke: red !important;
}
.prim-algorithm {
    text-align: left;
    border: 1px solid #ccc;
    /*padding: 10px;*/
    height: 680px;
    box-shadow: 0 0 10px #ccc;
    /*background-color: #f9f9f9;*/
}
.prim-algorithm h2 {
    font-size: 18px;
    margin-bottom: 10px;
}
.prim-algorithm pre {
    white-space: pre-wrap;
    font-family: monospace;
    font-size: 14px;
    /*background-color: #fff;*/
    /*border: 1px solid #ccc;*/
    padding: 10px;
}
.highlighted-code-line {
    background-color: #ffec8b;
}
.size-icon{
    font-size: 30px;
}
</style>
