<template>
    <div>
        <div class="text" style="margin: 5%">
            <h1 style="color: #409EFF">Learn Minimum Spanning Forest Algorithm!</h1>
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
                                <p>Number of Vertices</p>
                                <el-input placeholder="numbers of node in graph" v-model="prim_num"></el-input>
                                <p>Start Node</p>
                                <el-input placeholder="start node" v-model="prim_start"></el-input>
                            <el-row>
                                    <p>Generate or Import Graph?</p>
                                <div>
                                    <el-select v-model="prim_select_type" placeholder="Type of way for create graph">
                                        <el-option v-for="item in typeOption"
                                                   :key="item.value"
                                                   :label="item.label"
                                                   :value="item.value"></el-option>
                                    </el-select>
                                </div>
                                <div v-if="prim_select_type === 'Import Graph from file'">
                                    <div class="tip">
                                        <b>Note:</b>
                                        <p>1. The id of node will start from 0.</p>
                                        <p>2. The input consists of the number of edges in the graph</p>
                                        <p>3. Each line is in the form of (start node, end node, weight).</p>
                                        <p>4. Edges have same start node and end node will be record once.</p>
                                        <p>5. Only txt file permitted</p>
                                    </div>

                                    <el-upload
                                            accept=".txt"
                                            :show-file-list="false"
                                            action=""
                                            :auto-upload="false"
                                            :on-change="primUpload"
                                            :limit="1"
                                            :on-exceed="handlePrimExceed"
                                            :file-list="fileList">
                                        <el-button style="width: 200px" type="primary">Select File</el-button>

                                    </el-upload>

                                    <el-input
                                        disabled
                                        type="textarea"
                                        :rows="4"
                                        v-model="prim_file_graph">
                                    </el-input>

                                </div>
                                <div v-if="prim_select_type === 'Import Graph from text box'">
                                    <div class="tip">
                                        <b>Note:</b>
                                        <p>1. The id of node will start from 0.</p>
                                        <p>2. The input consists of the number of edges in the graph</p>
                                        <p>3. Each line is in the form of (start node, end node, weight).</p>
                                        <p>4. Edges have same start node and end node will be record once.</p>
                                    </div>
                                    <el-input
                                        type="textarea"
                                        :rows="4"
                                        placeholder="Please input your graph"
                                        v-model="prim_graph_text">
                                    </el-input>
                                </div>
                            </el-row>

                            <div>
                                <el-button style="width: 200px" type="primary" @click="prim">Start Algorithm</el-button>
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
                                <p>Kruskal's algorithm is a greedy algorithm that in each step adds to the forest the lowest-weight edge that will not form a cycle. The key steps of the algorithm are sorting and detect cycles.</p>
                            </div>
                            <el-divider></el-divider>
