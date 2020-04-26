<template>
  <div>
    <!-- <div class="card"> -->
    <div class="row no-gutters">
      <!-- picture -->
      <div class="col-2 mt-3 pt-1 ml-1">
        <!--TODO: implementere profilbilde fra bruker! <img
            style="max-width: 60px"
            src="x"
            class="card-img rounded-circle border"
            alt="profilbilde"
        />-->
        <profile-icon height="50" width="50"></profile-icon>
      </div>
      <!-- name and rating -->
      <div class="col-9 ml-2 mt-2 pt-1">
        <h5 class="card-title">{{user.name}}</h5>
        <div class="row">
          <div class="col-12">
            <span v-if="user.rate">
              <star-rating
                :item-size="23"
                :border-width="0"
                :show-rating="false"
                v-model="user.rate"
                :read-only="true"
              ></star-rating>
            </span>
            <span v-else>
              <small class="mt-1 text-muted">{{user.name.split(' ')[0]}} har ikke fått noen vurderinger enda.</small>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="card-body">
      <!-- <div class="row">
      <div class="col-12 mb-0">-->
      <div v-if="user.adress">{{user.adress}}</div>
      <div v-if="user.email" class>{{user.email}}</div>
      <div v-if="user.tlf" class>Tlf: {{user.tlf}}</div>

      <small
        class="mt-1 text-muted"
      >{{getTagline}}</small>
    </div>
    <!-- </div> -->
    <!-- </div>
    </div>-->
  </div>
</template>

<script>
import ProfileIcon from "@/components/icons/ProfileIcon.vue";
import { StarRating } from "vue-rate-it";
export default {
  props: ["user"],
  data() {
    return {
      //   rating: 3
    };
  },
  created() {
    console.log("user:", this.user);
  },
  computed: {
    rating() {
      // let rate = this.$store.getters.getUser(this.user.uid).rate;
      // if (rate != null) {
      //   return rate;
      // } else {
      //   return 0;
      // }
      console.log("rating triggered");
      return 3;
    },
    getTagline() {
      let handel;
      if (this.user.jobs == 1) {
        handel = ' handel'
      } else {
        handel = ' handler'
      }
      const text = this.user.name.split(' ')[0] + ' har fullført ' + this.user.jobs + handel + ' i Heimifra.';
      return text;
    }
  },
  components: {
    StarRating,
    ProfileIcon
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pic {
  position: absolute;
  left: 0%;
  top: 0%;
  z-index: 10;
}

.outline {
  border: 1px solid black;
}
</style>