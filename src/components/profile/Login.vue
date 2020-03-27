<template>
  <div>

    <b-card>
    <b-form @submit="login">
      <b-form-group id="input-group-2" label="Epostadresse:" label-for="input-2">
        <!-- description="Vi deler ikke eposten din med andre." -->
        <b-form-input
          id="input-2"
          v-model="email"
          type="email"
          required
          placeholder="Angi epostadresse."
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
          placeholder="Angi passord."
        ></b-input>
        <!-- <b-form-text id="password-help-block">Ditt passord må være 8-20 tegn langt.</b-form-text> -->
      </b-form>

      <div class="">
        <p class="text-danger">{{ feedback }}</p>
        <!-- <b-button type="reset" variant="secondary">Tøm skjema</b-button> -->
        <b-button class="mb-2" type="submit" variant="primary">Logg inn!</b-button>
      </div>
    </b-form>

    <div>
      <small class="text-muted">Mangler du brukerkonto?</small>
    </div>
    <button @click="signup" class="btn btn-secondary">Opprette ny konto</button>
  </b-card>
  </div>

</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      email: null,
      password: null,
      feedback: null
    };
  },
  methods: {
    login() {
      if (this.email && this.password) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            console.log(cred.user);
            this.$store.commit('SET_USER', cred.user)
            this.$store.commit('SET_ACTIVE_UID', cred.user.uid)
            this.$store.commit('SET_ACTIVE_EMAIL', cred.user.email)
            this.$store.commit('SET_LOGGED_IN', true)

            this.$router.push({ name: 'home' })
          })
          .catch(err => {
            this.feedback = err.message;
          });
      } else {
        this.feedback = "Angi epost og passord for å logge inn!";
      }
    },
    signup() {
      this.$router.push({
        name: "signup"
      });
    }
  }
};
</script>