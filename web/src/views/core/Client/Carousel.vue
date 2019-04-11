<template>
  <div >
    <v-img style="height:100vh;" :src="require('@/assets/banner2.jpg')"
      gradient="to right top, rgba(17, 17, 17, 0.95), rgba(244, 249, 250, 0)"
      aspect-ratio="1"
      class="cyan"
      >
      <template v-slot:placeholder>
        <v-layout fill-height align-center justify-center ma-0 >
          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
        </v-layout>
      </template>
      <MenuTop/>
      <v-layout row  style="height:400px" >
        <v-flex md7 class="mt-5 align-center justify-center" >
          <div class="textfomat">
            <span class="textbox display-1 font-weight-bold">Phòng trọ sinh viên Cô Mai</span>
          </div>
          <div class="textfomat pt-4">
            <span class="heading font-weight-bold">02 tổ 24 Nguyễn Đình Chiểu, phường Vĩnh Thọ, Nha Trang, Khánh Hòa</span>
          </div>
          <div class="textfomat pt-5">
            <span class="mr-2 textbox display-1 font-weight-bold">An ninh tuyệt đối</span>
            <span class="textbox display-1 font-weight-bold">Thoải mái, thân thiện</span>
          </div>
          <div class="textfomat pt-4">
            <span class="mr-2 textbox display-1 font-weight-bold">Giá cả hợp lý</span>
            <span class="mr-2 textbox display-1 font-weight-bold">Liên hệ: 0348096333</span> 
          </div>
          <div class="textfomat pt-5">
            <v-btn class="buttonFb" fab large flat  color="blue"><v-icon color="white" x-large>fab fa-facebook-square</v-icon></v-btn>
            <v-btn class="buttonContact" fab large flat  color="blue"><v-icon color="red" x-large>fab fa-google</v-icon></v-btn>
            <v-btn class="buttonContact" fab large flat  color="blue"><v-icon color="blue" x-large>fab fa-twitter</v-icon></v-btn>
          </div>
        </v-flex>
                <v-flex md5>
          <div class="boxCarousel">
            <h1 class="texttimkiem"><v-icon large color="white" class="pr-2">search</v-icon>Tìm kiếm phòng</h1>
            <div>
              <v-select label="Chọn loại phòng" outline class="pa-2" hide-details></v-select>
              <v-select label="Chọn giá phòng" outline class="px-2" hide-details></v-select>
              <input type="checkbox">
            </div>
          </div>
        </v-flex>
      </v-layout>

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
.boxCarousel {
  width: 430px;
  height: 352px;
  position: absolute;
  color: black;
  margin:30px 0 0 20px;
  border-radius: 12px;
  border: 1px solid #fff;
}
.textfomat {
  text-align: center;
  color: #fff;
  border-radius: 12px;
}
.textbox {
  padding: 0 10px 0 10px;
  border: 1px solid #fff;
  border-radius: 12px;
}
.buttonContact:hover {
  background: white;
}
.buttonFb:hover {
  background: rgb(85, 87, 243);
}
.texttimkiem {
  color: #fff;
  border-bottom: 1px solid orange;
}
</style>