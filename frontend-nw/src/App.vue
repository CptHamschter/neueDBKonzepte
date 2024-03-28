<template>

  <headerBar/>
  <HauptSeite/>

  <FooTer/>
</template>

<script>

import headerBar from '@/components/header.vue'
import HauptSeite from '@/components/Hauptseite.vue'
import FooTer from '@/components/footer.vue'
export default {
  name: 'App',
  components: {

    headerBar,
    HauptSeite,
    FooTer,
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
