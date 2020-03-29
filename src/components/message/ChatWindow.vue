<template>
  <div>
    <div class="container">
      <div class="mb-3">
      <button @click="closeChat()" class="btn btn-primary">Tilbake</button>
      </div>

      

      <div v-for="(message, i) in chat" v-bind:key="i">
        <div class="row" :class="{ 'justify-content-end': isActiveUser(message.uid)}">
          <div class="card mb-1 col-auto" :class="{ 'blue': !isActiveUser(message.uid) }">
            <div class="card-body p-0 pt-1">
              <!-- <h5 class="card-title">Special title treatment</h5> -->
              <p class="card-text mb-1">{{message.text}}</p>

              <div class="mb-1 text-right">
                <small class="text-muted">Sendt kl. {{displayTimestamp(message.time)}}</small>
              </div>
            </div>
          </div>
        </div>
        </div>
       

      <!-- <p>chat: {{chat}}</p> -->
    </div>

    <new-message></new-message>
  </div>
</template>

<script>
import NewMessage from "@/components/message/NewMessage.vue";
import { mapActions } from 'vuex'
export default {
  props: ['chatroom', 'chatPartner'],
  // data() {
  //   return {
  //     chatId: this.$route.params.room
  //   }
  // },
  created() {
    this.initiateChatListener(this.chatPartner)
  },

  mounted () {
    // document.addEventListener("backbutton", this.closeChat(), false);
  },
  beforeDestroy () {
    // document.removeEventListener("backbutton", this.closeChat());
  },

  computed: {
    chat() {
      return this.$store.getters.activeChat
    }
  },
  components: {
    NewMessage
  },
  methods: {
    ...mapActions(['initiateChatListener']),
    displayTimestamp(unix_timestamp) {
      // Create a new JavaScript Date object based on the timestamp
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      let date = new Date(unix_timestamp);
      // Hours part from the timestamp
      let hours = "0" + date.getHours();
      // Minutes part from the timestamp
      let minutes = "0" + date.getMinutes();
      // Seconds part from the timestamp
      let seconds = "0" + date.getSeconds();

      // Will display time in 10:30:23 format
      let formattedTime =
        hours.substr(-2) + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
      //  console.log(formattedTime);
      return formattedTime;
    },
    isActiveUser(uid) {
      return uid == this.$store.getters.activeUser.uid;
    },
    closeChat() {
      console.log("closechat fired")
      this.$store.commit("NULL_ACTIVE_CHAT")
    }
  }
};
</script>

<style scoped>

.blue {
  background-color : lavender;
}
</style>