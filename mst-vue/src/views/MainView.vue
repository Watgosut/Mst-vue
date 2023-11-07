<template>
    <div id="app">
        <div class="text">
            <el-menu class="top" mode="horizontal" :default-active="activeIndex" @select="handleSelect">
                <div class="icon" @click="handleSelect('home',['home'])">
                    <span id="Vis" class="vis">Vis</span>
                    <span id="Mst" class="mst">Mst</span>
                </div>

                <el-menu-item class="option" index="feedback">Feedback</el-menu-item>
                <el-menu-item class="option" index="algorithm">Algorithm</el-menu-item>
                <el-menu-item class="option" index="about">About</el-menu-item>
                <el-menu-item class="option" index="home">Home</el-menu-item>
            </el-menu>
        </div>
        <router-view />
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'MainView',
    components: {
    },
    data(){
        return{
            activeIndex: 'home'
        }
    },
    methods:{
        handleSelect(key, keyPath){
            if(key == this.activeIndex){
                return
            }
            this.activeIndex = key
            this.$router.push('/'+key)
        }
    }
}
</script>
<style>
.vis{
    color: #409EFF;
    border-radius: 4px;
    cursor: pointer;
}
.mst{
    color: #ff4040;
    border-radius: 4px;
    cursor: pointer;
}
.icon{
    font-family: "Arial Black", "Arial Bold", Gadget, sans-serif;
    font-weight: bold;
    font-size: 30px;
    float: left;
    margin-top:10px;
    margin-left: 10%;
}
.top{
    width: 100%;
    /*height: 80px;*/
    /*border-bottom: 1px solid #ebebeb;*/
    /*box-shadow: 0 1px 2px rgba(0,0,0,.1);*/
    position: relative;
    z-index: 100;
}
.option{
    float: right !important;
    font-family: "Microsoft YaHei", "Arial Bold", Gadget, sans-serif;
    font-weight: bold;
    font-size: 20px !important;
    margin-right: 4% !important;


}
</style>