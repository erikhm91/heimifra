<template>
  <div>
    <div class="card">
      <div class="row no-gutters">
        <!-- picture -->
        <div class="col-2 mt-3 pt-1 ml-1">
          <img
            @click="testLink()"
            style="max-width: 60px"
            :src="$store.getters.user(this.post.uid).pic"
            class="card-img rounded-circle border"
            alt="profilbilde"
          />
        </div>
        <!-- name and rating -->
        <div class="col-9 ml-2 mt-2 pt-1">
          <h5 class="card-title">{{post.name}}</h5>
          <div class="row">
            <div class="col-12">
              <star-rating
                :item-size="23"
                :border-width="0"
                :show-rating="false"
                v-model="rating"
                :read-only="true"
              ></star-rating>
            </div>
          </div>
        </div>
      </div>

      <div class="card-body">
        <!-- <div class="row">
          <div class="col-12 mb-0"> -->
            <div v-if="post.adress">{{post.adress}}</div>
            <div v-if="post.email" class>{{post.email}}</div>
            <div v-if="post.tlf" class>Tlf: {{post.tlf}}</div>
          
          <small class="mt-1 text-muted">{{post.name.split(' ')[0]}} har fullført 12 handler i HomeStore.</small>
          </div>
        </div>
      <!-- </div>
    </div> -->
  </div>
</template>

<script>
import { StarRating } from "vue-rate-it";
export default {
  props: ["post"],
  data() {
    return {
      //   rating: 3
    };
  },
  created() {
    console.log("post:" + this.post);
  },
  computed: {
    //   pic() {
    //       return this.$store.getters.user(this.post.uid).pic
    //   }
    rating() {
      let rate = this.$store.getters.user(this.post.uid).rate;
      if (rate != null) {
        return rate;
      } else {
        return 0;
      }
    }
  },
  components: {
    StarRating
  },
  methods: {
    testLink() {
      console.log(this.post.uid);
      console.log(this.$store.getters.users);
      console.log(this.$store.getters.user(this.post.uid).pic);
      console.log(this.pic);
    }
  }
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