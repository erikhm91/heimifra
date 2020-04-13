<template>
  <div>
    <button v-b-modal="postid+'del'" class="btn mr-2 btn-sm"><icon-delete width="1.2rem" height="1.2rem"></icon-delete></button>


              <b-modal
                :id="postid+'del'"
                :title="'Bekreft sletting'"
                :ok-title="'Slett'"
                cancel-title="Avbryt"
                centered
                @ok="updatePostStatus({
                  postid: postid,
                  status: 'del'})"
              >
                Er du sikker på at du vil slette denne listen?
              </b-modal>
  </div>
</template>

<script>
import IconDelete from '@/components/icons/IconDelete.vue'
import { mapActions } from "vuex";
export default {
  props: ['postid'],
  components: {
    IconDelete
  },
  methods: {
    ...mapActions(["updatePostStatus"]),
    deletetest() {
      console.log("delete triggered")

    }
  }
};
</script>
