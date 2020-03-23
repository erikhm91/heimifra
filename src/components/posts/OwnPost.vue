<template>
  <div>
    <!-- <b-card border-variant="light" header="post.name" class="text-center">
      <b-card-text>{{post.text}}</b-card-text>
      <p>Epost: {{post.email}}</p>
    <p>Tlf: {{post.tlf}}</p>-->
    <!-- <p>Tips: {{post.tips}}</p>
      <div class="text-right">
        <button class="btn btn-primary">La meg hjelpe!</button>
      </div>
    </b-card>-->

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
        <div v-if="post.hjelp ==true" class="text-right">
          <b-dropdown
            id="dropdown-dropright"
            dropright
            text="Hjelpere har kontaktet deg!"
            variant="primary"
            class="m-2"
          >
            <b-dropdown-item v-b-modal="'modal1'" href="#">Erik Houge Mathisen</b-dropdown-item>
            <b-dropdown-item v-b-modal="'modal2'" href="#">Malene Grøvdal Midtun</b-dropdown-item>
          </b-dropdown>
         
          <b-modal :id="'modal1'" :title="'Modal'" :ok-title="'Velg '+this.$store.getters.user('erikhm10').name.split(' ')[0]+'!'" cancel-title="Avbryt" centered>
            <other-bio :post="{ 'name': this.$store.getters.user('erikhm10').name,
                                 'email': this.$store.getters.user('erikhm10').email,
                                 'tlf': this.$store.getters.user('erikhm10').tlf,
                                 'uid': 'erikhm10' }"></other-bio>
          </b-modal>
          <b-modal :id="'modal2'" :title="'Modal'" :ok-title="'Velg '+this.$store.getters.user('mallemus').name.split(' ')[0]+'!'"  cancel-title="Avbryt" centered>
                        <other-bio :post="{ 'name': this.$store.getters.user('mallemus').name,
                                 'email': this.$store.getters.user('mallemus').email,
                                 'tlf': this.$store.getters.user('mallemus').tlf,
                                 'uid': 'mallemus' }"></other-bio>
          </b-modal>

        </div>
        <button class="btn btn-outline-danger mr-2 btn-sm">Slett</button>
        <button v-if="post.hjelp ==false" v-b-modal="'changePost'+post.id" class="btn btn-outline-warning btn-sm">Endre</button>

          <b-modal :id="'changePost'+post.id" :title="'Endre handleliste'" hide-footer centered>
            <post-change :postProp="post"></post-change>
          </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileIcon from "@/components/icons/ProfileIcon.vue";
import OtherBio from "@/components/bio/OtherBio.vue";
import PostChange from "@/components/posts/PostChange.vue";
export default {
  props: {
    postProp: {
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
  data() {
    return {
      post: {...this.postProp}
   }
  },
  methods: {
    // deepClone(postObj) {
    //   return JSON.parse(JSON.stringify(postObj));
    // }
  },
  components: {
    ProfileIcon,
    OtherBio,
    PostChange
  }
};
</script>

<style scoped>
</style>