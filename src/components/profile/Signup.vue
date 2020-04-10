<template>
  <div>
    <b-card>
    <b-form @submit="signup">
      <b-form-group
        id="input-group-2"
        label="Epostadresse:"
        label-for="input-2"
        description="Vi deler ikke eposten din utenfor appen!"
      >
        <b-form-input
          id="input-2"
          v-model="email"
          type="email"
          required
          placeholder="Angi epostadressen du skal registrere brukeren med."
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Brukernavn:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="name"
          required
          placeholder="Angi ditt navn eller brukernavn slik det skal vises for andre"
        ></b-form-input>
      </b-form-group>

      <b-form @submit.stop.prevent>
        <label for="text-password">Passord</label>
        <b-input
          v-model="password"
          type="password"
          id="text-password"
          aria-describedby="password-help-block"
          required
          placeholder="Angi ditt passord."
        ></b-input>
        <b-form-text id="password-help-block">Ditt passord må være 8-20 tegn langt.</b-form-text>
      </b-form>
      <div class="mt-2 text-danger">{{feedback}}</div>
      <div class>
        <!-- <b-button type="reset" variant="secondary">Tøm skjema</b-button> -->
        <b-button class="mt-2" type="submit" variant="primary">Opprett bruker</b-button>
      </div>
    </b-form>
    </b-card>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";
export default {
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      name: null,
      feedback: ""
    };
  },

  methods: {
    signup() {
      if (
        this.email &&
        this.password &&
        this.name
      ) {
        //should implement check on if username is available in cloud functions!
        console.log("contacting firebase for signup");

        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(cred => {
              //async reply when registration was successful
            console.log(cred.user);

            //should verify the allowed name params on the user
            let ref = db.collection("users").doc(cred.user.uid);
            ref.set({
              name: this.name,
              email: this.email,
              uid: cred.user.uid,
              cntrate: 0,
              rate: null
            });
            //registration successful, redirect user.
          }).then(() => {

              //set activeUser in store (will see if this is bad practice)
              this.$store.commit('SET_ACTIVE_USER', this.alias)
              this.$router.push({ name: 'home' });
          })
          .catch(err => {
            console.log(err);
            this.feedback = err.message;
          });
      } else {
        console.log("failed signup check");
      }
    }
  }
};
</script>