<!--                            <div>-->
<!--                                <el-input placeholder="numbers of node in graph"  v-model="kruskal_num"></el-input>-->
<!--                            </div>-->
                            <p>Number of Vertices</p>
                            <el-input placeholder="numbers of node in graph" v-model="kruskal_num"></el-input>
                            <el-row>
                                <p>Generate or Import Graph?</p>
                                <div>
                                    <el-select v-model="kruskal_select_type" placeholder="Type of way for create graph">
                                        <el-option v-for="item in typeOption"
                                                   :key="item.value"
                                                   :label="item.label"
                                                   :value="item.value"></el-option>
                                    </el-select>
                                </div>
                                <div v-if="kruskal_select_type === 'Import Graph from file'">
                                    <div class="tip">
                                        <b>Note:</b>
                                        <p>1. The id of node will start from 0.</p>
                                        <p>2. The input consists of the number of edges in the graph</p>
                                        <p>3. Each line is in the form of (start node, end node, weight).</p>
                                        <p>4. Edges have same start node and end node will be record once.</p>
                                        <p>5. Only txt file permitted</p>
                                    </div>

                                    <el-upload
                                        accept=".txt"
                                        :show-file-list="false"
                                        action=""
                                        :auto-upload="false"
                                        :on-change="kruUpload"
                                        :limit="1"
                                        :on-exceed="handleKruExceed"
                                        :file-list="fileList">
                                        <el-button style="width: 200px" type="primary">Select File</el-button>

                                    </el-upload>

                                    <el-input
                                        disabled
                                        type="textarea"
                                        :rows="4"
                                        v-model="kruskal_file_graph">
                                    </el-input>

                                </div>
                                <div v-if="kruskal_select_type === 'Import Graph from text box'">
                                    <div class="tip">
                                        <b>Note:</b>
                                        <p>1. The id of node will start from 0.</p>
                                        <p>2. The input consists of the number of edges in the graph</p>
                                        <p>3. Each line is in the form of (start node, end node, weight).</p>
                                        <p>4. Edges have same start node and end node will be record once.</p>
                                    </div>
                                    <el-input
                                        type="textarea"
                                        :rows="4"
                                        placeholder="Please input your graph"
                                        v-model="kruskal_graph_text">
                                    </el-input>
                                </div>
                            </el-row>
                            <div>
                                <el-button style="width: 200px" type="primary" @click="kruskal">Start Algorithm</el-button>
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
            fileList:[],
            prim_select_type: null,
            prim_start: null,
            prim_num: null,
            kruskal_num: null,
            kruskal_select_type: null,
            kruskal_graph_text: null,
            kruskal_file_graph: null,
            prim_graph_text: null,
            prim_file_graph: null,
            typeOption: [
                {
                    value: 'Generate Graph',
                    label: 'Generate Graph'
                },
                {
                    value: 'Import Graph from file',
                    label: 'Import Graph from file'
                },
                {
                    value: 'Import Graph from text box',
                    label: 'Import Graph from text box'
                }
            ]
        }
    },
    methods:{
        async kruUpload(file,fileList) {

            const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);

            if (fileSuffix !== 'txt') {
                fileList.pop()
                this.$message.warning('Only txt files can be uploaded!')
                return false;
            }
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isLt2M) {
                fileList.pop()
                this.$message.warning('File size cannot exceed 2MB!')
                return false;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                this.kruskal_file_graph = e.target.result;
            };
            reader.readAsText(file.raw);
        },
        handleKruExceed(files, fileList) {
            this.$message.warning(`The limit is 1, you selected ${ files.length } files this time, add up to ${ files.length + fileList.length } totally, please try again.`);
        },

        async primUpload(file,fileList) {

            const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);

            if (fileSuffix !== 'txt') {
                fileList.pop()
                this.$message.warning('Only txt files can be uploaded!')
                return false;
            }
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isLt2M) {
                fileList.pop()
                this.$message.warning('File size cannot exceed 2MB!')
                return false;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                this.prim_file_graph = e.target.result;
            };
            reader.readAsText(file.raw);
        },
        handlePrimExceed(files, fileList) {
            this.$message.warning(`The limit is 1, you selected ${ files.length } files this time, add up to ${ files.length + fileList.length } totally, please try again.`);
        },
        prim(){
            if(this.prim_num === null || this.prim_start === null){
                this.$message.error("Please input number of vertices and start vertice")
                return
            }
            if(this.prim_select_type === null){
                this.$message.error("Please select generate type of graph")
                return
            }
            if(this.prim_select_type === 'Import Graph from file' && this.prim_file_graph === null){
                this.$message.error("Please upload graph file")
                return
            }
            if(this.prim_select_type === 'Import Graph from text box' && this.prim_graph_text === null) {
                this.$message.error("Please input graph")
                return
            }
            let graph;
            if(this.prim_select_type === 'Import Graph from text box' && this.prim_graph_text !== null){
                graph = this.prim_graph_text
                if(graph === null){
                    graph = "default"
                }
            }
            else if(this.prim_select_type === 'Import Graph from file' && this.prim_file_graph !== null){
                graph = this.prim_file_graph
            }
            else{
                graph = "default"
            }
            this.$router.push({name: 'prim', params: {num: this.prim_num, start: this.prim_start, type: this.prim_select_type, graph: graph}})
        },
        kruskal(){
            if(this.kruskal_num === null){
                this.$message.error("Please input number of vertices")
                return
            }
            if(this.kruskal_select_type === null){
                this.$message.error("Please select generate type of graph")
                return
            }
            if(this.kruskal_select_type === 'Import Graph from file' && this.kruskal_file_graph === null){
                this.$message.error("Please upload graph file")
                return
            }
            if(this.kruskal_select_type === 'Import Graph from text box' && this.kruskal_graph_text === null) {
                this.$message.error("Please input graph")
                return
            }
            let graph;
            if(this.kruskal_select_type === 'Import Graph from text box' && this.kruskal_graph_text !== null){
                graph = this.kruskal_graph_text
                if(graph === null){
                    graph = "default"
                }
            }
            else if(this.kruskal_select_type === 'Import Graph from file' && this.kruskal_file_graph !== null){
                graph = this.kruskal_file_graph
            }
            else{
                graph = "default"
            }
            this.$router.push({name: 'kruskal', params: {num: this.kruskal_num, type: this.kruskal_select_type, graph: graph}})
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
.tip {
    padding: 5px 10px;
    background-color: #ecf8ff;
    border-radius: 4px;
    border-left: 5px solid #50bfff;
    /*margin: 4px 0;*/
}
</style>