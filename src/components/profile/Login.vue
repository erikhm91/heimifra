<template>
  <div>
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
          type="password"
          id="text-password"
          aria-describedby="password-help-block"
          required
          placeholder="Angi passord."
        ></b-input>
        <!-- <b-form-text id="password-help-block">Ditt passord må være 8-20 tegn langt.</b-form-text> -->
      </b-form>

        <div class="text-right">
      <!-- <b-button type="reset" variant="secondary">Tøm skjema</b-button> -->
      <b-button class="mt-2" type="submit" variant="primary">Logg inn!</b-button>
    </div>
    </b-form>
  

    <div>
     <small class="mt-1 text-muted">Mangler du brukerkonto?</small>
    </div>
    <button @click="signup" class="btn btn-secondary">Opprette ny konto</button>



  </div>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    login() {
      console.log("submitted login schema");
      
    },
    signup() {
       this.$router.push({
        name: 'signup' });
    }
  }
};
</script>