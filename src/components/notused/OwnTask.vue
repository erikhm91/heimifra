<template>
  <div>
    <div class="card w-100">
      <div class="card-header pb-0">
        <div class="row">
          <span class="col-1">
            <profile-icon></profile-icon>
          </span>
          <h5 class="card-title col-8 text-left">{{post.name}}</h5>
          <h5 class="card-title text-right tips">Tips: {{post.tips}}</h5>
        </div>
      </div>
      <div class="card-body">
        <p class="card-text">{{post.text}}</p>
        <div v-if="post.hjelp ==true" class="text-right"></div>
        <button class="btn btn-outline-danger mr-2 btn-sm">Fjern oppdrag</button>
        <slot></slot>
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
  components: {
    profileIcon: ProfileIcon
  }
};
</script>

<style scoped>
.tips {
  position: absolute;
  left: 82%;
  top: 8%;
  z-index: 10;
}
</style>