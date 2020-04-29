<template>
  <div>
    <div v-if="post.status=='picked'" class="text-right">
      <a href="#" class="btn btn-secondary disabled">Jeg får hjelp</a>
    </div>
    <div v-else-if="post.uid == activeUser.uid" class="text-right">
      <a href="#" class="btn btn-secondary disabled">Dette er din liste</a>
    </div>
    <div v-else-if="post.status=='offer' && userAssignedToPost(post)==true" class="text-right">
      <a href="#" class="btn btn-secondary disabled">Du har kontaktet</a>
    </div>
    <div v-else class="text-right">
      <a
        href="#"
        @click="getUserProfile(post.uid)"
        class="btn btn-outline-primary"
        v-b-modal="'modal'+post.id"
      >La meg hjelpe!</a>
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

      <other-bio v-if="postOwnerUser" :user="postOwnerUser"></other-bio>
    </b-modal>
  </div>
</template>

<script>
import chatroomMixin from "@/components/mixins/chatroomMixin.js";
import OtherBio from "@/components/profile/OtherBio.vue";
import { mapActions, mapGetters } from "vuex";
import firebase from "firebase";
export default {
  props: ["post"],
  mixins: [chatroomMixin],
  data() {
    return {
      newMessage: null,
      postOwnerUser: null,
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
    ...mapActions(["assignTask", "sendMessage", "fetchUsers", "fetchOwnUser"]),
    async getUserProfile(uid) {
      const user = this.getUser(uid);
      if (user != null) {
        this.postOwnerUser = user;
      } else {
        const users = [uid];
        let promise = this.fetchUsers(users);
        await promise;
        this.postOwnerUser = this.getUser(uid);
      }
    },

    async addToOwnTasks(post) {
      console.log(this.activeUser);
      //TODO: fikse så activeUser henter min user data, inkl name.
      if (this.activeUser.name) {
        console.log("complete profile info retrieved, no need to call api");
      } else {
        let promise = this.fetchOwnUser();
        await promise;
        console.log("fetched user");
      }

      let reply = {
        helper: this.activeUser.uid,
        name: this.activeUser.name,
        owner: this.post.uid,
        postid: this.post.id,
        text: this.newMessage,
        jobs: this.activeUser.jobs,
        time: new firebase.firestore.Timestamp.now()
      };
      this.assignTask(reply);
      this.addMessage();
    },
    addMessage() {
      //Get chatroomid from mixin
      let chatroomid = this.getChatroomId(this.activeUser.uid, this.post.uid, this.post.id);
      //  console.log("chatid: ",chatroomid)
      //call action
      let payload = {
        to: this.post.uid,
        chatroom: chatroomid,
        from: this.activeUser.uid,
        text: this.newMessage,
        postid: this.post.id
      };
      this.sendMessage(payload);
    },
    userAssignedToPost(post) {
      const uid = this.activeUser.uid;
      console.log("uid: ", uid);
      if (Object.hasOwnProperty.call(post, "offer")) {
        if (Object.hasOwnProperty.call(post.offer, uid)) {
          if (post.offer[uid] == true) {
            return true;
          }
        }
      }
      return false;
    }
  }
};
</script>

<style scoped>
</style>