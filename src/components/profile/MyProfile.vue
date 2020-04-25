<template>
  <div>
    <div v-if="activeUser == null">
      <!-- prompt to register new user or login -->
      Logg inn for å vise denne siden.
    </div>

    <div v-else>
      <!-- manage profile -->
    </div>

    <div class="row">
      <!-- <div class="col-md-2 col-0"></div> -->
      <div class="col-md-8 offset-md-2 col-12">
        <!-- <div class="card w-100"> -->
        <!-- <div class="card-body"> -->

        <!-- @submit="save" -->
        <b-card style="max-width: 35rem;">
          <b-form>
            <b-form-group id="input-group-2" label="Epostadresse:" label-for="input-2">
              <b-form-input readonly id="input-2" :placeholder="activeUser.email" type="email"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Navn:" label-for="input-3">
              <b-form-input
                id="input-3"
                v-model="name"
                required
                placeholder="Ditt navn, slik det skal vises for andre."
              ></b-form-input>
            </b-form-group>
            <!-- <b-form-group id="input-group-4" label="Telefon:" label-for="input-4">
          <b-form-input id="input-4" v-model="post.tlf" required placeholder="Ditt telefonnummer, slik at hjelpere kan kontakte deg."></b-form-input>
            </b-form-group>-->

            <b-form-group id="input-group-1" label="Om meg:">
              <b-form-textarea
                id="textarea"
                v-model="bio"
                placeholder="Her kan du skrive noen ord om deg selv!"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>

            <!-- <b-form-group
              id="input-group-5"
              label="Tips:"
              label-for="input-5"
              description="Et lite beløp til hjelperen blir ofte satt pris på!"
            >
              <b-form-input id="input-5" v-model="post.tips" type="number" placeholder="Tips?"></b-form-input>
            </b-form-group>-->

            <div class="col text-right">
              <!-- <b-button type="reset" variant="secondary">Tøm skjema</b-button> -->
              <button @click="updateProfile()" class="btn btn-primary" type="button">Lagre</button>
            </div>
            <div class="col">
              <button type="button" @click="logout" class="btn btn-outline-secondary">Logg ut</button>
            </div>
          </b-form>
        </b-card>

        <!-- <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ post }}</pre>
        </b-card>-->
      </div>
    </div>
    <div v-if="feedback">{{feedback}}</div>
    <!-- <div class="col-md-2 col-0"></div> -->

    <!-- </div> -->
  </div>
</template>

<script>
import firebase from "firebase";
// import db from "@/firebase/init";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      name: null,
      bio: null,
      feedback: null
    };
  },
  async created() {
    //TODO: fetch additional user data!
    console.log("created started, activeuser:", this.activeUser);
    if (this.activeUser.name) {
      console.log("no need to call api");
      this.setProfileAttributes();
    } else {
      console.log("calling api to fetch user");
      // this.$store.commit("SET_API_READY", false);
      let promise = this.fetchOwnUser();
      await promise;
      this.setProfileAttributes();
    }
  },
  computed: {
    ...mapGetters(['activeUser', 'apiReady'])
  },
  methods: {
    ...mapActions(['fetchOwnUser', 'updateUserInfo']),
    

    updateProfile() {
      if ( this.activeUser.name != null) {
      const payload = {
        uid : this.activeUser.uid,
        name : this.name,
        bio : this.bio
      }
      this.updateUserInfo(payload)
      this.feedback = 'Din profil er oppdatert.'
      } else {
        this.feedback = 'Noe gikk galt, vennligst prøv igjen.'
      }
      
    },

    setProfileAttributes() {
      //copy user object from getters and set parameters in profile
      const userCopy = this.activeUser;
      console.log("userCopy: ", userCopy);
      // if (this.name) {
      this.name = userCopy.name;
      // }
      // if (this.bio) {
      this.bio = userCopy.bio;
      // }
    },

    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit("SET_LOGGED_IN", false);
          this.$router.push({
            name: "login"
          });
        });
    }
  }
};
</script>

<style scoped>
</style>