<template>
  <div>
    <!-- 
    <div class="text-center">
    <h1>Her vises dine egne lister</h1>
    </div>-->
    <div class="row mt-2">
      <!-- <div class="col-md-2 mt-4"></div> -->

      <div class="mt-2 col-md-8 offset-md-2 col-12">
        <div class="text-center">
          <button v-b-modal="'modal'" class="btn btn-primary">+ Opprett ny handleliste</button>
          <b-modal :id="'modal'" :title="'Opprett ny handeliste'" :hide-footer="true" centered>
            <post-creator @complete="closeModal('modal')"></post-creator>
          </b-modal>
          <!-- @click="$store.commit('SET_ACTIVE_VIEW', 'post-creator')" -->
        </div>
        <b-card-group deck>
          <home-store-post
            class="mt-3 col-12"
            v-for="(post, i) in postArray"
            v-bind:key="i"
            :post="post"
          >
            <div v-if="post.hjelp ==true" class="text-right">
              <b-dropdown
                id="dropdown-dropright"
                dropright
                text="Hjelpere har kontaktet deg!"
                variant="primary"
                class="m-2"
              >
                <b-dropdown-item v-b-modal="'modal1'" href="#">Erik Houge Mathisen</b-dropdown-item>
              </b-dropdown>

              <b-modal
                :id="'modal1'"
                :title="'Velg hjelper'"
                :ok-title="'Velg'"
                cancel-title="Avbryt"
                centered
              >
                <other-bio
                  :post="{ 'name': $store.getters.user('erikhm10').name,
                                 'email': $store.getters.user('erikhm10').email,
                                 'tlf': $store.getters.user('erikhm10').tlf,
                                 'uid': 'erikhm10' }"
                ></other-bio>
              </b-modal>
            </div>
            <post-delete :postid="post.id"></post-delete>
          </home-store-post>
        </b-card-group>

        <!-- <b-card-group deck>
          
          <own-post
            class="col-12 mt-3 button"
            v-for="(post, i) in postArray"
            v-bind:key="i"
            :postProp="post"
            :ownPost="true"
        >-->
        <!-- <div v-if="post.hjelp ==true" class="text-right">
              <b-dropdown
                id="dropdown-dropright"
                dropright
                text="Hjelpere har kontaktet deg!"
                variant="primary"
                class="m-2"
              >
                <b-dropdown-item v-b-modal="'modal1'" href="#">Erik Houge Mathisen</b-dropdown-item>
              </b-dropdown>

              <b-modal
                :id="'modal1'"
                :title="'Velg hjelper'"
                :ok-title="'Velg'"
                cancel-title="Avbryt"
                centered
              >
                <other-bio
                  :post="{ 'name': $store.getters.user('erikhm10').name,
                                 'email': $store.getters.user('erikhm10').email,
                                 'tlf': $store.getters.user('erikhm10').tlf,
                                 'uid': 'erikhm10' }"
                ></other-bio>
              </b-modal>
        </div>-->
        <!-- </own-post>
        </b-card-group>-->
      </div>
    </div>
  </div>
</template>

<script>
// import OwnPost from "@/components/posts/OwnPost.vue";
import Post from "@/components/posts/Post.vue";
import PostCreator from "@/components/posts/PostCreator.vue";
import OtherBio from "@/components/profile/OtherBio.vue";
import PostDelete from "@/components/posts/PostDelete.vue";

export default {
  computed: {
    postArray() {
      return this.$store.getters.myPosts;
    }
  },
  mounted() {
    console.log("mounted personalposts!");
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "ADD_OWN_POST") {
        //console.log
        console.log(state);
        this.$forceUpdate();
      }
    });
  },
  components: {
    // ownPost: OwnPost,
    postCreator: PostCreator,
    OtherBio,
    HomeStorePost: Post,
    PostDelete
  },
  methods: {
    closeModal(id) {
      this.$bvModal.hide(id);
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