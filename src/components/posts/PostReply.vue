<template>
  <div> 
      
        <b-form-textarea
          id="textarea"
          placeholder="Skriv ditt svar her"
          rows="3"
          max-rows="6"
        ></b-form-textarea>
        <p></p>
        <p>{{post.name}} tilbyr {{post.tips}} kr som en ekstra takk for hjelpen. Dette beløpet skal legges til beløpet fra kvitteringene, og betales samlet ut til deg som hjelper. Tips kan ikke forhandles på. Ved å trykke send godtar du disse betingelsene og er klar til å hjelpe {{post.name.split(' ')[0]}}!</p>

        <other-bio :post="post"></other-bio>

  
  </div>
</template>

<script>
import OtherBio from "@/components/bio/OtherBio.vue";
export default {
    props: ['post'],
    components: {
      otherBio : OtherBio
    }
};
</script>

<style scoped>
</style>