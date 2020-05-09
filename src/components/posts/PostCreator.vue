<template>
  <div>
    <div class="row">
      <!-- <div class="col-md-2 col-0"></div> -->
      <div class="col-12">
        <!-- <div class="card w-100"> -->
        <!-- <div class="card-body"> -->
        <!-- <b-card> -->
        <div class>
          <b-form @submit.prevent="onSubmit">
            <b-form-group id="input-group-1" label="Bestilling:">
              <b-form-textarea
                id="textarea"
                v-model="post.text"
                placeholder="Skriv din bestilling her."
                required
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Epostadresse:"
              label-for="input-2"
              description="Vi varsler på din epost når noen tilbyr seg å hjelpe!"
            >
              <b-form-input id="input-2" type="email" readonly :placeholder="activeUser.email"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Navn:" label-for="input-3">
              <b-form-input
                id="input-3"
                v-model="post.name"
                required
                placeholder="Ditt navn, slik det vises i bestillingen."
              ></b-form-input>
            </b-form-group>

            <!-- [{ id: 1, name: 'Option 1'}, { id: 2, name: 'Option 2'}] -->
            <div class="mb-3">
              <vue-dropdown
                style="font-size: 1.3rem"
                :options="this.addressDropdown"
                v-on:selected="triggerGetLocationOfAddress($event)"
                v-on:filter="triggerGetDropdownList($event)"
                :disabled="false"
                :maxItem="10"
                placeholder="Legg inn leveringsadresse"
              ></vue-dropdown>
              <small>© Kartverket</small>
            </div>
            <!-- name="adresse" -->

            <!-- <b-form-group id="input-group-3" label="Lokasjon:" label-for="input-4">
                <b-form-input
                  id="input-4"
                  v-model="searchParam"
                  required
                  placeholder="Angi leveringsadresse!"
                ></b-form-input>
                <button
                  @click="searchAdress()"
                  type="button"
                  class="btn btn-primary"
                >Søk på addresse</button>
            </b-form-group>-->
            <!-- <b-form-group id="input-group-4" label="Telefon:" label-for="input-4">
          <b-form-input id="input-4" v-model="post.tlf" required placeholder="Ditt telefonnummer, slik at hjelpere kan kontakte deg."></b-form-input>
            </b-form-group>-->

            <b-form-group
              id="input-group-5"
              label="Tips:"
              label-for="input-5"
              description="Et lite beløp til hjelperen blir ofte satt pris på!"
            >
              <b-form-input id="input-5" v-model="post.tips" type="number" placeholder="Tips?"></b-form-input>
            </b-form-group>
            <div class="text-right">
              <!-- <b-button type="reset" variant="secondary">Tøm skjema</b-button> -->
              <b-button class="ml-2" type="submit" variant="secondary">Publiser!</b-button>
            </div>
          </b-form>
          <!-- <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ post }}</pre>
          </b-card>-->
        </div>
        <!-- </b-card> -->
      </div>
    </div>
    <!-- <div class="col-md-2 col-0"></div> -->

    <!-- </div> -->
  </div>
</template>

<script>
import { firestore } from "@/firebase/init";
import { mapGetters } from "vuex";
import axios from "axios";
import firebase from "firebase";
import VueDropdown from "vue-simple-search-dropdown";
import geo from "@/firebase/geo";
export default {
  data() {
    return {
      post: {
        name: null,
        tips: 0,
        text: null
      },
      searchParam: "",
      show: true,
      feedback: null,
      addressDropdown: [],
      globalTimeout: null,
      latitude: null,
      longitude: null,
      address: null
    };
  },
  components: {
    VueDropdown
  },
  computed: {
    ...mapGetters(["activeUser"])
  },
  methods: {
    onSubmit() {
      // if (this.post) {
      const loc = geo.point(this.latitude, this.longitude);
      console.log("geofirex location: ", loc);
      // }

      if (this.post.text && this.post.name) {
        const newPost = {
          email: this.activeUser.email,
          name: this.post.name,
          tips: parseInt(this.post.tips, 10),
          text: this.post.text,
          uid: this.activeUser.uid,
          time: new firebase.firestore.Timestamp.now(),
          status: 'free',
          loc,
          address: this.address
        };

        firestore
          .collection("posts")
          .add({
            email: newPost.email,
            name: newPost.name,
            tips: newPost.tips,
            text: newPost.text,
            uid: newPost.uid,
            time: newPost.time,
            status: newPost.status,
            loc: newPost.loc,
            address: newPost.address
          })
          .then(() => {
            console.log("update successful!");
            //successful update of database, add to own posts

            // this.$store.commit("ADD_OWN_POST", newPost); //not necessary, listener gets it
            console.log("emitting complete");
          })
          .catch(err => {
            console.log(err);
            this.$store.commit("SET_ERROR", err);
          });
      }
      this.$emit("complete");
      // this.$router.push({ name: "myposts" });
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.post.email = "";
      this.post.name = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },

    triggerGetDropdownList(value) {
      //only trigger api request after waiting for x ms
      if (value) {
        this.delay(value);
      }
    },
    triggerGetLocationOfAddress(value) {
      if (value) {
        this.getLocationOfAddress(value);
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
        // alert('timeout reached!')}, 1000)

        // let timer = 0
        // return () => {
        //   clearTimeout(timer)
        //   timer = setTimeout(() => {alert("search executed!")}, 3000)
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
      // this.addressDropdown = array;
      console.log("addressedata: ", this.addressDropdown);
      this.addressDropdown = [];
      array.forEach(item => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        // postArray.push(doc.data())
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
        this.address = value.name;
        console.log("this.address: ", this.address);
        this.latitude = value.id.representasjonspunkt.lat;
        this.longitude = value.id.representasjonspunkt.lon;
        console.log("latitude og longitude: ", this.latitude, this.longitude);
      }
    }
  }
};
</script>

<style scoped>
</style>