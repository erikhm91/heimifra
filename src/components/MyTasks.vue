<template>
  <div>
     <div class="row mt-2">
   
    <div v-if="activeChatroom" class="col-md-8 offset-md-2">
      <chat-window :chatroom="activeChatroom"></chat-window>
    </div>

    <div v-else class="col-md-8 offset-md-2">

      <b-card-group deck>
      <!-- <div > -->
        <home-store-post
        v-for="(post, i) in postArray" v-bind:key="i"
         class="mt-3 col-12" :post="post">
          <div v-if="post.hjelp ==true" class="text-right"></div>
          <button @click="removeTask(post)" class="btn btn-outline-danger mr-2 btn-sm">Fjern oppdrag</button>
          <button class="btn btn-primary" @click="showChat(post)">Åpne chat</button>
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
import chatroomMixin from '@/components/mixins/chatroomMixin.js'
import { mapActions } from 'vuex'
export default {
    mixins: [chatroomMixin],
  components: {
    // OwnTask,
    ChatWindow,
    homeStorePost: Post
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
      return this.$store.getters.activeUser
    }
  },
  methods: {
    ...mapActions([
        'removeTask'
    ]),
    showChat(post) {
      //set active chatroom
      // let chatroom = "" + post.uid + "_" + this.$store.getters.activeUser.uid;
      let chatroom = this.getChatroomId(post.uid, this.activeUser.uid)
      // console.log("chatroom: " + chatroom);
      this.$store.commit("SET_ACTIVE_CHAT", chatroom);
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