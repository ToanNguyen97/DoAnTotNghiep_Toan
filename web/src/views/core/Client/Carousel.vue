<template>
  <div >
    <v-img style="height:100vh;" :src="require('@/assets/banner.jpg')">
      <MenuTop />
    </v-img>
  </div>
</template>

<script>
import MenuTop from './MenuTop.vue'
export default {
  components: {
    MenuTop
  },
  data () {
    return {
      items: [
        {
          src: require('@/assets/slide/banner6.png')          
        },
        {
          src:require('@/assets/slide/banner5.png')    
        },
        {
          src:require('@/assets/slide/banner7.png')     
        },
        {
          src:require('@/assets/slide/bannerr.png')       
        }
      ]
    }
  }
}
</script>

<style scoped >
</style>