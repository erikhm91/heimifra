<template>
  <div>
    <div class="">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
         
         <b-form-group
          id="input-group-1"
          label="Bestilling:"
        > 
         <b-form-textarea
          id="textarea"
          v-model="post.text"
          placeholder="Skriv din bestilling her..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
         </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Epostadresse:"
          label-for="input-2"
          description="Vi varsler på din epost når noen tilbyr seg å hjelpe."
        >
          <b-form-input
            id="input-2"
            v-model="post.email"
            type="email"
            required
            placeholder="Angi epostadresse"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Navn:" label-for="input-3">
          <b-form-input id="input-3" v-model="post.name" required placeholder="Ditt navn, som vises på posten."></b-form-input>
        </b-form-group>
         <!-- <b-form-group id="input-group-4" label="Telefon:" label-for="input-4">
          <b-form-input id="input-4" v-model="post.tlf" required placeholder="Ditt telefonnummer, slik at hjelpere kan kontakte deg."></b-form-input>
        </b-form-group> -->

       
          <b-form-group id="input-group-5" label="Tips:" label-for="input-5"
          description="Et lite beløp til hjelperen blir ofte satt pris på!"
          >
          <b-form-input
            id="input-5"
            v-model="post.tips"
            type="number"
            placeholder="Tips?"
          ></b-form-input>
          </b-form-group>

        <b-button type="submit" variant="primary">Publiser!</b-button>
        <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
      </b-form>
      <!-- <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ post }}</pre>
      </b-card> -->
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init';
export default {
  data() {
    return {
      post: {
        email: '',
        name: '',
        // tlf: '',
        tips: 0,
        text: ''
      },
      show: true,
      feedback: null
    };
  },
  methods: {
    onSubmit() {
          
      if (this.post) {
        db.collection('posts').add({
          email: this.post.email,
          name: this.post.name,
          tips: this.post.tips,
          text: this.post.text,
          timestamp: Date.now()
        }).catch(err => {
          console.log(err)
        })
      }

      this.$store.commit('ADD_OWN_POST', this.post);
      this.$store.commit('SET_ACTIVE_VIEW', 'personal-posts');

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