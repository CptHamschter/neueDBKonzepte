<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <headerBar/>
  <HauptSeite/>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import headerBar from '@/components/header.vue'
import HauptSeite from '@/components/Hauptseite.vue'
export default {
  name: 'App',
  components: {
    //HelloWorld,
    headerBar,
    HauptSeite
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
  margin-top: 60px;
}
</style>
