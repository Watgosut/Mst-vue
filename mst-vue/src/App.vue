<template>
  <div id="app">
      <el-row>
          <router-view />
      </el-row>
      <el-row id="footer" style="background-color: rgba(0,11,22,0.1);width: 100%">
          <div style="padding: 20px">
              <img src="./assets/GitHub-Symbol.png" width="50px"  @click="jump" style="cursor: pointer"/>
          </div>
      </el-row>
  </div>
</template>
<script>
export default {
    methods:{
        jump(){
            window.location.href = "https://github.com/Watgosut"
        }
    }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

</style>
