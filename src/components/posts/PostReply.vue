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

      <other-bio :user="post"></other-bio>
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
    ...mapActions(['assignTask', 'sendMessage']),

    addToOwnTasks(post) {
      this.assignTask(post)
      this.addMessage()
      this.$store.commit("ADD_TASK", post);  
    },
    addMessage() {
       //Get chatroomid from mixin
       let chatroomid = this.getChatroomId(this.activeUser.uid, this.post.uid);
      //  console.log("chatid: ",chatroomid)
       //call action
       let payload = {
         chatroom : chatroomid,
         from: this.activeUser.uid,
         to: this.post.uid,
         text: this.newMessage
       }
       this.sendMessage(payload)

    }
  }
};
</script>

<style scoped>
</style>