<template>
  <div class="client" style="background-color:#fff; display: flex; flex: 1 1 auto; flex-direction: column">
      <v-content  style="display: flex; flex: 1 1 auto;" >
      <router-view></router-view>  
    </v-content>
      <Footer style="display: flex; flex: 0 0 auto;" />
  </div>
</template>
<script>

import Footer from './core/Client/Footer.vue'
export default {
  components: {
    Footer
  },
  data() {
    return {
    }
  },
  created() {
    if(this.$route.path === "/") {
      this.$router.push({path:'/welcome.html'})
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>

</style>