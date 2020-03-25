<template>
  <div>

    <div class="card w-100 bg-warning">
        <div class="card-header pb-0 outline">
        <div class="row">
            <span class="col-1">
            <profile-icon></profile-icon>
          </span>
          <h5 class="card-title col-md-10 col-9 text-left">{{post.name}}</h5>
          <h5 class="card-title text-right textcolor">{{post.tips}},-</h5>
        </div>
      </div>
      <div class="card-body">       
        <p class="card-text">{{post.text}}</p>
        <div v-if="post.taken===true" class="text-right">
          <a href="#" class="btn btn-primary disabled">Jeg får hjelp</a>
        </div>
        <div v-else class="text-right">
          <a href="#" class="btn btn-outline-primary" v-b-modal="'modal'+post.id">La meg hjelpe!</a>
        </div>


          <!-- Modal handled inside post-reply -->
          <post-reply :post="post"></post-reply>
        
        
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
  components: {
    postReply: PostReply,
    profileIcon: ProfileIcon
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";
.outline {
  border: solid 0.1rem $primary;
}

.textcolor {
  color: $secondary;
}

// .tips {
//   position: absolute;
//   left: 68%;
//   top: 8%;
//   z-index: 10;
// }

</style>