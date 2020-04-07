<template>
  <div>
    <button v-b-modal="postid+'complete'"  class="btn btn-outline-primary mr-2 btn-sm">Fullført!</button>

              <b-modal
                :id="postid+'complete'"
                :title="'Bekreft fullført'"
                :ok-title="'Fullført'"
                cancel-title="Avbryt"
                centered
                @ok="updatePostStatus({
                  postid: postid,
                  status: 'fin'})"
              >
                Har denne handelen blitt fullført? Er tjenesten levert og penger overført?
              </b-modal>


  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ['postid'],
  methods: {
    ...mapActions(["updatePostStatus"])
  }
};
</script>
