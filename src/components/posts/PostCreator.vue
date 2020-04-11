<template>
  <div>
    <div class="row">
      <!-- <div class="col-md-2 col-0"></div> -->
      <div class="col-12">
        <!-- <div class="card w-100"> -->
        <!-- <div class="card-body"> -->
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
              <b-form-input
                id="input-2"
                v-model="post.email"
                type="email"
                readonly
                :placeholder="activeUser.email"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Navn:" label-for="input-3">
              <b-form-input
                id="input-3"
                v-model="post.name"
                required
                placeholder="Ditt navn, slik det vises i bestillingen."
              ></b-form-input>
            </b-form-group>
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
              <b-button class="ml-2" type="submit" variant="primary">Publiser!</b-button>
            </div>
          </b-form>
          <!-- <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ post }}</pre>
          </b-card>-->
        </div>
      </div>
    </div>
    <!-- <div class="col-md-2 col-0"></div> -->

    <!-- </div> -->
  </div>
</template>

<script>
import db from "@/firebase/init";
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      post: {
        email: "",
        name: "",
        // tlf: '',
        tips: 0,
        text: ""
      },
      show: true,
      feedback: null,
      dbDisabled: true
    };
  },
  computed: {
    ...mapGetters([
      'activeUser'
    ])
  },
  methods: {
    onSubmit() {
      
      if (this.post) {
        db.collection("posts")
          .add({
            email: this.post.email,
            name: this.post.name,
            tips: this.post.tips,
            text: this.post.text,
            uid: this.activeUser.uid,
            timestamp: Date.now(),
            status: 'free'
          }).then(() => {
            console.log("update successful i guess?")
            //successful update of database, add to own posts
             this.$store.commit('ADD_OWN_POST', this.post)
          })
          .catch(err => {
            console.log(err);
            this.$state.commit("SET_ERROR", err)
          });
      }
      this.$emit('complete')
      // this.$store.commit("ADD_OWN_POST", this.post);
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
    }
  }
};
</script>

<style scoped>
</style>