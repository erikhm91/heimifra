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
        <button @click="addMessage" class="btn btn-primary" type="button" id="button-addon2">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import chatroomMixin from "@/components/mixins/chatroomMixin.js";
import { mapActions } from 'vuex'
import firebase from 'firebase'
// import { mapGetters } from 'vuex'
export default {
  props : ['activeUser', 'chatroomid', 'chatPartner', 'postid'],
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
         to: this.chatPartner,
         chatroom : this.chatroomid,
         from: this.activeUser.uid,
         text: this.newMessage,
         postid: this.postid,
         time: new firebase.firestore.Timestamp.now(),
         read: false
       }
       this.sendMessage(payload)
       this.newMessage = null;
    },
  }
};
</script>

<style scoped>
</style>