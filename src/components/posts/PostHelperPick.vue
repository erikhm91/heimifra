<template>
  <div v-if="userdataloaded">
    <button @click="$emit('closePick')" class="mb-3 btn btn-primary">Tilbake</button>

    <div v-for="(reply, i) in this.repliesForPost(postid)" :key="i">
      <b-card>
        <div class="row">
          <div class="col-6">
            <other-bio :user="getUser(reply.helper)"></other-bio>
          </div>
          <div class="col-4">
            {{reply.name}} har skrevet:
            <!-- <b-card-text>Example chat message.</b-card-text> -->
            <div class="card mb-1 col-auto blue">
              <div class="card-body p-0 pt-1">
                <!-- <h5 class="card-title">Special title treatment</h5> -->
                <p class="card-text mb-1">{{reply.text}}</p>

                <div class="mb-1 text-right">
                  <small class="text-muted">Sendt {{displayTime(reply.time)}}</small>
                </div>
              </div>
            </div>
          </div>
          <div class="col-2">
            <button @click="chooseHelper(reply)" class="btn btn-primary">Velg</button>
          </div>
        </div>
      </b-card>
    </div>

    <!-- set style for the whole section -->
    <!-- <div class>
      <div class="row" v-for="(reply, i) in this.repliesForPost(postid)" :key="i">
        <div class="col-6 bg-white outline">
          <other-bio :user="getUser(reply.helper)"></other-bio>
        </div>
        <div class="col-6 bg-white outline">Chatpreview + pick button</div>
      </div>
    </div>-->
    <!-- <div v-for=""></div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import OtherBio from "@/components/profile/OtherBio.vue";
export default {
  props: ["postid"],
  data() {
    return {
      postReplies: [],
      userdataloaded: false
    };
  },
  created() {
    //fetch users from db
    let uids = [];
    this.repliesForPost(this.postid).forEach(reply => uids.push(reply.helper));
    this.fetchUsers(uids);
    console.log("finished fetching data");
    this.userdataloaded = true;
  },
  methods: {
    ...mapActions(['fetchUsers', 'setPostPicked']),
    chooseHelper(reply) {
      console.log("helper chosen, todo: update db and store", reply);

      //set picked = uid i post, oppdatere status = picked
      let payload = {
        postid: reply.postid,
        uid: reply.helper
      };
      this.setPostPicked(payload),
      this.$emit('closePick')
    },
    displayTime(timestamp) {
      let dateObj = timestamp.toDate();
      const time = this.formatTime(dateObj);
      const date = this.formatDate(dateObj);
      const datetext = date + " kl. " + time;
      return datetext;
    },
    formatDate(date) {
      let day = date.getDate();
      let month = date.getMonth() + 1; //starts at 0.
      const year = date.getFullYear();
      // let formattedDate = day.substr(-2) + "." + month.substr(-2) + "." + year;
      let formattedDate = day + "." + month + "." + year;
      return formattedDate;
    },
    formatTime(date) {
      let hours = "0" + date.getHours();
      let minutes = "0" + date.getMinutes();
      let seconds = "0" + date.getSeconds();

      // Will display time in 10:30:23 format
      let formattedTime =
        hours.substr(-2) + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
      return formattedTime;
    },
  },
  computed: {
    ...mapGetters(["repliesForPost", "getUser"])
  },
  components: {
    OtherBio
  }
};
</script>

<style lang="scss">
.outline {
  border: 0.25rem solid white;
}
.blue {
  background-color: lavender;
}
</style>