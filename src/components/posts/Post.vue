<template>
  <div>
    <div class="card w-100 bg-warning">
      <div class="card-header pt-2 pb-0 outline">
        <div class="row">
          <span class="col-1">
            <profile-icon></profile-icon>
          </span>
          <h5 class="mt-1 card-title col-md-10 col-9 text-left">{{post.name}}</h5>
          <h5 class="mt-1 card-title text-right textcolor">{{post.tips}},-</h5>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-9">
            <p class="card-text">{{post.text}}</p>
          </div>
          <div class="col-3">
            <slot></slot>
          </div>
        </div>
        <div class="row">
          <div v-if="(status != 'offer' && view=='ownpost') || view == 'task'" class="col">{{getStatusText}}</div>
          <div v-else-if="status == 'offer' && view=='ownpost'">
            <button
              class="btn btn-primary"
              @click="$emit('pickhelper')"
              type="button"
            >{{numberOfRepliesToPost(post.id)}} {{getStatusText}}</button>
          </div>
       
        </div>
           <div class="" v-if=" view=='ownpost'">
            <small>{{post.address}}</small>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileIcon from "@/components/icons/ProfileIcon.vue";
import { mapGetters } from "vuex";
export default {
  props: {
    view: {
      type: String,
      default: "ownpost" //task
    },
    status: {
      type: String,
      default: ""
    },
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
  computed: {
    ...mapGetters(["numberOfRepliesToPost"]),
    getStatusText() {
      let statustext;
      switch (this.status) {
        case "free":
          statustext = "Venter på at noen skal kontakte";
          break;
        case "offer":
          if (this.view == "task") {
            statustext = "Venter på svar fra eier";
          } else {
            if (this.numberOfRepliesToPost(this.post.id) == "1") {
              statustext = "hjelper har kontaktet deg";
            } else {
              statustext = "hjelpere har kontaktet deg";
            }
          }
          break;
        case "picked":
          statustext = "Hjelper valgt";
          break;
        case "ownerfin":
          if (this.view == "task") {
            statustext = "Eier har avsluttet - trykk her for å vurdere";
          } else {
            statustext = "Venter på at hjelper skal avslutte";
          }
          break;
        case "helpfin":
          if (this.view == "task") {
            statustext = "Venter på at eier skal avslutte";
          } else {
            statustext = "Hjelper har avsluttet - trykk her for å vurdere";
          }
          break;
        case "fin":
          statustext = "Fullført";
          break;
        case "del":
          statustext = "Slettet";
          break;
      }
      return statustext;

      // if (this.status == 'free') {
      //     statustext = 'Venter på at noen skal kontakte'
      // }
    }
  },
  components: {
    profileIcon: ProfileIcon
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
@import "styles/_variables.scss";
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