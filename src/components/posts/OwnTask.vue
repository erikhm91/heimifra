<template>
  <div>
    <!-- <b-card border-variant="light" header="post.name" class="text-center">
      <b-card-text>{{post.text}}</b-card-text>
      <p>Epost: {{post.email}}</p>
    <p>Tlf: {{post.tlf}}</p>-->
    <!-- <p>Tips: {{post.tips}}</p>
      <div class="text-right">
        <button class="btn btn-primary">La meg hjelpe!</button>
      </div>
    </b-card>-->

    <div class="card w-100">
      <div class="card-header pb-0">
        <div class="row">
          <span class="col-1">
            <profile-icon></profile-icon>
          </span>
          <h5 class="card-title col-6 text-left">{{post.name}}</h5>
          <h5 class="card-title col-5 text-right">Tips: {{post.tips}}</h5>
        </div>
      </div>
      <div class="card-body">
        <p class="card-text">{{post.text}}</p>
        <div v-if="post.hjelp ==true" class="text-right">
          <b-dropdown
            id="dropdown-dropright"
            dropright
            text="Hjelpere har kontaktet deg!"
            variant="primary"
            class="m-2"
          >
            <b-dropdown-item href="#">Erik Houge Mathisen</b-dropdown-item>
            <b-dropdown-item href="#">Amanda Grøvdal Midtun</b-dropdown-item>
            <b-dropdown-item href="#">Malene Grøvdal Midtun</b-dropdown-item>
          </b-dropdown>
        </div>
         <button class="btn btn-outline-danger mr-2 btn-sm">Fjern oppdrag</button>
      </div>
      
    </div>
  </div>
</template>

<script>
import ProfileIcon from "@/components/icons/ProfileIcon.vue";
export default {
  props: {
    post: {
      type: Object,
      required: false
      // post: {
      //   email: '',
      //   name: '',
      //   tlf: '',
      //   tips: 0,
      //   text: ''
    }
  },
  data() {
    return {
      header: "post."
    };
  },
  components: {
    profileIcon: ProfileIcon
  }
};
</script>

<style scoped>
</style>