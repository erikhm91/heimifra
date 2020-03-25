<template>
  <div>
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
        :v-model="newMessage"
      ></b-form-textarea>
      <p></p>
      <p>{{post.name}} tilbyr {{post.tips}} kr som en ekstra takk for hjelpen. Dette beløpet skal legges til beløpet fra kvitteringene, og betales samlet ut til deg som hjelper. Tips kan ikke forhandles på. Ved å trykke send godtar du disse betingelsene og er klar til å hjelpe {{post.name.split(' ')[0]}}!</p>

      <other-bio :post="post"></other-bio>
    </b-modal>
  </div>
</template>

<script>
import OtherBio from "@/components/bio/OtherBio.vue";
export default {
  props: ["post"],
  data() {
    return {
      newMessage: null
    };
  },
  components: {
    otherBio: OtherBio
  },
    methods: {
    addToOwnTasks(post) {
      this.$store.commit("ADD_OWN_TASK", post);
      this.addMessage();
    },
     addMessage() {
      if (this.newMessage) {
        console.log(this.newMessage);
        //fire new message.
        let msg = {
          sender_id: this.activeUser.uid,
          text: this.newMessage,
          timestamp: Date.now()
        };
        let payload = { 'roomid': this.activeChatroom.room, 'msg': msg };
        this.$store.commit("ADD_CHATMESSAGE", payload);

        this.newMessage = null;
      } else {
        //
      }
    }
  }
};
</script>

<style scoped>
</style>