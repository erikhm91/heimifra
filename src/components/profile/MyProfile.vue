<template>
  <div>

    <div v-if="$store.activeUser == null">

        <!-- prompt to register new user or login -->
      
    </div>

    <div v-else>

      <!-- manage profile -->


    </div>


    <div class="row">
      <!-- <div class="col-md-2 col-0"></div> -->
      <div class="col-md-8 offset-md-2 col-12">
        <!-- <div class="card w-100"> -->
        <!-- <div class="card-body"> -->

        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group
            id="input-group-2"
            label="Epostadresse:"
            label-for="input-2"
            description="Vi deler ikke eposten din med andre."
          >
            <b-form-input
              id="input-2"
              v-model="profile.email"
              type="email"
              required
              placeholder="Angi epostadresse."
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Navn:" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="profile.name"
              required
              placeholder="Ditt navn, slik det vises i bestillingen."
            ></b-form-input>
          </b-form-group>
          <!-- <b-form-group id="input-group-4" label="Telefon:" label-for="input-4">
          <b-form-input id="input-4" v-model="post.tlf" required placeholder="Ditt telefonnummer, slik at hjelpere kan kontakte deg."></b-form-input>
          </b-form-group>-->

          <b-form-group id="input-group-1" label="Om meg:">
            <b-form-textarea
              id="textarea"
              placeholder="Her kan du skrive noen ord om deg selv"
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
import db from "@/firebase/init";
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
  mounted() {
    //set email etc from userbundleRenderer.renderToStream
    console.log(this.activeUser)
    this.profile.name = this.activeUser.uid
    this.profile.email = this.activeUser.email
  },

  computed: {
    activeUser()  {
      return this.$store.getters.activeUser

      // return  {
      //       "uid": "gunsve",
      //       "email": "gunsve@gmail.com",
      //       "name": "Gunnar Sverresø",
      //       "timestamp": 1584739649039,
      //       "pic": "http://4.bp.blogspot.com/-4GcOwHCRVfI/VcOz7_CjcdI/AAAAAAAAB0I/IOadq2eidAY/s1600/Erik%2Bog%2Bamanda.JPG",
      //       "rate": 4
      //   }
    }
  },
  methods: {
    onSubmit() {
      if (this.post && this.dbDisabled === false) {
        db.collection("posts")
          .add({
            email: this.post.email,
            name: this.post.name,
            tips: this.post.tips,
            text: this.post.text,
            timestamp: Date.now()
          })
          .catch(err => {
            console.log(err);
          });
      }
      this.$store.commit("ADD_OWN_POST", this.post);
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