<template>
  <v-toolbar class="menutop"  flat >
    <v-toolbar-side-icon class="hidden-md-and-up" />
      <v-layout justify-center>
        <!-- <v-btn large dark v-for="(link, i) in links" :key="i" :to="link.path" class=" buttonMenu hidden-sm-and-down" flat  >
          {{ link.name }}
        </v-btn> -->
        <v-btn large  class="buttonMenu" flat  :to="{path:'/login'}">Trang Chủ</v-btn>
        <v-btn large  class="buttonMenu" flat  :to="{path:'/login'}">Giới Thiệu</v-btn>
        <v-img  :src="require('@/assets/Slogan.png')" class="mx-2" contain height="48" width="48" max-width="50"/>        
        <v-btn large  class="buttonMenu" flat  :to="{path:'/login'}">Phòng Trọ</v-btn>
        <v-btn large  class="buttonMenu" flat  :to="{path:'/login'}">Liên Hệ</v-btn>
      </v-layout>
    <v-btn large  class="buttonMenu" flat  :to="{path:'/login'}">Đăng Nhập</v-btn>
  </v-toolbar>
</template>

<script>
export default {
  data () {
    return {
      links: [
        {name: 'Trang Chủ', path:'/quan-ly-giao-vien.html'},
        {name: 'Giới Thiệu', path:'/quan-ly-giao-vien.html'},
        {name: 'Phòng Trọ', path:'/quan-ly-giao-vien.html'},
        {name: 'Tin Tức', path:'/quan-ly-giao-vien.html'}
      ]
    }
  }
}
</script>
<style scoped>
  .menutop {
    background: rgba(0,0, 0,.8);
    height: 80px;
    padding-top:10px;
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
