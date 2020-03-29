<template>
  <div>
    <div v-if="post.taken===true" class="text-right">
      <a href="#" class="btn btn-primary disabled">Jeg får hjelp</a>
    </div>
    <div v-else class="text-right">
      <a href="#" class="btn btn-outline-primary" v-b-modal="'modal'+post.id">La meg hjelpe!</a>
    </div>
    <b-modal
      @ok="addToOwnTasks(post)"
      :id="'modal'+post.id"
      :title="'Hjelp '+post.name+'!'"
      ok-title="Send"
      cancel-title="Avbryt"
      centered
    >
      <b-form-textarea
        id="textarea"
        placeholder="Skriv ditt svar her"
        rows="3"
        max-rows="6"
        v-model="newMessage"
      ></b-form-textarea>
      <p></p>
      <p>{{post.name}} tilbyr {{post.tips}} kr som en ekstra takk for hjelpen. Dette beløpet skal legges til beløpet fra kvitteringene, og betales samlet ut til deg som hjelper. Tips kan ikke forhandles på. Ved å trykke send godtar du disse betingelsene og er klar til å hjelpe {{post.name.split(' ')[0]}}!</p>

      <other-bio :post="post"></other-bio>
    </b-modal>
  </div>
</template>

<script>
import chatroomMixin from "@/components/mixins/chatroomMixin.js";
import OtherBio from "@/components/profile/OtherBio.vue";
import { mapActions } from 'vuex'
export default {
  props: ["post"],
  mixins: [chatroomMixin],
  data() {
    return {
      newMessage: null
    };
  },
  components: {
    otherBio: OtherBio
  },
  computed: {
    activeUser() {
      return this.$store.getters.activeUser;
    }
  },
  methods: {
    ...mapActions(['assignTask']),

    addToOwnTasks(post) {
      this.assignTask(post)

      // this.$store.commit("ADD_OWN_TASK", post);
    
    
    
    
    
    },
    addMessage() {
       let chatroomid = this.getChatid(this.activeUser.uid, this.post.uid);

    },
    testAddMessage() {
      // if (this.newMessage) {
      //   console.log(this.newMessage);
      //   //fire new message.
      //   let msg = {
      //     sender_id: this.activeUser.uid,
      //     text: this.newMessage,
      //     timestamp: Date.now()
      //   };
      //   let chatroomid = this.getChatid(this.activeUser.uid, this.post.uid);

      //   let payload = { roomid: chatroomid, msg: msg };
      //   console.log("chatroomid: " + chatroomid);
      //   this.$store.commit("ADD_CHATMESSAGE", payload);

      //   this.newMessage = null;
      // } else {
      //   //
      // }
    },
    getChatid(user1, user2) {
      //call mixin
      let chatroomId = this.getChatroomId(user1, user2);
      return chatroomId;
    }
  }
};
</script>

<style scoped>
</style>