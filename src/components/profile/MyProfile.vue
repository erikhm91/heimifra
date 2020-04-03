<template>
  <div>
    <div v-if="$store.activeUser == null">
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
        <b-form> 
          <b-form-group
            id="input-group-2"
            label="Epostadresse:"
            label-for="input-2"
          >
            <b-form-input
            readonly
              id="input-2"
             :placeholder="$store.getters.activeUser.email"
              type="email"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Navn:" label-for="input-3">
            <b-form-input
              id="input-3"
             
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
          <div class="text-right">
            <!-- <b-button type="reset" variant="secondary">Tøm skjema</b-button> -->
            <b-button class="ml-2" type="submit" variant="primary">Lagre</b-button>
          </div>
        </b-form>

        <div>
          <button @click="logout" class="btn btn-outline-secondary">Logg ut</button>
        </div>

        <!-- <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ post }}</pre>
        </b-card>-->
      </div>
    </div>
    <!-- <div class="col-md-2 col-0"></div> -->

    <!-- </div> -->
  </div>
</template>

<script>
import firebase from 'firebase'
// import db from "@/firebase/init";
export default {
  data() {
    return {
      profile: {
        name: null,
        email: null
      },
      dbDisabled: true
    };
  },
  created() {
    //TODO: fetch additional user data!
  },
  mounted() {
    //set email etc from userbundleRenderer.renderToStream
    console.log(this.activeUser);
    // this.profile.name = this.activeUser.uid;
    // this.profile.email = this.activeUser.email;
  },

  computed: {
    activeUser() {
      return this.$store.getters.activeUser;
    }
  },
  methods: {
    // onSubmit() {
    //   if (this.post && this.dbDisabled === false) {
    //     db.collection("posts")
    //       .add({
    //         email: this.post.email,
    //         name: this.post.name,
    //         tips: this.post.tips,
    //         text: this.post.text,
    //         timestamp: Date.now()
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //   }
    //   this.$store.commit("ADD_OWN_POST", this.post);
    // },

    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit('SET_LOGGED_IN', false)
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