<template>
  <div>
    <!-- 
        <div class="text-center">
        <h1>Her vises dine egne lister</h1>
    </div>-->
    <div class="row justify-content-center">
      <b-card style="max-width: 35rem;">
        <!-- her skal logo stå -->
        <div class="text-center">
          <h-logo width="80px"></h-logo>
          <b-card-text>
            <p>Heimifra er skapt for å gjøre din hverdag enklere - enten du ønsker varer eller tjenester levert rett på døren, eller vil tjene noen kroner på å hjelpe andre!</p>
            <p>
              <b>Alle kan trenge en hjelpende hånd!</b>
            </p>

            <div class="text-left">
              <p>Vi i Heimifra jobber for at du skal få en enklere hverdag. I tillegg får du muligheten til å hjelpe andre!</p>
              <p>Vi oppdaterer siden kontinuerlig for at du skal få den beste kundeopplevelsen.</p>

              <p>Heimifra benytter Kartverkets tjenester for addressesøk. For mer informasjon, se https://kartverket.no/</p>
            </div>
          </b-card-text>
        </div>
      </b-card>
    </div>

    <!-- <div class="row">
            <div class="col-3">
                <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
                <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</a>
                <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</a>
                <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</a>
            </div>
        </div>
            <div class="col-9">
                <div class="tab-content" id="v-pills-tabContent">
                    <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">...</div>
                    <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">...</div>
                    <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
                    <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
                </div>
            </div>
    </div>-->
  </div>
</template>

<script>
import HLogo from "@/components/icons/Logo.vue";
export default {
  components: {
    HLogo
  }
};
</script>

<style scoped>
</style>