<template>
  <div class="admin" >
    <Toolbar @input="input"/>
    <v-content class="ml-4" style="padding: 70px 0px 0px 70px;" :class="!mini ? 'padding-left-300' : ''">
      <router-view></router-view>  
    </v-content>
    <v-content class="ml-4" style="padding: 70px 0px 0px 70px;" :class="!mini ? 'padding-left-300' : ''">
       <Footer />
    </v-content>
  </div>
</template>

<style>
  .padding-left-300 {
    padding-left: 240px !important;
  }
</style>


<script>
import Toolbar from'@/views/core/Admin/Toolbar.vue'
import Footer from'@/views/core/Admin/Footer.vue'
export default {
  components: {  
    Toolbar,
    Footer
  },
  data: () => ({
    mini: true
  }),
  methods: {
    input (data) {
      this.mini = data
    }
  }
}
</script>
