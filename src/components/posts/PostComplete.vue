<template>
  <div>
    <button
      v-b-modal="postpayload.postid+'complete'"
      class="btn btn-outline-primary mr-2 btn-sm"
    >Fullført!</button>

    <b-modal
      :id="postpayload.postid+'complete'"
      :title="'Bekreft fullført'"
      :ok-title="'Fullført'"
      cancel-title="Avbryt"
      centered
      @ok="completePost()"
    >
      <p>Ved å trykke "fullfør" bekrefter du at handelen er gjennomført - tjenesten er levert og evt. penger er overført som avtalt.</p>
      <p>Før du fullfører kan du gi din vurdering av hjelperen! Din vurdering blir ikke synlig for hjelperen:</p>
      <star-rating
        :item-size="23"
        :border-width="0"
        :show-rating="false"
        v-model="rating"
        :read-only="false"
      ></star-rating>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { StarRating } from "vue-rate-it";
export default {
  props: {
    postpayload: {
      type: Object,
      required: true,
      postid: {},
      status: {},
      owner: {},
      helper: {}
    },
    owner: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      rating: null,
      newStatus: null
    };
  },
  mounted() {
    if (this.owner == true) {
      if (this.postpayload.status == "helpfin") this.newStatus = "fin";
      else {
        this.newStatus = "ownerfin";
      }
    } else if (this.owner == false) {
      if (this.postpayload.status == "ownerfin") this.newStatus = "fin";
      else {
        this.newStatus = "helpfin";
      }
    }
    console.log("newStatus: ", this.newStatus);
  },
  methods: {
    ...mapActions(["updatePostStatus", "giveUserRating"]),

    completePost() {
      this.updatePostStatus({
        postid: this.postpayload.postid,
        status: this.newStatus
      });

      if (!this.rating) {
        return;
      }

      let ratedUid;
      if (this.owner == true) {
        ratedUid = this.postpayload.helper;
      } else {
        ratedUid = this.postpayload.owner;
      }

      this.giveUserRating({
        uid: ratedUid,
        rating: this.rating
      })
      // .then(
      //   response => {
      //     alert("Rating was given!");
      //   },
      //   error => {
      //     alert("error occurred");
      //   }
      // );
    }
  },
  components: {
    StarRating
  }
};
</script>
