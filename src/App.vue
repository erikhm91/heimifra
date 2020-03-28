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
// import MessageContainer from "./components/MessageContainer.vue";
// import PostCreator from "./components/PostCreator.vue";
import Header from "./components/Header.vue";
// import PersonalPosts from "./components/PersonalPosts.vue";
// import MyPage from "./components/MyPage.vue";
// import AboutUs from "./components/AboutUs.vue";
import {mapActions} from 'vuex'
export default {
  name: "App",
  components: {
    hsHeader: Header
  },
  created() {
    // this.initState();
  },
  methods: {
    ...mapActions([
      'initState'
    ])


      // var docRef = db.collection("cities").doc("SF");
      // docRef
      //   .get()
      //   .then(function(doc) {
      //     if (doc.exists) {
      //       console.log("Document data:", doc.data());
      //     } else {
      //       // doc.data() will be undefined in this case
      //       console.log("No such document!");
      //     }
      //   })
      //   .catch(function(error) {
      //     console.log("Error getting document:", error);
      //   });
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
  background-image: url("~@/assets/bobil2.jpg");
  background-color: #cccccc;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;

  /* adjust for fixed navbar */
  padding-top: 70px;
}
</style>
