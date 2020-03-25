<template>
  <div>
    <!-- 
    <div class="text-center">
    <h1>Her vises dine egne lister</h1>
    </div>-->
    <div class="row mt-3">
      <div class="col-md-3 col-1 mt-4">
     
      </div>

      <div class="col-md-6 col-10">
           <div class="text-center">
          <button v-b-modal="'modal'" class="btn btn-primary">+ Opprett ny handleliste</button>
          <b-modal :id="'modal'" :title="'Opprett ny handeliste'" :hide-footer="true" centered>
            <post-creator>           
              </post-creator>
          </b-modal>
        <!-- @click="$store.commit('SET_ACTIVE_VIEW', 'post-creator')" -->
        </div>
        <b-card-group deck>
          <own-post
            class="col-12 mt-3 button"
            v-for="(post, i) in postArray"
            v-bind:key="i"
            :postProp="post"
            :ownPost="true"
          ></own-post>
        </b-card-group>
      </div>

      <div class="col-md-3 col-1"></div>
    </div>
  </div>
</template>

<script>
import OwnPost from "@/components/posts/OwnPost.vue";
import PostCreator from '@/components/PostCreator.vue'
export default {
  
  computed: {
    postArray(){
      return this.$store.getters.myPosts
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {    
      if (mutation.type === 'ADD_OWN_POST') {
          //console.log
          console.log(state);
          this.$forceUpdate()
        }
      });
  },
  components: {
    ownPost: OwnPost,
    postCreator: PostCreator
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outline {
  outline: black solid 1px;
}
</style>