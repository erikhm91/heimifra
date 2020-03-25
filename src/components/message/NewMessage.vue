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
        <button class="btn btn-secondary" type="button" id="button-addon2">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewMessage",
  // props: ["name"],
  data() {
    return {
      newMessage: null
    };
  },
  computed: {
    activeUser() {
      return this.$store.getters.activeUser;
    },
    activeChatroom() {
      return this.$store.getters.activeChatroom;
    }
  },
  methods: {
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