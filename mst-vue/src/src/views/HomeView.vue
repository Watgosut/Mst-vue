<template>
  <div>
      <div class="title">
          <h1>Learn, visualized MST</h1>
          <h1>through MST algorithms at your own pace.</h1>
      </div>
      <div style="padding: 5%; padding-top: 2%">
          <el-card style="border-radius: 20px;margin: 20px">
              <el-row>
                  <el-col :span="12">
                      <div>
                          <h2 class="text_b">Undirected Graph </h2>
                          <p class="text font" style="line-height: 30px">A undirected graph is a pair G = (V, E), where V is a set whose elements are called vertices (singular: vertex), and E is a set of paired vertices, whose elements are called edges (sometimes links or lines).</p>
                      </div>
                  </el-col>
                  <el-col :span="12">
                      <img  style="height: 200px" src="../assets/graph.png">
                  </el-col>
              </el-row>
          </el-card>

          <el-card style="border-radius: 20px;margin: 20px">
              <el-row>
                  <el-col :span="12">
                      <div>
                          <h2 class="text_b">Tree</h2>
                          <p class="text font" style="line-height: 30px">A tree is an undirected graph in which any two vertices are connected by exactly one path, or equivalently a connected acyclic undirected graph.</p>
                      </div>
                  </el-col>
                  <el-col :span="12">
                      <img  style="height: 200px" src="../assets/tree.png">
                  </el-col>
              </el-row>
          </el-card>

          <el-card style="border-radius: 20px;margin: 20px">
              <el-row>
                  <el-col :span="12">
                      <div>
                          <h2 class="text_b">Minimum Spanning Tree</h2>
                          <p class="text font" style="line-height: 30px">A minimum spanning tree (MST) or minimum weight spanning tree is a subset of the edges of a connected, edge-weighted undirected graph that connects all the vertices together, without any cycles and with the minimum possible total edge weight.</p>
                          <p class="text font" style="line-height: 30px">That is, <b>it is a spanning tree whose sum of edge weights is as small as possible.</b> More generally, any edge-weighted undirected graph (not necessarily connected) has a minimum spanning forest, which is a union of the minimum spanning trees for its connected components.</p>
                      </div>
                  </el-col>
                  <el-col :span="12" style="padding: 100px">
                      <img style="height: 200px" src="../assets/mst.png">
                  </el-col>
              </el-row>
          </el-card>

          <el-card style="border-radius: 20px;margin: 20px">
              <div>
                  <h2 class="text_b">Main Algorithm</h2>
              </div>
              <el-carousel height="450px">
                  <div v-for="item in imgList">
                      <el-carousel-item v-for="item in imgList">
                          <img :src=item.src style="margin: 20px"/>
                      </el-carousel-item>
                  </div>
              </el-carousel>
          </el-card>
      </div>

  </div>
</template>

<script>
export default {
    name: "HomeView",
    data(){
        return{
            imgList:[
                {
                    src: require('../assets/prim.png')
                },
                {
                    src: require('../assets/kruskal.png')
                },
            ]
        }
    }
}
</script>

<style scoped>
.title{
    font-weight: bold;
    font-size: 20px;
    margin: 5%;
}
.text_b{
    font-weight: bold;
    font-size: 25px
}
.font{
    font-size: 15px;
}

</style>