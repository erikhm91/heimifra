<template>
  <div>
    <div>
      <b-navbar class="fixed-top outline basetext" toggleable="sm" type="light" variant="warning">
        <b-navbar-brand :to="{name: 'home'}" href="#" class="p-n2">
          <hi-logo width="30px"></hi-logo>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item v-if="$store.getters.isLoggedIn" :to="{name: 'home'}" href="#">Hjem</b-nav-item>
            <b-nav-item
              v-if="$store.getters.isLoggedIn"
              :to="{name: 'myposts'}"
              href="#"
            >Mine lister</b-nav-item>
            <b-nav-item
              v-if="$store.getters.isLoggedIn"
              :to="{name: 'mytasks'}"
              href="#"
            >Mine oppdrag</b-nav-item>
            <b-nav-item
              v-if="$store.getters.isLoggedIn"
              :to="{name: 'myprofile'}"
              href="#"
            >Min profil</b-nav-item>
            <b-nav-item v-if="!$store.getters.isLoggedIn" :to="{name: 'login'}" href="#">Logg inn</b-nav-item>
            <b-nav-item v-if="numberOfUnreadMessages">
              Uleste meldinger:
              <b>{{numberOfUnreadMessages}}</b>
            </b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item :to="{name: 'aboutus'}" href="#">Om oss</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>
<script>
import HiLogo from "@/components/icons/Logo.vue";
import { mapGetters } from "vuex";
export default {
  methods: {
  },
  computed: {
    ...mapGetters(["numberOfUnreadMessages"])
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
  color: $info;
}
</style>