<template>
  <div>

    <div>
  <b-navbar class="fixed-top" toggleable="lg" type="dark" variant="info">
    <b-navbar-brand @click="navigateToComponent('message-container')" href="#">HomeStore</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item @click="navigateToComponent('post-creator')" :class="{ active: $store.getters.activeView == 'post-creator'}" href="#">Opprett handleliste!</b-nav-item>
        <b-nav-item @click="navigateToComponent('my-page')" :class="{ active: $store.getters.activeView == 'my-page'}" href="#">Min side</b-nav-item>
        <b-nav-item @click="navigateToComponent('about-us')" :class="{ active: $store.getters.activeView == 'about-us'}" href="#">Om oss</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Søk"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Søk</b-button>
        </b-nav-form>


        <!-- <b-nav-item-dropdown right>
           Using 'button-content' slot -->
          <!-- <template v-slot:button-content>
            <em>Min profil</em>
          </template>
          <b-dropdown-item href="#">Innstillinger</b-dropdown-item>
          <b-dropdown-item href="#">Logg ut</b-dropdown-item>
        </b-nav-item-dropdown> -->
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
    </div>

  </div>
</template>
<script>
export default {
  methods: {
    navigateToComponent(component) {
      // this.$emit("component", component);
      this.$store.commit('SET_ACTIVE_VIEW', component);
    }
  }

};
</script>

<style scoped>
</style>