<template>
  <div class="row mt-2">
    <div class="col-md-8 offset-md-2 col-12">
      <!-- <div>Min plassering: {{this.userlat}}, {{this.userlon}}</div> -->

      <div>Avstand i km: {{range}}</div>
      <!-- <input type="range" name="location" id="distanceslider"> -->
      <vue-slider v-model="range" :min="1"></vue-slider>
      <!-- <div>min posisjon: {{userlat}},{{userlon}}</div> -->
      <div class="row mt-2">
      <div class="col-12 col-sm-4">
      <button
        type="button"
        class="btn btn-secondary"
        @click="triggerFetchPostsGeoFireX()"
      >Hent lister</button>
      </div>
      <div class="col-12 col-sm-8 mb-2">
        <vue-dropdown
          style="font-size: 1.3rem"
          :options="this.addressDropdown"
          v-on:selected="getLocationOfAddress($event)"
          v-on:filter="triggerGetDropdownList($event)"
          :disabled="false"
          :maxItem="10"
          placeholder="Sett min posisjon"
        ></vue-dropdown>
        <small>© Kartverket</small>
      </div>
      </div>
      <!-- <div>test avstand i km: {{getDistance(userlat, userlon, 59.9396, 10.6715)}}</div> -->
      <!-- <div>avstand fra meg selv data: {{distance}}</div>
      <div>avstand fra meg selv data: {{distance}}</div>-->

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
          <div
            v-if="post.loc"
          >{{getDistanceGeoFireX(userlat, userlon, post.loc.geopoint.F, post.loc.geopoint.V)}} kilometer fra deg</div>
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
import { firestore } from "@/firebase/init";
import PostCreator from "@/components/posts/PostCreator.vue";
import PostReply from "@/components/posts/PostReply.vue";
import { mapGetters, mapActions } from "vuex";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
import geo from "@/firebase/geo";
import VueDropdown from "vue-simple-search-dropdown";
import axios from 'axios'
export default {
  data() {
    return {
      userlat: null,
      userlon: null,
      range: 10,
      distance: 0,

      //kartverket api/vue dropdown:
      globalTimeout: null,
      addressDropdown: []

    };
  },
  computed: {
    ...mapGetters(["postsNotOwn", "postArray", "activeUser"]),
    filteredPosts() {
      // let arrayCopy = this.postArray
      // return arrayCopy.sort((a,b) => (a.timestamp > b.timestamp) ? 1 : -1)
      // .filter(post => post.uid != this.activeUser.uid);
      return this.postArray;
    }
  },
  components: {
    homeStorePost: Post,
    PostCreator,
    postReply: PostReply,
    VueSlider,
    VueDropdown
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
        this.triggerFetchPostsGeoFireX();
      });
    }
  },
  methods: {
    ...mapActions(["fetchPostsGeo", "fetchPostsGeoFireX"]),
    closeModal(id) {
      this.$bvModal.hide(id);
    },
    // getDistance(lat1, lon1, lat2, lon2) {
    //   var p = 0.017453292519943295; // Math.PI / 180
    //   var c = Math.cos;
    //   var a =
    //     0.5 -
    //     c((lat2 - lat1) * p) / 2 +
    //     (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

    //   let distance = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    //   return Math.round(distance)
    // },
    getDistanceGeoFireX(userlat, userlon, lat, lon) {
      if ((userlat, userlon, lat, lon)) {
        console.log("input data: ", userlat, userlon, lat, lon);
        let distance = geo.distance(
          geo.point(userlat, userlon),
          geo.point(lat, lon)
        );
        return Math.round(distance);
      }
    },
    // printGeolocation(loc) {
    //   console.log("geoloc", loc.geopoint.F)
    // },
    triggerFetchPostsGeo() {
      console.log("triggered fetchpostsgeo");
      let payload = {
        latitude: this.userlat,
        longitude: this.userlon,
        range: this.range
      };
      this.fetchPostsGeo(payload);
    },
    triggerFetchPostsGeoFireX() {
      //  console.log("geofirex from postview: ", geo)
      //  const center = geo.point(this.userlat, this.userlon)
      //  const radius = this.range; //range in km
      //  const field = 'loc'

      //  const firestoreRef = firestore.collection("posts").where("status", "in", ["free", "offer", "picked"])
      //  const geoRef = geo.query(firestoreRef)

      //  const query = geoRef.within(center, radius, field)
      //  query.subscribe(hits => console.log("fetched from geoRefquery: ", hits))
      const payload = {
        lat: this.userlat,
        lon: this.userlon,
        range: this.range
      };
      this.fetchPostsGeoFireX(payload);
    },
    triggerGetDropdownList(value) {
      if (value) {
        this.delay(value);
      }
    },
    triggerGetLocationOfAddress(value) {
      if (value) {
        this.getLocationOfAddress(value)
      }
    },

    //TODO put in mixin instead
    delay(value) {
      if (this.globalTimeout != null) {
        clearTimeout(this.globalTimeout);
      }
      this.globalTimeout = setTimeout(() => {
        console.log("timeout reached, querying data: ", value);
        this.fetchAddresses(value);
      }, 1000);
    },
    fetchAddresses(value) {
      console.log("searching address: ", value);
      let queryparam =
        "https://ws.geonorge.no/adresser/v1/sok?sok=" + "*" + value + "*";
      axios.get(queryparam).then(response => {
        if (response.data.adresser) {
          console.log("response from kartverket: ", response);
          this.buildDropdownList(response.data.adresser);
        }
      });
    },
    buildDropdownList(array) {
      console.log("addressedata: ", this.addressDropdown);
      this.addressDropdown = [];
      array.forEach(item => {
        let option = {
          id: item,
          name: item.adressetekst + ", " + item.postnummer + " " + item.poststed
        };
        this.addressDropdown.push(option);
      });
    },
    getLocationOfAddress(value) {
      if (value.id) {
        console.log("selected entry: ", value.id);
        this.address = value.name
        console.log("this.address: ", this.address)
        this.userlat = value.id.representasjonspunkt.lat;
        this.userlon = value.id.representasjonspunkt.lon;
        console.log("latitude og longitude: ", this.latitude, this.longitude);
      }
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
