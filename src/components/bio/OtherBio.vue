<template>
  <div class="row">
    <!-- 
    <div class="text-center">
    <h1>Her vises dine egne lister</h1>
    </div>-->
    
    <div class="col-7 pt-1">
    <h5>{{post.name}}</h5>
    </div>
    <div class="col-5">
        <star-rating :item-size="30" :border-width="0" :show-rating="false" v-model="rating"></star-rating>
    </div>
   
    <div class="row">
      <div class="col-4">
        <!-- profile pic -->
        <img class="rounded-circle" src="http://4.bp.blogspot.com/-NaYRwh726LI/Vbphl3FcByI/AAAAAAAABxY/Qv76XwJfVZM/s320/IMG_20150730_172617.jpg" width="100%" alt="">
      </div>

     

      <div class="col-8">
        <div class="d-flex flex-column mb-3">
          <div class="">Nedre Meierbakken 19, 0378 Oslo</div>
          <div v-if="post.email" class="">{{post.email}}</div>
          <div v-if="post.tlf" class="">Tlf: {{post.tlf}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {StarRating} from 'vue-rate-it';
export default {
    props: ['post'],
    data() {
        return {
            rating: 0
        
        }
    },
    components: {
        StarRating
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>