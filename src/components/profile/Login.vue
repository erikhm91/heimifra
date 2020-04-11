<template>
  <div>
    <b-card style="max-width: 35rem;">
      <b-card-text>
        <p>Heimifra er skapt for å gjøre din hverdag enklere - enten du ønsker varer eller tjenester levert rett på døren, eller vil tjene noen kroner på å hjelpe andre!</p>
        <p>
          <b>Alle kan trenge en hjelpende hånd!</b>
        </p>
      </b-card-text>

      <b-form @submit.prevent="login()">
        <!-- label="Epostadresse:" -->
        <b-form-group id="input-group-2" label-for="input-2">
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
          <!-- <label for="text-password">Passord</label> -->
          <b-input
          v-on:keyup.enter="login"
            v-model="password"
            type="password"
            id="text-password"
            aria-describedby="password-help-block"
            required
            placeholder="Angi passord."
          ></b-input>
          <!-- <b-form-text id="password-help-block">Ditt passord må være 8-20 tegn langt.</b-form-text> -->
        </b-form>
        <div class>
          <p class="text-danger">{{ feedback }}</p>
        </div>
        <div class="row ml-1 mb-2 mt-4">
          <div>
            <!-- <b-button type="reset" variant="secondary">Tøm skjema</b-button> -->
            <b-button class="" type="submit" variant="primary">Logg inn!</b-button>
          </div>
          <div class="col">
              <small class="text-muted leadtext">Mangler du brukerkonto?</small>
              <button id="newaccountbtn" @click="signup" class="btn btn-secondary">Opprette konto</button>
            
          </div>
        </div>
      </b-form>
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
        console.log("logging in!")
        this.$store.commit('SET_API_READY', false)
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            console.log(cred.user);
            this.$store.commit("SET_LOGGED_IN", true);
            this.$store.commit("SET_USER", cred.user);
            this.$store.commit('SET_API_READY', true)
            // this.$store.commit("SET_ACTIVE_UID", cred.user.uid);
            // this.$store.commit("SET_ACTIVE_EMAIL", cred.user.email);

            this.$router.push({ name: "home" });
          })
          .catch(err => {
            console.log('error occurred during login!', err.message)
            this.feedback = err.message;
            this.$store.commit('SET_API_READY', true)
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

<style scoped>
  .leadtext {
    position: absolute;
    top: -1.2rem;
  }
</style>