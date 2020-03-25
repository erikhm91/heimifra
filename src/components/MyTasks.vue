<template>
<div>
      

         <!-- <router-view :to="{ name: 'chat'}"></router-view> -->
        <div v-if="activeChatroom">
          <chat-window :chatroom="activeChatroom"></chat-window>
        </div>

        
  
        <div v-else>
          <div v-for="(post, i) in postArray" v-bind:key="i" @click="showChat(post)">
            <own-task class="mt-3 clickable"  :post="post"></own-task>
          </div>
       </div>
      <!-- </div>
      </div>-->

  

    </div>
</template>

<script>
import OwnTask from "@/components/posts/OwnTask.vue";
import ChatWindow from "@/components/message/ChatWindow.vue";
export default {
  components: {
    OwnTask,
    ChatWindow
  },
  computed: {
    postArray() {
      return this.$store.getters.myTasks
    },
    activeChatroom() {
      console.log(this.$store.getters.activeChatroom)
      return this.$store.getters.activeChatroom
    }
  },
  methods: {
    showChat(post){
      //set active chatroom
      let chatroom = '' + post.uid + '_' + this.$store.getters.activeUser.uid
      console.log("chatroom: " + chatroom);
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

.clickable {
  cursor: pointer;
}
</style>