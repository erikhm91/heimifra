<template>
  <div class="row mt-2">
    <div class="col-md-8 offset-md-2 col-12">
      <!-- <div>Min plassering: {{this.userlat}}, {{this.userlon}}</div> -->
      

      <div>Avstand i km: {{range}}</div>
      <!-- <input type="range" name="location" id="distanceslider"> -->
      <vue-slider v-model="range" :min="1"></vue-slider>
      <div>min posisjon: {{userlat}},{{userlon}}</div>
      <button type="button" class="btn btn-secondary" @click="triggerFetchPostsGeo()">Hent lister</button>
      <!-- <div>test avstand i km: {{getDistance(userlat, userlon, 59.9396, 10.6715)}}</div> -->
      <!-- <div>avstand fra meg selv data: {{distance}}</div>
      <div>avstand fra meg selv data: {{distance}}</div> -->

      <!-- <div>avstand fra meg selv ny formel: {{getDistanceFromUser(59, 9, 59, 9.01)}}</div> -->

      <div class="text-center">
        <button v-b-modal="'modal'" class="btn btn-primary">+ Opprett ny handleliste</button>
         <!--   -->
      </div>

      <b-modal :id="'modal'" :title="'Opprett ny liste'" :hide-footer="true" centered>
        <post-creator @complete="closeModal('modal')"></post-creator>
      </b-modal>

      <b-card-group deck>
        <home-store-post
          class="col-12 mt-3 button"
          v-for="(post) in filteredPosts"
          v-bind:key="post.id"
          :post="post"
          :view="'postview'"
        >
        
        <div v-if="post.loc" @click="printGeolocation(post.loc)">{{getDistance(userlat, userlon, post.loc.latitude, post.loc.longitude)}} kilometer fra deg</div>
          <!-- Modal handled inside post-reply -->
          <post-reply :post="post"></post-reply>
        </home-store-post>
      </b-card-group>
    </div>
  </div>
</template>

<script>
// import firebase from 'firebase'
import Post from "@/components/posts/Post.vue";
import db from "@/firebase/init";
import PostCreator from "@/components/posts/PostCreator.vue";
import PostReply from "@/components/posts/PostReply.vue";
import { mapGetters, mapActions } from "vuex";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
export default {
  data() {
    return {
      userlat: null,
      userlon: null,
      range: 10,
      distance: 0
    };
  },
  computed: {
    ...mapGetters(["postsNotOwn", "postArray", "activeUser"]),
    filteredPosts() {
      // let arrayCopy = this.postArray
      // return arrayCopy.sort((a,b) => (a.timestamp > b.timestamp) ? 1 : -1)
      // .filter(post => post.uid != this.activeUser.uid);
      return this.postArray
      }
  },
  components: {
    homeStorePost: Post,
    PostCreator,
    postReply: PostReply,
    VueSlider
  },
  mounted() {
    console.log("postArray: ", this.postArray);

    //get user geolocation
    console.log("here we identify the geolocation of user");
    //check if browser supports geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.userlat = pos.coords.latitude;
        this.userlon = pos.coords.longitude;
        console.log(
          "geolocation of user in callback: ",
          this.userlat,
          this.userlon
        );
        //trigger fetching posts
        this.triggerFetchPostsGeo()

      });
    }
  },
  methods: {
    ...mapActions(['fetchPostsGeo']),
    closeModal(id) {
      this.$bvModal.hide(id);
    },
    getDistance(lat1, lon1, lat2, lon2) {
      var p = 0.017453292519943295; // Math.PI / 180
      var c = Math.cos;
      var a =
        0.5 -
        c((lat2 - lat1) * p) / 2 +
        (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

      let distance = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
      return Math.round(distance)
    },
    printGeolocation(loc) {
      console.log("geoloc", loc)
    },
    triggerFetchPostsGeo() {
        console.log('triggered fetchpostsgeo')
        let payload = {
          latitude: this.userlat,
          longitude: this.userlon,
          range: this.range
        }
        this.fetchPostsGeo(payload)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outline {
  outline: black solid 1px;
}
</style>
