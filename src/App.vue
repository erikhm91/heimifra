<template>
  <div id="app">
    
    <hs-header class="" @component="setActiveView"></hs-header>
    
     <div class="container">
        <component :is="activeView"></component>
      </div>
          <!-- <message-container></message-container> -->
  </div>
</template>

<script>
import MessageContainer from './components/MessageContainer.vue';
import PostCreator from './components/PostCreator.vue';
import Header from './components/Header.vue';
export default {

  name: 'App',
  data() {
    return {
      activeView : 'message-container'
    }
  },
  components: {
    hsHeader: Header,
    messageContainer: MessageContainer,
    postCreator: PostCreator
  },
  methods: {
    setActiveView(component) {
      this.activeView = component;
    }
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
  
  /* adjust for fixed navbar */
  padding-top: 70px;
}
</style>
