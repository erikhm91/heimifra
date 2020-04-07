<template>
  <div>
    <div v-if="post.status=='picked'" class="text-right">
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
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  props: ["post"],
  mixins: [chatroomMixin],
  data() {
    return {
      newMessage: null,
      user: null,
      loadComplete: false
    };
  },
  created() {},
  components: {
    otherBio: OtherBio
  },
  computed: {
    ...mapGetters(["getUser", "activeUser"])
  },
  methods: {
    ...mapActions(["assignTask", "sendMessage", "fetchUsers"]),

    addToOwnTasks(post) {
      console.log(this.activeUser)
      //TODO: fikse så activeUser henter min user data, inkl name.
      let reply = {
                helper: this.activeUser.uid,
                name : 'test',
                owner : this.post.uid,
                postid : this.post.id,
                text : this.newMessage
            }
      this.assignTask(reply);
      this.addMessage();
    },
    addMessage() {
      //Get chatroomid from mixin
      let chatroomid = this.getChatroomId(this.activeUser.uid, this.post.uid);
      //  console.log("chatid: ",chatroomid)
      //call action
      let payload = {
        chatroom: chatroomid,
        from: this.activeUser.uid,
        text: this.newMessage,
        time: Date.now()
      };
      this.sendMessage(payload);
    }
  }
};
</script>

<style scoped>
</style>