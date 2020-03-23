<template>
  <div>
    <h5>Her er chatvinduet med {{chatPartner}}</h5>

    <div v-for="(message, i) in chat.messages" v-bind:key="i">
      <div class="row" :class="{ 'justify-content-end': isActiveUser(message.sender_id) }">
        <div class="card mb-1 col-auto">
          <div class="card-body p-0 pt-1">
            <!-- <h5 class="card-title">Special title treatment</h5> -->
            <p class="card-text">{{message.text}}</p>
            <p class="p-0">
              <small class="text-muted">Sendt kl. {{displayTimestamp(message.timestamp)}}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
    <new-message></new-message>

    <!-- <p>chat: {{chat}}</p> -->
  </div>
</template>

<script>
import NewMessage from "@/components/message/NewMessage.vue";
export default {
  props: ["chatPartner"],
  created() {
    console.log(this.chatPartner);
  },

  computed: {
    chat() {
      console.log(this.$store.getters.activeUser.uid);
      return this.$store.getters.chat(
        this.$store.getters.activeUser.uid,
        this.chatPartner
      );
    }
  },
  components: {
    NewMessage
  },
  methods: {
    displayTimestamp(unix_timestamp) {
      // Create a new JavaScript Date object based on the timestamp
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      let date = new Date(unix_timestamp * 1000);
      // Hours part from the timestamp
      let hours = date.getHours();
      // Minutes part from the timestamp
      let minutes = "0" + date.getMinutes();
      // Seconds part from the timestamp
      let seconds = "0" + date.getSeconds();

      // Will display time in 10:30:23 format
      let formattedTime =
        hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
      //  console.log(formattedTime);
      return formattedTime;
    },
    isActiveUser(uid) {
        return uid == this.$store.getters.activeUser.uid;
    }
  }
};
</script>

<style scoped>
</style>