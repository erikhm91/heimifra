<template>
  <div>
    <!-- <div class="row mt-2"> -->
    <div v-if="chatPartner" class="col-md-8 offset-md-2">
      <chat-window @closeChat="closeChat" :chatPartner="chatPartner" :postid="chatPostId"></chat-window>
    </div>

    <div v-else>
      <div v-if="helperPostId != null" class="container">
        <post-helper-pick :postid="helperPostId" @closePick="helperPostId = null"></post-helper-pick>
      </div>

      <div v-else>
        <div class="mt-2 col-md-8 offset-md-2">
          <div class="text-center">
            <button v-b-modal="'modal'" class="btn btn-primary">+ Opprett ny handleliste</button>
            <b-modal :id="'modal'" :title="'Opprett ny liste'" :hide-footer="true" centered>
              <post-creator @complete="$bvModal.hide('modal')"></post-creator>
            </b-modal>
          </div>

          <div
            v-if="myPosts.length == 0"
          >Du har ingen aktive lister. Om det er noe du trenger å få gjort kan du opprette en ny liste ved å trykke på knappen over!</div>
          <div v-else>
            <b-card-group deck>
              <home-store-post
                class="mt-3 col-12"
                v-for="(post, i) in myPostsNotDelFin"
                v-bind:key="i"
                :post="post"
                :status="post.status"
                :numOfHelpers="numberOfRepliesToPost(post.id)"
                @pickhelper="triggerPostHelperPick(post.id)"
                :address="post.address"
              >
                <!-- <div class="mb-2" v-if="post.status == 'offer'">
                  <button @click="triggerPostHelperPick(post.id)" class="btn btn-primary">
                    <span>{{numberOfRepliesToPost(post.id)}} hjelpere har svart deg!</span>
                  </button>
                </div>-->
                <div
                  class="mb-2"
                  v-if="post.status == 'picked' || post.status == 'ownerfin' || post.status == 'helpfin'"
                >
                  <div class="row justify-content-end">
                    <button class="btn" @click="showChat(post)">
                      <icon-chat height="2rem" width="2rem"></icon-chat>
                    </button>
                  </div>
                  <!-- <div v-if="post.status == 'picked'">
                    <button class="btn btn-outline-secondary disabled">
                      <span>Du får hjelp!</span>
                    </button>
                  </div>-->

                  <!-- <div v-else-if="post.status == 'ownerfin'">
                      Venter på at hjelper skal avslutte
                  </div>-->

                  <!-- <div v-else-if="post.status == 'helpfin'">
                    <button class="btn btn-secondary">
                      <span>Hjelper har avsluttet - gi din vurdering av hjelpen!</span>
                    </button>
                  </div>-->
                </div>
                <div v-if="post.status != ''" class="row justify-content-end" >
                    <post-complete
                      :owner="true"
                      :postpayload="{ 'postid': post.id, 'status': post.status, 'helper': post.picked, 'owner': post.uid}"
                    ></post-complete>
                </div>
                <div class="row justify-content-end">
                  <!-- <post-delete :postid="post.id"></post-delete> -->
                  <post-own-more :postid="post.id"></post-own-more>
                </div>

                  
              </home-store-post>
            </b-card-group>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
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
import IconChat from "@/components/icons/IconChat.vue";
import PostOwnMore from "@/components/posts/PostOwnMore.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  mixins: [chatroomMixin],
  data() {
    return {
      postHelperArray: [],
      helperPostId: null,
      chatPartner: null,
      chatPostId: null
    };
  },
  computed: {
    ...mapGetters([
      "activeUser",
      "myPosts",
      "repliesForPost",
      "numberOfRepliesToPost",
      "myPostsNotDelFin"
    ])
  },
  mounted() {
    console.log("personalposts");
  },
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
    // PostDelete,
    PostComplete,
    ChatWindow,
    IconChat,
    PostOwnMore
  },
  methods: {
    triggerPostHelperPick(postid) {
      // this.postHelperArray
      console.log("triggered posthelperpick for psotid ", postid);
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
      this.chatPostId = post.id
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