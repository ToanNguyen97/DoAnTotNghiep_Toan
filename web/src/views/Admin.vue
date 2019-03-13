<template>
  <div class="admin" >
    <Toolbar @input="input"/>
    <v-content class="ml-4" style="padding: 70px 0px 0px 70px;" :class="!mini ? 'padding-left-300' : ''">
      <router-view></router-view>
    </v-content>
  </div>
</template>

<style>
  .padding-left-300 {
    padding-left: 250px !important;
  }
</style>


<script>
import Toolbar from'@/views/core/Admin/Toolbar.vue'
export default {
  components: {  
    Toolbar
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
