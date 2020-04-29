<template>
  <div id="app">
    <hs-header></hs-header>

    <div class="container">
      <!-- <component :is="$store.getters.activeView"></component> -->
      <router-view :to="{ name: 'home'}"></router-view>
    </div>
    <!-- <message-container></message-container> -->
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
body {
  background-image: url("~@/assets/Heime.jpg");
  background-color: #cccccc;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;

  /* adjust for fixed navbar */
  padding-top: 70px;
}
</style>
