<template>
  <div>
    <!-- <b-card border-variant="light" header="post.name" class="text-center">
      <b-card-text>{{post.text}}</b-card-text>
      <p>Epost: {{post.email}}</p>
       <p>Tlf: {{post.tlf}}</p> -->
      <!-- <p>Tips: {{post.tips}}</p>
      <div class="text-right">
        <button class="btn btn-primary">La meg hjelpe!</button>
      </div>
    </b-card> -->

    <div class="card w-100">
      <div class="card-body">
        <div class="row">
          <h5 class="card-title col-6 text-left">{{post.name}}</h5>
          <h5 class="card-title col-6 text-right">Tips: {{post.tips}}</h5>
        </div>
        <p class="card-text">{{post.text}}</p>
        <div v-if="ownPost===false" class="text-right">
          <a href="#" class="btn btn-primary">La meg hjelpe!</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    },
    ownPost : {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      header: "post."
    };
  }
};
</script>

<style scoped>
</style>