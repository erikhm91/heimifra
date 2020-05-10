<template>
  <div id="app">
    <div class="body">
      <hs-header class="header"></hs-header>

      <div class="container mb-3">
        <!-- <component :is="$store.getters.activeView"></component> -->
        <router-view :to="{ name: 'home'}"></router-view>
      </div>
      <!-- <message-container></message-container> -->
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import { mapActions } from "vuex";
export default {
  name: "App",
  components: {
    hsHeader: Header
  },
  methods: {
    ...mapActions(["initState"])
  }
};
</script>

<style lang="scss">
@import "./styles/variables.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: $basetext;
}
.header {
   padding-top: 70px;
}
//added body and body class to handle scrollbar shifting the background picture
body {
  background-image: url("~@/assets/Heime.jpg");
  background-color: #cccccc;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  // background-position: center;

  overflow: hidden;
}

.body {
   /* adjust for fixed navbar */
  height: 100vh;
  overflow: auto;
  box-sizing: border-box;
  // padding: 5px;
  margin-left: calc(100vw - 100%);
  margin-right: 0;
}

// div {
//     // background: url("~@/assets/Heime.jpg") no-repeat scroll center top transparent;
//     height: 100px
// }
</style>
