<template>
  <v-toolbar class="menutop"  flat >
    <v-toolbar-side-icon class="hidden-md-and-up" />
      <v-layout justify-center>
        <v-btn large  class="buttonMenu" flat  :to="{path:'/'}">Trang Chủ</v-btn>
        <v-btn large  class="buttonMenu" flat @click="goTo()">Giới Thiệu</v-btn>
        <v-img  :src="require('@/assets/Slogan.png')" class="mx-2" contain height="48" width="48" max-width="50"/>        
        <v-btn large  class="buttonMenu" flat @click="goToPT()"  >Phòng Trọ</v-btn>
        <v-btn large  class="buttonMenu" flat @click="goToDV()" >Dịch vụ</v-btn>
      </v-layout>
    <v-btn large  class="buttonMenu" flat  :to="{path:'/login'}">Đăng Nhập</v-btn>
  </v-toolbar>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    goTo () {
      this.$vuetify.goTo("#gioithieu",{duration:1000,offset:100,easing:'easeInQuint'})
    },
    goToPT () {
      this.$vuetify.goTo("#phongtro1",{duration:1000,offset:80,easing:'easeInQuint'})
    },
    goToDV () {
      this.$vuetify.goTo("#dichvu",{duration:1000,offset:85,easing:'easeInQuint'})
    },
  },
}
</script>
<style scoped>
  .menutop {
    background: rgba(0,0, 0,.8);
    height: 80px;
    padding-top:10px;
    position: fixed;
    top:0px;
    width: 100%;
    z-index: 99 !important;
  }

  .buttonMenu {
    margin: 0 20 0 20 !important;
    color: white ;
    text-transform: inherit;
    height: 50px;;
  }

  .buttonMenu:hover {
    background-color: grey;
    color: cyan;
  }
</style>
