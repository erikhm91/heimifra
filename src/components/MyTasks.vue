<template>
  <div>
    <div class="row mt-2">
      <div v-if="chatPartner" class="col-md-8 offset-md-2">
        <chat-window @closeChat="closeChat" :chatPartner="chatPartner"></chat-window>
      </div>

      <div v-else class="col-md-8 offset-md-2">
        <b-card-group deck>
          <!-- <div > -->
          <home-store-post
            v-for="(post, i) in postArray"
            v-bind:key="i"
            class="mt-3 col-12"
            :post="post"
            :status="post.status"
            view="task"
          >
            <!-- <div v-if="post.hjelp ==true" class="text-right"></div> -->
            <div class="row justify-content-end">
              <button class="btn" @click="showChat(post)"><icon-chat height="2rem" width="2rem"></icon-chat></button>
            </div>
            <div class="row justify-content-end">
              <post-task-delete :postid="post.id"></post-task-delete>
            </div>
          </home-store-post>
          <!-- <own-task class="mt-3"  :post="post"><button class="btn btn-primary" @click="showChat(post)">Åpne chat</button></own-task> -->
          <!-- </div> -->
        </b-card-group>
      </div>
    </div>
  </div>
</template>

<script>
// import OwnTask from "@/components/posts/OwnTask.vue";
import Post from "@/components/posts/Post.vue";
import ChatWindow from "@/components/message/ChatWindow.vue";
import chatroomMixin from "@/components/mixins/chatroomMixin.js";
import PostTaskDelete from "@/components/posts/PostTaskDelete.vue";
import IconChat from "@/components/icons/IconChat.vue";
import { mapActions } from "vuex";
export default {
  mixins: [chatroomMixin],
  data() {
    return {
      chatPartner: null
    };
  },
  components: {
    // OwnTask,
    ChatWindow,
    homeStorePost: Post,
    PostTaskDelete,
    IconChat
  },
  computed: {
    postArray() {
      return this.$store.getters.myTasks;
    },
    activeChatroom() {
      // console.log(this.$store.getters.activeChatroom)
      return this.$store.getters.activeChatroom;
    },
    activeUser() {
      return this.$store.getters.activeUser;
    }
  },
  methods: {
    ...mapActions(["removeTask"]),
    showChat(post) {
      //set active chatroom
      // let chatroom = "" + post.uid + "_" + this.$store.getters.activeUser.uid;
      let chatroom = this.getChatroomId(post.uid, this.activeUser.uid);
      // console.log("chatroom: " + chatroom);
      this.$store.commit("SET_ACTIVE_CHATROOM", chatroom);
      console.log("showchat triggered for ", post.uid);
      this.chatPartner = post.uid;
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
.border {
  border-right: 3px solid black;
}
/* 
.clickable {
  cursor: pointer;
} */
</style>