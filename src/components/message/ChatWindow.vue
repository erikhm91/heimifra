<template>
  <div>
    <div class="container">
      <div class="mb-3">
        <button @click="closeChat()" class="btn btn-primary">Tilbake</button>
      </div>

      <div v-for="(message, i) in activeChatMessages" v-bind:key="i">
        <div class="row" :class="{ 'justify-content-end': isActiveUser(message.from)}">
          <div class="card mb-1 col-auto" :class="{ 'blue': isActiveUser(message.from) }">
            <div class="card-body p-0 pt-1">
              <!-- <h5 class="card-title">Special title treatment</h5> -->
              <p class="card-text mb-1">{{message.text}}</p>

              <div class="mb-1 text-right">
                <small class="text-muted">Sendt kl. {{ displayTime(message.time)}}</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <p>chat: {{chat}}</p> -->
    </div>

    <new-message :chatroomid="chatroomid" :activeUser="activeUser" :chatPartner="chatPartner"></new-message>
  </div>
</template>

<script>
import firebase from 'firebase'
import NewMessage from "@/components/message/NewMessage.vue";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import chatroomMixin from "@/components/mixins/chatroomMixin.js";
export default {
  mixins: [chatroomMixin],
  props: ["chatPartner"],
  data() {
    return {
      chatroomid : null
    }
  },
  created() {
    console.log("activeUser: ", this.activeUser);
    this.chatroomid = this.getChatroomId(this.activeUser.uid, this.chatPartner);
    let payload = {
      chatroomid: this.chatroomid,
      chatPartner: this.chatPartner
    };
    this.activateChat(payload);
    this.initiateChatListener(payload);
  },

  beforeDestroy() {
    // document.removeEventListener("backbutton", this.closeChat());
    this.nullActiveChat();
  },

  computed: {
    ...mapGetters(["activeChat", "activeChatMessages", "activeUser"])
  },
  components: {
    NewMessage
  },
  methods: {
    ...mapActions(["initiateChatListener", "nullActiveChat", "activateChat"]),
    displayTime(timestamp) {
      console.log(timestamp)
      const date = timestamp.toDate()
      return date;
    },
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
      return uid == this.activeUser.uid;
    },
    closeChat() {
      console.log("closechat fired");
       this.$emit('closeChat')
      // this.nullActiveChat();
    }
  }
};
</script>

<style scoped>
.blue {
  background-color: lavender;
}
</style>