<template>
  <div class="client" style="background-color:#fff;">
      <router-view></router-view>
    <Footer />
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
      this.$router.push({path:'/index.html'})
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>

</style>