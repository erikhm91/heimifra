<template>
  <div class="row mt-2">
    <div class="col-md-8 offset-md-2 col-12">
      
      <div>Min plassering: {{this.userlat}}, {{this.userlong}}</div>
      
      <div class="text-center">
        <button v-b-modal="'modal'" class="btn btn-primary">+ Opprett ny handleliste</button>
      </div>


      <b-modal :id="'modal'" :title="'Opprett ny liste'" :hide-footer="true" centered>
        <post-creator @complete="closeModal('modal')"></post-creator>
      </b-modal>

      <b-card-group deck>
        <home-store-post
          class="col-12 mt-3 button"
          v-for="(post, i) in filteredPosts"
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
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      userlat: null,
      userlong: null
    }
  },
  computed:{ 
      ...mapGetters(['postsNotOwn','postArray', 'activeUser']),
      filteredPosts() {
        return this.postArray.filter(post => post.uid != this.activeUser.uid)
      }
  },
  components: {
    homeStorePost: Post,
    PostCreator,
    postReply: PostReply,
  },
  async mounted() {
    console.log('postArray: ',this.postArray)
    
    //get user geolocation
    console.log('here we identify the geolocation of user')
    //check if browser supports geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.userlat = pos.coords.latitude
        this.userlong = pos.coords.longitude
        console.log("geolocation of user in callback: ", this.userlat, this.userlong)
        //TODO trigger search on database
      })
    }

  },
  methods: {
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
