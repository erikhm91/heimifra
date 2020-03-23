<template>
<div>
<!-- 
    <div class="text-center">
    <h1>Her vises dine egne lister</h1>
    </div> -->


    <div class="row mt-3">
      <!-- <div class="col-md-3 col-1"></div> -->

      <div class="col-md-6 col-6">
        <div class="container">
        <b-card-group deck >
          <div v-for="(post, i) in postArray" v-bind:key="i" @click="showChat(post)">
            <own-task class="col-12 mt-3 clickable"  :post="post"></own-task>
          </div>
        </b-card-group>
      </div>
      </div>

      <!-- <div class="col-md-3 col-1"></div> -->
      <div v-if="activeChat" class="col-6 border-left">
        <div class="container">
          <chat-window  :chatPartner="chatPartner"></chat-window>

        </div>
      </div>
    </div>

    </div>
</template>

<script>
import OwnTask from "@/components/posts/OwnTask.vue";
import ChatWindow from "@/components/message/ChatWindow.vue";
export default {
  data() {
    return {
      activeChat: false,
      chatPartner: null
    };
  },
  components: {
    OwnTask,
    ChatWindow
  },
  computed: {
    postArray() {
      return this.$store.getters.myTasks
    }
  },
  methods: {
    showChat(post){
      //use post
      console.log("post: "+post.uid)
      this.chatPartner = post.uid;
      this.activeChat = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.border {
  border-right: 3px solid black;
}

.clickable {
  cursor: pointer;
}
</style>