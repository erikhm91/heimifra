<template>
  <div>
    <div class="input-group mb-3">
      <input
        v-on:keyup.enter="addMessage"
        type="text"
        class="form-control"
        placeholder="..."
        aria-label="Melding"
        aria-describedby="button-addon2"
        v-model="newMessage"
      />
      <div class="input-group-append">
        <button @click="addMessage" class="btn btn-secondary" type="button" id="button-addon2">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import chatroomMixin from "@/components/mixins/chatroomMixin.js";
import { mapActions } from 'vuex'
// import { mapGetters } from 'vuex'
export default {
  props : ['activeUser', 'chatroomid'],
  data() {
    return {
      newMessage: null
    };
  },
  // computed: {
  //   ...mapGetters(['activeUser', 'activeChatroom']),
  // },
  methods: {
    ...mapActions(['sendMessage']),
       addMessage() {
         console.log("activeChatroom: ",this.chatroomid)
       //Get chatroomid from mixin
      //  let chatroomid = this.getChatroomId(this.activeUser.uid, this.post.uid);
      //  console.log("chatid: ",chatroomid)
       //call action
       let payload = {
         chatroom : this.chatroomid,
         from: this.activeUser.uid,
         text: this.newMessage,
         time: Date.now()
       }
       this.sendMessage(payload)

    
    },
    // testAddMessage() {
    //   if (this.newMessage) {
    //     console.log(this.newMessage);
    //     //fire new message.
    //     let msg = {
    //       sender_id: this.activeUser.uid,
    //       text: this.newMessage,
    //       timestamp: Date.now()
    //     };
    //     let payload = { roomid: this.activeChatroom.room, msg: msg };
    //     this.$store.commit("ADD_CHATMESSAGE", payload);

    //     this.newMessage = null;
    //   } else {
    //     //
    //   }
    // }
  }
};
</script>

<style scoped>
</style>