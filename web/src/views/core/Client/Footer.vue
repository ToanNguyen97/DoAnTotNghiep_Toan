<template>
  <v-footer dark height="auto">
    <v-card class="flex" flat tile>
      <v-card-title class="black">
        <div style="display:flex;flex-direction: column;">
          <strong class="subheading">Phòng trọ sinh viên cô Mai</strong>
          <router-link style="text-decoration:none;" class="pt-2" :to="{path:'/gioithieu.html'}">Giới Thiệu</router-link>
          <router-link style="text-decoration:none;" class="pt-2" :to="{path:'/lienhe.html'}">Liên hệ</router-link>
          <router-link style="text-decoration:none;" class="pt-2" :to="{path:'/phongtro.html'}">Phòng Trọ</router-link>
          <router-link style="text-decoration:none;" class="pt-2" :to="{path:'/noiquy.html'}">Nội Quy</router-link>
        </div>
        <v-spacer></v-spacer>
       <div style="display:flex;flex-direction: column;">
        <div style="text-align:center;">
          <img :src="require('@/assets/dadangky.png')" style="width: 109px;" alt="đã đăng ký">
        </div>
        <div>
          <v-btn class="buttonFb" fab large flat  color="blue"><v-icon color="white" x-large>fab fa-facebook-square</v-icon></v-btn>
          <v-btn class="buttonContact" fab large flat  color="blue"><v-icon color="red" x-large>fab fa-google</v-icon></v-btn>
          <v-btn class="buttonContact" fab large flat  color="blue"><v-icon color="blue" x-large>fab fa-twitter</v-icon></v-btn>
        </div>
        </div>
        <v-spacer></v-spacer>
       <div style="display:flex;flex-direction: column;">
          <strong class="subheading" style="text-align:end">Địa chỉ phòng trọ</strong>
          <span>02 tổ 24 Nguyễn Đình Chiểu, phường Vĩnh Thọ, Nha Trang, Khánh Hòa</span>
          <span style="text-align:end">Chủ trọ: cô Mai</span>
          <span style="text-align:end"><v-icon>phone</v-icon> 0348096333</span>
          <span style="text-align:end"><v-icon>mail</v-icon> toan210597ntu@gmail.com</span>
        </div>
      </v-card-title>
      <v-card-actions class="grey darken-3 justify-center">&copy;2019 —
        <strong>Nguyễn Văn Toàn — 57130724</strong>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
   
  })
};
</script>