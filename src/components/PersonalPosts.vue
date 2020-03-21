<template>
<div>
<!-- 
    <div class="text-center">
    <h1>Her vises dine egne lister</h1>
    </div> -->
    <div class="row mt-3">
      <div class="col-md-3 col-1"></div>

      <div class="col-md-6 col-10">
        <b-card-group deck>
          <home-store-post class="col-12 mt-3 button" v-for="(post, i) in postArray" v-bind:key="i" :post="post" :ownPost="true"></home-store-post>
        </b-card-group>
      </div>

      <div class="col-md-3 col-1"></div>
    </div>

    </div>
</template>

<script>
import Post from "./Post.vue";
export default {
  data() {
    return {
      postArray: this.$store.getters.myPosts
    };
  },
  components: {
    homeStorePost: Post
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outline {
  outline: black solid 1px;
}
</style>