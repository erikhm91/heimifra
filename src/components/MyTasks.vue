<template>
<div>
<!-- 
    <div class="text-center">
    <h1>Her vises dine egne lister</h1>
    </div> -->


    <div class="row mt-3">
      <div class="col-md-3 col-1"></div>

      <div class="col-md-6 col-10">
        <b-card-group deck>
          <own-task class="col-12 mt-3 clickable" @click="showChat(post)" v-for="(post, i) in postArray" v-bind:key="i" :post="post"></own-task>
        </b-card-group>
      </div>

      <div class="col-md-3 col-1"></div>
      <!-- <div class="col-6">Chat</div> -->
    </div>

    </div>
</template>

<script>
import OwnTask from "@/components/posts/OwnTask.vue";
export default {
  data() {
    return {
      postArray: this.$store.getters.myTasks
    };
  },
  components: {
    ownTask: OwnTask
  },
  methods: {
    showChat(post){
      //use post
      console.log(post)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.border {
  border-right: 3px solid black;
}

.clickable {
  cursor: pointer;
}
</style>