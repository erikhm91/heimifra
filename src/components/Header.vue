<template>
  <div>

    <div>
  <b-navbar class="fixed-top outline basetext" toggleable="sm" type="light" variant="info">
    <b-navbar-brand :to="{name: 'home'}" href="#" class="p-n2"><hi-logo width="30px"></hi-logo></b-navbar-brand>

  
  <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
  
  <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <!-- <b-nav-item @click="navigateToComponent('post-creator')" :class="{ active: $store.getters.activeView == 'post-creator'}" href="#">Opprett handleliste!</b-nav-item> -->
       
       <!-- @click="navigateToComponent('my-page')" :class="{ active: $store.getters.activeView == 'my-page'}"  -->

       
        <b-nav-item :to="{name: 'home'}" href="#">Hjem</b-nav-item>
        <b-nav-item v-if="$store.getters.activeUser" :to="{name: 'myposts'}" href="#">Mine lister</b-nav-item>
        <b-nav-item v-if="$store.getters.activeUser" :to="{name: 'mytasks'}" href="#">Mine oppdrag</b-nav-item>
        <b-nav-item v-if="$store.getters.activeUser" :to="{name: 'myprofile'}" href="#">Min profil</b-nav-item>
        <b-nav-item v-else :to="{name: 'login'}" href="#">Logg inn</b-nav-item>
      </b-navbar-nav>


      <!-- Right aligned nav items -->
      <b-navbar-nav :to="{name: 'aboutus'}" class="ml-auto">
        <b-nav-item  href="#">Om oss</b-nav-item>
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
import HiLogo from '@/components/icons/Logo.vue'
export default {
  methods: {
    // navigateToComponent(component) {
    //   // this.$emit("component", component);
    //   this.$store.commit('SET_ACTIVE_VIEW', component);
    // }
  },
  components: {
    HiLogo
  }

};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
.outline {
  border: solid 0.1rem $primary;
}
.basetext {
color: $basetext;
}
</style>