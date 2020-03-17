<template>
  <div class="container mt-4">
    <b-card-group deck class="row">
      <div class="col-6 mt-2 button">
      <b-card border-variant="light" header="Light" class="text-center">
        <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
      </b-card>
    </div>
    <div class="col-6 mt-2">
      <b-card border-variant="dark" header="Dark" align="center">
        <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
      </b-card>
      </div>
    </b-card-group>
  </div>
</template>

<script>
export default {};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outline {
  outline: black solid 1px;
}
</style>
