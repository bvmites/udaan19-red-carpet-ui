<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {

  }
}
</script>

<style>
body {
  background-color: #222;
  transition: all 0.2s ease-in-out;
}
#app {
  position: relative;
  text-align: center;
  margin-top: 0;
}
</style>
