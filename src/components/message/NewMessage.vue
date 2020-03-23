<template>
  <div>
<!-- 
      <div class="row">
          <div class="col-10"> -->
              <b-form inline>
    <b-form-textarea
          id="textarea"
          placeholder="Skriv ditt svar her"
          rows="1"
          max-rows="1"
    ></b-form-textarea>
<b-button variant="primary">Save</b-button>
</b-form>

<!-- </div> -->
    <!-- <div class="form-group"> -->
      <!-- <label for="exampleFormControlTextarea1"></label> -->
      <!-- <textarea class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea> -->
    <!-- </div> -->
    <!-- <div class="col-2"></div>
        <button class="btn btn-primary"></button>
    
    </div> -->
  </div>
</template>

<script>
export default {
  name: "NewMessage",
  props: ["name"],
  data() {
    return {
      newMessage: null
    };
  },
  methods: {
    addMessage() {
      if (this.newMessage) {
        //
      } else {
        //
      }
    }
  }
};
</script>

<style scoped>
</style>