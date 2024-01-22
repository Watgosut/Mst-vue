<template>
    <div>
        <div class="text" style="margin: 5%">
            <h1 style="color: #409EFF">Learn a matching algorithm!</h1>
            <p>descirption</p>
        </div>
        <div class="footer">
            <el-row :gutter="20">
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-card class="card">
                        <div class="card_content">
                            <div class="card_title">
                                Minimum Spanning Tree algorithms
                            </div>
                            <div class="card_subtitle">Prim Algorithm</div>
                            <div style="width: 90%">
                                <p>In computer science, Prim's algorithm (also known as Jarník's algorithm) is a greedy algorithm that finds a minimum spanning tree for a weighted undirected graph.</p>
                            </div>
                            <el-divider></el-divider>
                            <div>
                                <el-input placeholder="numbers of node in graph" v-model="prim_num"></el-input>
                            </div>
                            <div>
                                <el-button type="primary" @click="prim">start</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-card class="card">
                        <div class="card_content">
                            <div class="card_title">
                                Minimum Spanning Tree algorithms
                            </div>
                            <div class="card_subtitle">Kruskal Algorithm</div>
                            <div style="width: 90%">
                                <p>In computer science, Prim's algorithm (also known as Jarník's algorithm) is a greedy algorithm that finds a minimum spanning tree for a weighted undirected graph.</p>
                            </div>
                            <el-divider></el-divider>
                            <div>
                                <el-input placeholder="numbers of node in graph"  v-model="kruskal_num"></el-input>
                            </div>
                            <div>
                                <el-button type="primary" @click="kruskal">start</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: "AlgorithmView",
    data(){
        return{
            prim_num: null,
            kruskal_num: null
        }
    },
    methods:{
        prim(){
            this.$router.push({name: 'prim', params: {num: this.prim_num}})
        },
        kruskal(){
            this.$router.push({name: 'kruskal', params: {num: this.kruskal_num}})
        }
    }
}
</script>

<style scoped>
.card{
    margin: 1%;
    padding: 1%;
}
.card_title{
    /*float: left;*/
    font-size: 20px;
    font-weight: bold;
    width: 100%;
}
.card_subtitle{
    /*float: left;*/
    font-size: 18px;
    font-weight: bold;
    width: 100%;
    color: #999999;
}
.card_content {
    float: left;
    text-align: left;
    line-height: 25px;
}
.card_content div{
    margin-bottom: 10px;
}
</style>