<template>
  <div class="client" style="background-color:#fff;">
    <Carousel id="trangchu" />
    <v-container>
      <router-view></router-view>  
    </v-container>
    <Footer />
    <div>
      <v-btn class="btnGoHome" fab small flat outline color="cyan" @click="goToTC()"><v-icon color="cyan">fas fa-angle-double-up</v-icon></v-btn>
    </div>
  </div>
</template>
<script>
import Carousel from './core/Client/Carousel.vue'
import Footer from './core/Client/Footer.vue'
export default {
  components: {
    Carousel,
    Footer
  },
  data() {
    return {
    }
  },
  methods: {
    goToTC () {
      this.$vuetify.goTo("#trangchu",{duration:1000,offset:100,easing:'easeInQuint'})
    }
  },
}
</script>

<style scoped>
  .btnGoHome {
    position: fixed;
    bottom: 0;
    right: 5px;
  }
  .btnGoHome:hover {
    background: blue !important;
  }
</style>