<template>
  <div class="row mt-2">
    <div class="col-md-8 offset-md-2">
      <div class="text-center">
        <button v-b-modal="'modal'" class="btn btn-primary">+ Opprett ny handleliste</button>
      </div>
      <!-- modal inside post creator -->
      <b-modal :id="'modal'" :title="'Opprett ny liste'" :hide-footer="true" centered>
        <post-creator @complete="closeModal('modal')"></post-creator>
      </b-modal>

      <b-card-group deck>
        <home-store-post
          class="col-12 mt-3 button"
          v-for="(post, i) in posts"
          v-bind:key="i"
          :post="post"
        >
          <!-- Modal handled inside post-reply -->
          <post-reply :post="post"></post-reply>
        </home-store-post>
      </b-card-group>
    </div>
  </div>
</template>

<script>
// import firebase from 'firebase'
import Post from "@/components/posts/Post.vue";
import db from "@/firebase/init";
import PostCreator from "@/components/posts/PostCreator.vue";
import PostReply from "@/components/posts/PostReply.vue";
export default {
  computed:{ 
      posts() {
        return this.$store.getters.postArray
      }
  },
  components: {
    homeStorePost: Post,
    PostCreator,
    postReply: PostReply,
  },
  created() {
    // if (this.$store.getters.postArray.length < 1) {
    //   this.initialGetPosts();
    // } else {
    //   //check for delta, new messages arrived?
    // }
  },
  mounted() {
    // console.log("MC mounted triggered")
    // if (this.$store.getters.dbActive) {
    //     console.log("MC db active")
         console.log(this.$store.getters.postArray)
    // }
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
    },
    closeModal(id){
      this.$bvModal.hide(id)
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
