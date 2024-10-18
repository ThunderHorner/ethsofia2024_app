<template>
  <div id="app">
    <HeaderPage />
    <router-view />
  </div>
</template>

<script>
import HeaderPage from './components/HeaderPage.vue';

export default {
  components: {
    HeaderPage,
  },
};
</script>

<style>
/* Global styles */
body {
  margin: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  background-color: #f5f5f5; /* Light background color for better aesthetics */
}

</style>
