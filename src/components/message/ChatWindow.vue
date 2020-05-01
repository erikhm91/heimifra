<template>
  <div>
    <div class="mb-3">
      <button @click="closeChat()" class="btn btn-primary">Tilbake</button>
    </div>
    <div v-if="activeChatMessages" id="chatwindow" class="container overflow-auto" style="max-height:500px">
      <div v-for="(message, i) in activeChatMessages" v-bind:key="i">
        <div class="row" :class="{ 'justify-content-end': isActiveUser(message.from)}">
          <div class="card mb-1 col-auto" :class="{ 'blue': isActiveUser(message.from) }">
            <div class="card-body p-0 pt-1">
              <!-- <h5 class="card-title">Special title treatment</h5> -->
              <p class="card-text mb-1">{{message.text}}</p>

              <div class="mb-1 text-right">
                <small class="text-muted">{{ message.datetext}}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <new-message :chatroomid="chatroomid" :activeUser="activeUser" :chatPartner="chatPartner" :postid="postid"></new-message>
  </div>
</template>

<script>
import firebase from "firebase";
import NewMessage from "@/components/message/NewMessage.vue";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import chatroomMixin from "@/components/mixins/chatroomMixin.js";
export default {
  mixins: [chatroomMixin],
  props: ["chatPartner", 'postid'],
  data() {
    return {
      chatroomid: null,
      mostRecentPrintedDate: null
    };
  },
  created() {
    console.log("activeUser: ", this.activeUser);
    this.chatroomid = this.getChatroomId(this.activeUser.uid, this.chatPartner, this.postid);
    let payload = {
      chatroomid: this.chatroomid,
      chatPartner: this.chatPartner
    };
    this.activateChatNew(payload);
    // this.initiateChatListener(payload);
  },

  beforeDestroy() {
    // document.removeEventListener("backbutton", this.closeChat());
    this.nullActiveChat();
  },
  // watched: {
  //   activeChatMessages() {
  //     console.log("activeChatMessages changed")
  //     var objDiv = document.getElementById("chatwindow");
  //     // objDiv.scrollTop = objDiv.scrollHeight;
  //   }
  // },

  computed: {
    ...mapGetters(["activeChat", "activeUser"]),
    activeChatMessages() {
      return this.$store.getters.activeChatMessages;
    }
  },
  watched: {
    activeChatMessages() {
      let objDiv = document.getElementById("chatwindow");
      if (objDiv != null) {
        objDiv.scrollTop = objDiv.scrollHeight;
      }
    }
  },
  components: {
    NewMessage
  },
  methods: {
    ...mapActions(["initiateChatListener", "nullActiveChat", "activateChatNew"]),

    //TODO: outsource to store, set in message object once, when message is retrieved.
    // displayTime(message) {
    //   console.log("requested displaytime of message: ",message)
    //   let timestamp = message.time
    //   let dateObj = timestamp.toDate();
    //   const time = this.formatTime(dateObj);
    //   const date = this.formatDate(dateObj);
    //   let datetext;
    //   if (date == this.mostRecentPrintedDate) {
    //     datetext = time;
    //   } else {
    //     datetext = date + " kl. " + time;
    //     this.mostRecentPrintedDate = date;
    //   }
    //   var objDiv = document.getElementById("chatwindow");
    //   if (objDiv != null) {
    //     objDiv.scrollTop = objDiv.scrollHeight;
    //   }
    //   return datetext;
    // },
    // formatDate(date) {
    //   let day = "0" + date.getDate();
    //   let month = date.getMonth() + 1;
    //   month = "0" + month;
    //   const year = date.getFullYear();
    //   let formattedDate = day.substr(-2) + "." + month.substr(-2) + "." + year;
    //   return formattedDate;
    // },
    // formatTime(date) {
    //   let hours = "0" + date.getHours();
    //   let minutes = "0" + date.getMinutes();
    //   let seconds = "0" + date.getSeconds();

    //   // Will display time in 10:30:23 format
    //   let formattedTime =
    //     hours.substr(-2) + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    //   return formattedTime;
    // },
    isActiveUser(uid) {
      return uid == this.activeUser.uid;
    },
    closeChat() {
      console.log("closechat fired");
      this.$emit("closeChat");
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