<template>
  <div class="client">
    <Carousel />
    <v-container>
      <router-view></router-view>  
    </v-container>
  </div>
</template>
<script>
import Carousel from './core/Client/Carousel.vue'
export default {
  components: {
    Carousel
  }
}
</script>