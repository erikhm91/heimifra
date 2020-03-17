<template>
  <div id="app">
    <cor-header></cor-header>
   <message-container></message-container>
  </div>
</template>

<script>
import messageContainer from './components/MessageContainer.vue';
import header from './components/Header.vue';
export default {

  name: 'App',
  components: {
    corHeader: header,
    messageContainer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  
}
body {
 background-image: url('~@/assets/bobil.jpg');
  background-color: #cccccc;
    background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
