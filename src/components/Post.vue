<template>
  <div>
    <b-card border-variant="light" header="Post" class="text-center">
      <b-card-text>{{post.text}}</b-card-text>
      <p>Navn: {{post.name}}</p>
      <p>Epost: {{post.email}}</p>
      <p>Tlf: {{post.tlf}}</p>
      <p>Tips: {{post.tips}}</p>
      <div class="text-right">
          <button class="btn btn-primary">La meg hjelpe!</button>
      </div>
    </b-card>
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
      //   order: '',
    }
  }


};
</script>

<style scoped>
</style>