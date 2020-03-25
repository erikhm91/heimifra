<template>
  <div class="row">
    <div class="col-md-2 col-0"></div>

    <div class="col-md-8 col-12">
      <button v-b-modal="'modal'" class="btn btn-primary" >+ Opprett ny handleliste</button>

      <!-- modal inside post creator -->
      <b-modal :id="'modal'" :title="'Opprett ny handeliste'" :hide-footer="true" centered>
        <post-creator></post-creator>
      </b-modal>

      <b-card-group deck>
        <home-store-post
          class="col-12 mt-3 button"
          v-for="(post, i) in posts"
          v-bind:key="i"
          :post="post"
        ></home-store-post>
      </b-card-group>
    </div>

    <div class="col-md-2 col-0"></div>
  </div>
</template>

<script>
import Post from "./posts/Post.vue";
import db from "@/firebase/init";
import PostCreator from "./PostCreator.vue";
export default {
  data() {
    return {
      posts: this.$store.getters.postArray
    };
  },
  components: {
    homeStorePost: Post,
    PostCreator
  },
  created() {
    if (this.$store.getters.postArray.length < 1) {
      this.initialGetPosts();
    } else {
      //check for delta, new messages arrived?
    }
  },
  methods: {
    initialGetPosts() {
      let collectionReference = db.collection("posts");
      var vm = this;
      collectionReference.get().then(function(querySnapshot) {
        if (querySnapshot.empty) {
          // console.log("no data found...");
        } else {
          // console.log("data found!");
          querySnapshot.forEach(function(documentSnapshot) {
            let data = documentSnapshot.data();
            console.log(data + vm.posts);
            vm.$store.commit("ADD_POST", {
              email: data.email,
              name: data.name,
              tips: data.tips,
              text: data.text
            });
          });
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outline {
  outline: black solid 1px;
}
</style>
