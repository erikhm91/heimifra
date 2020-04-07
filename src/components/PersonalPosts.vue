<template>
  <div>
    <div class="row mt-2">

      <div v-if="chatPartner" class="col-md-8 offset-md-2">
        <chat-window @closeChat="closeChat" :chatPartner="chatPartner"></chat-window>
      </div>

      <div v-else>
      
        <div v-if="helperPostId != null" class="container">
          <post-helper-pick :postid="helperPostId" @closePick="helperPostId = null"></post-helper-pick>
        </div>

        <div v-else>
          <div class="mt-2 col-md-8 offset-md-2 col-12">
            <div class="text-center">
              <button v-b-modal="'modal'" class="btn btn-primary">+ Opprett ny handleliste</button>
              <b-modal :id="'modal'" :title="'Opprett ny liste'" :hide-footer="true" centered>
                <post-creator @complete="closeModal('modal')"></post-creator>
              </b-modal>
            </div>
            <b-card-group deck>
              <home-store-post
                class="mt-3 col-12"
                v-for="(post, i) in myPosts"
                v-bind:key="i"
                :post="post"
              >
                <div class="mb-2" v-if="post.status == 'offer'">
                  <button @click="triggerPostHelperPick(post.id)" class="btn btn-primary">
                    <span>{{numberOfRepliesToPost(post.id)}} hjelpere har svart deg!</span>
                  </button>
                </div>
                <div class="mb-2" v-if="post.status == 'picked'">
                  <button class="btn btn-outline-secondary disabled">
                    <span>Du får hjelp!</span>
                  </button>
                  <button class="btn btn-primary" @click="showChat(post)">Åpne chat</button>
                </div>
                <post-delete :postid="post.id"></post-delete>
                <post-complete :postid="post.id"></post-complete>
              </home-store-post>
            </b-card-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import OwnPost from "@/components/posts/OwnPost.vue";
import Post from "@/components/posts/Post.vue";
import PostCreator from "@/components/posts/PostCreator.vue";
import PostHelperPick from "@/components/posts/PostHelperPick.vue";
// import OtherBio from "@/components/profile/OtherBio.vue";
import PostDelete from "@/components/posts/PostDelete.vue";
import PostComplete from "@/components/posts/PostComplete.vue";
import chatroomMixin from "@/components/mixins/chatroomMixin.js";
import ChatWindow from "@/components/message/ChatWindow.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  mixins: [chatroomMixin],
  data() {
    return {
      postHelperArray: [],
      helperPostId: null,
      chatPartner: null
    };
  },
  computed: {
    ...mapGetters(["activeUser","myPosts", "repliesForPost", "numberOfRepliesToPost"])
  },
  mounted() {},
  created() {
    // this.$store.subscribe((mutation, state) => {
    //   if (mutation.type === "ADD_OWN_POST") {
    //     //console.log
    //     console.log(state);
    //     this.$forceUpdate();
    //   }
    // });
  },
  components: {
    PostHelperPick,
    PostCreator,
    // OtherBio,
    HomeStorePost: Post,
    PostDelete,
    PostComplete,
    ChatWindow
  },
  methods: {
    triggerPostHelperPick(postid) {
      // this.postHelperArray
      this.helperPostId = postid;
    },
    showChat(post) {
      //set active chatroom
      // let chatroom = "" + post.uid + "_" + this.$store.getters.activeUser.uid;
      let chatroom = this.getChatroomId(post.picked, this.activeUser.uid);
      // console.log("chatroom: " + chatroom);
      this.$store.commit("SET_ACTIVE_CHATROOM", chatroom);
      console.log("showchat triggered for ", post.picked);
      this.chatPartner = post.picked;
    },
    closeChat() {
      this.chatPartner = null;
      console.log("closeChat fired in parent");
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