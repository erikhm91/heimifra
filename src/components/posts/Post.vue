<template>
  <div>

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
        <div v-if="post.taken===true" class="text-right">
          <a href="#" class="btn btn-secondary disabled">Jeg får hjelp</a>
        </div>
        <div v-else class="text-right">
          <a href="#" class="btn btn-primary" v-b-modal="'modal'+post.id">La meg hjelpe!</a>
        </div>

          <!-- <b-button v-b-modal.modal-1>Launch demo modal</b-button> -->

         <b-modal @ok="addToOwnTasks(post)" :id="'modal'+post.id" :title="'Hjelp '+post.name+'!'" ok-title="Send" cancel-title="Avbryt" centered>
            <post-reply :post="post"></post-reply>
          </b-modal>
        
      </div>
    </div>
  </div>
</template>

<script>
import PostReply from "@/components/posts/PostReply.vue";
import ProfileIcon from "@/components/icons/ProfileIcon.vue";
export default {
  props: {
    post: {
      type: Object,
      required: false
      // post: {
      // id: '',
      //   email: '',
      //   name: '',
      //   tlf: '',
      //   tips: 0,
      //   text: ''
    },
    chatPreview: {
      type: Boolean,
      default: false
    }
    // taken : {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {

    };
  },
  components: {
    postReply: PostReply,
    profileIcon: ProfileIcon
  },
  methods: {
    addToOwnTasks(post) {
      this.$store.commit("ADD_OWN_TASK", post);
    }
  }
};
</script>

<style scoped>
</style>