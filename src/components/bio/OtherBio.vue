<template>
  <div>
    <!--   
    <div class="row">
      <div class="col-7 pt-1">
        <h5>{{post.name}}</h5>
      </div>
      <div class="col-5">
        <star-rating :item-size="30" :border-width="0" :show-rating="false" v-model="rating"></star-rating>
      </div>

      <div class="row">
        <div class="col-4">
          <img
            class="rounded-circle"
            src="http://4.bp.blogspot.com/-NaYRwh726LI/Vbphl3FcByI/AAAAAAAABxY/Qv76XwJfVZM/s320/IMG_20150730_172617.jpg"
            width="100%"
            alt
          />
        </div>

        <div class="col-8">
          <div class="d-flex flex-column mb-3">
            <div class>Nedre Meierbakken 19, 0378 Oslo</div>
            <div v-if="post.email" class>{{post.email}}</div>
            <div v-if="post.tlf" class>Tlf: {{post.tlf}}</div>
          </div>
        </div>
      </div>
    </div>-->

    <div class="card mb-3" style="max-width: 540px;">
      <div class="row no-gutters">
        <div class="col-md-3">
          <img @click="testLink()"
            :src="$store.getters.user(this.post.uid).pic"
            class="card-img rounded-circle border m-2 p-2"
            alt="..."
          />
        </div>
        <div class="col-md-9">
          <div class="card-body">
            <div class="row">
              <div class="col-7">
                <h5 class="card-title">{{post.name}}</h5>
              </div>

              <div class="col-5">
                <div class="card-title">
                  <star-rating
                    :item-size="23"
                    :border-width="0"
                    :show-rating="false"
                    v-model="rating"
                    :read-only="true"
                  ></star-rating>
                </div>
              </div>
            </div>
       
                   <div class="d-flex flex-column mb-3">
                        <div class>Nedre Meierbakken 19, 0378 Oslo</div>
                        <div v-if="post.email" class>{{post.email}}</div>
                        <div v-if="post.tlf" class>Tlf: {{post.tlf}}</div>
                   </div>
              
              
              <small class="text-muted">{{post.name.split(' ')[0]}} har fullført 12 handler i HomeStore.</small>
           
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { StarRating } from "vue-rate-it";
export default {
  props: ['post'],
  data() {
    return {
    //   rating: 3
    };
  },
  created() {
      console.log('post:' + this.post)
  },
  computed: {
    //   pic() {
    //       return this.$store.getters.user(this.post.uid).pic
    //   }
    rating() {
        let rate = this.$store.getters.user(this.post.uid).rate;
        if (rate != null) {
            return rate
        } else {
            return 0;
        }
    }
  },
  components: {
    StarRating
  },
  methods: {
      testLink(){
          console.log(this.post.uid);
          console.log(this.$store.getters.users)
          console.log(this.$store.getters.user(this.post.uid).pic)
          console.log(this.pic)
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>