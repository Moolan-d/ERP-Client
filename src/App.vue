<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'app'
};
</script>

<style >
#app {
height: 100%;
overflow: hidden;
}
html,body{
  margin:0;
  padding:0;
  height: 100%;


}

.tabs{
    color:#333;
    position: fixed;
    right: 75px;
    clear: both;
    top:65px;
    z-index:-1;
    margin-top:5px;
}
</style>
