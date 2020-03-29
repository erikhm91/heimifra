<template>
  <div>
    <button v-b-modal="postid"  class="btn btn-outline-danger mr-2 btn-sm">Slett</button>

              <b-modal
                :id="postid"
                :title="'Bekreft sletting'"
                :ok-title="'Slett'"
                cancel-title="Avbryt"
                centered
                @ok="deletePost(postid)"
              >
                Er du sikker på at du vil slette denne listen?
              </b-modal>


  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ['postid'],
  methods: {
    ...mapActions(["deletePost"])
  }
};
</script>
