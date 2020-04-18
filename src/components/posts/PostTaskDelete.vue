<template>
  <div>
    <button v-b-modal="postid+'del'" class="btn mr-2 btn-sm"><icon-delete width="1.2rem" height="1.2rem"></icon-delete></button>

              <b-modal
                :id="postid+'del'"
                :title="'Bekreft sletting'"
                :ok-title="'Slett'"
                cancel-title="Avbryt"
                centered
                @ok="removeTask({
                  postid: postid})"
              >
                Er du sikker på at du vil fjerne dette oppdraget?
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
    ...mapActions(["removeTask"]),
  }
};
</script>
