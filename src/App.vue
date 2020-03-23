<template>
  <div id="app">

    <hs-header></hs-header>

    <div class="container">
      <component :is="$store.getters.activeView"></component>
    </div>
    <!-- <message-container></message-container> -->
  </div>
</template>

<script>
import MessageContainer from "./components/MessageContainer.vue";
import PostCreator from "./components/PostCreator.vue";
import Header from "./components/Header.vue";
import PersonalPosts from "./components/PersonalPosts.vue";
import MyPage from "./components/MyPage.vue";
import AboutUs from "./components/AboutUs.vue";
export default {
  name: "App",
  data() {
    return {
      activeView: this.$store.getters.activeView
    };
  },
  components: {
    hsHeader: Header,
    messageContainer: MessageContainer,
    postCreator: PostCreator,
    personalPosts: PersonalPosts,
    myPage: MyPage,
    aboutUs: AboutUs
  },
  methods: {
    setActiveView(component) {
      this.activeView = component;
    }
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
  /* background-image: url("~@/assets/bobil2.jpg"); */
  background-color: #cccccc;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  

  /* adjust for fixed navbar */
  padding-top: 70px;
}
</style>
