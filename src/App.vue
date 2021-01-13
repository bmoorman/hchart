<template>
  <div id="app">
    <!--<sidebar-vue :variables="variables" /> -->
    <h-chart />
  </div>
</template>

<script>
import HChart from './components/HChart.vue'
//import SidebarVue from './components/SidebarVue.vue';

export default {
  name: 'App',
  components: {
    HChart,// SidebarVue,
    
  }
};
</script>

<style>
body {
  background-color: #333 !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
