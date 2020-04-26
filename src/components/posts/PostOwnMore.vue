<template>
  <div>
    <!-- <button class="btn mr-2 btn-sm"><icon-more width="2rem" height="2rem"></icon-more></button> -->
    <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
      <template v-slot:button-content>
        <icon-more width="2rem" height="2rem"></icon-more>
      </template>
      <b-dropdown-item href="#">
        <PostDelete :postid="postid"></PostDelete>
      </b-dropdown-item>
      <!-- <b-dropdown-item href="#">Another action</b-dropdown-item>
      <b-dropdown-item href="#">Something else here...</b-dropdown-item> -->
    </b-dropdown>
  </div>
</template>

<script>
import IconMore from "@/components/icons/IconMore.vue";
import PostDelete from "@/components/posts/PostDelete.vue";
import { mapActions } from "vuex";
export default {
  props: ["postid"],
  components: {
    IconMore,
    PostDelete
  }
};
</script>
