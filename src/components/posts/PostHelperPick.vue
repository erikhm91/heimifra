<template>
  <div>
    <button @click="$emit('closePick')" class="btn btn-primary">Tilbake</button>
    <div>Her er PostHelper pick for postid: {{postid}}</div>


    <!-- <div v-for=""></div> -->
  </div>
</template>

<script>
export default {
    props: ['postid'],
  methods: {}
};
</script>