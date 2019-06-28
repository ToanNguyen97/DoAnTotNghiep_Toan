<template>
  <div>
     <Slider id="trangchu" />
      <section id="gioithieu" >
      <v-container>
        <h1 style="text-align:center;" class="display-2 font-weight-medium font-italic">Chào mừng đến với khu trọ của chúng tôi</h1>
        <v-layout pt-5 justify-space-between>
          <v-flex md4>
            <div class="boxIntro">
              <img class="ma-1" style="width:357px; height:326px;" :src="require('@/assets/gioiThieu.jpg')"/>
                <v-btn flat color="blue" ><v-icon dark>far fa-thumbs-up</v-icon></v-btn>
                <v-btn flat color="purple"><v-icon dark>fas fa-share-alt</v-icon></v-btn>
                <v-btn flat color="red" ><v-icon dark>far fa-comments</v-icon></v-btn>
            </div>
          </v-flex>
          <v-flex md7>
            <p>
              <ul class="headline">
                <li>Bạn đến với Nha Trang để định cư làm ăn?</li>
                <li>Bạn là một tân sinh viên của trường đại học Nha Trang?</li>
                <li>Bạn đang vất vả tìm kiếm một phòng trọ lý tưởng?</li>
                <li>Bạn muốn một phòng trọ an ninh, mát mẻ, con người thân thiện, dịch vụ phải chăng?...</li>
              </ul>
            </p>
            <p>
              <v-icon  color="red">fas fa-arrow-right</v-icon>
              <span class="pl-2 headline red--text">Phòng trọ cô Mai </span>
              <span class="subheading">hân hạnh cung cấp phòng trọ với đầy đủ các loại phòng trọ với nhiều mức giá phòng phù hợp với bất kỳ đối tượng từ sinh viên
                đến người đi làm, ngoài ra chúng tôi còn giúp bạn quản lý tài sản, xe cộ với hệ thống camera và cửa khép kín
                đảm bảo an ninh tuyệt đối. <span class="font-weight-bold font-italic">Bạn chỉ cần dọn vào ở mọi thứ còn lại để chúng tôi lo.</span> Khu trọ với môi trường sống năng động, lành mạnh, 
                gần chợ, gần trường học, bãi biễn, bến xe, không sợ ngập lụt. Bạn còn băn khoăn điều gì nữa, hãy liên hệ với chúng tôi đế sớm tìm 
                được nơi ở lý tưởng ở Nha Trang.
              </span>
            </p>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
    <section id="phongtro1" style="height: auto;" >
      <div>
        <h1 class="display-2 pt-3  pb-4 font-weight-thin text-xs-center">Một số loại phòng trọ</h1>
        <v-layout row style="height: 100%; width: 100%;" justify-center>
          <carousel v-if="dsLoaiPhong && dsLoaiPhong.length > 0" :per-page="3" :loop="true"  :mouse-drag="true">
            <slide v-for="item of dsLoaiPhong" :key="item._id" >
              <div class="boxPhongTro">
                <img class="imagePhongTro pa-1" :src="require('@/assets/bannerPhongTro.jpg')" />
                <v-rating length=5 :value=5  background-color="orange lighten-3" color="orange"></v-rating>
                <span class="black--text pl-2 font-weight-bold title">Loại phòng: {{item.tenLoaiPhong}}</span>
                <div class="mt-2">
                <span class="black--text pl-2 font-weight-bold title">Giá phòng: {{item.giaPhong | formatCurrency}}</span>
                </div>
                <div style="text-align:center;">
                  <v-btn color="cyan" target="_blank" @click="XemChiTiet(item._id)"   class="white--text mt-3">Xem chi tiết</v-btn>
                </div>
              </div>
            </slide>
            </carousel>
        </v-layout>
        <div style="text-align:center; position:unset; padding-top:20px; padding-bottom: 50px;">
          <v-btn target="_blank"  class="btnXemTatCa" :to="{name:'danhSachPhong'}" outline>Xem tất cả</v-btn>
        </div>
      </div>
    </section>
    <section id="dichvu" >
      <v-container>
        <v-layout>
            <v-flex md6>
              <h1 class="display-2 pb-4 font-weight-thin">Cung cấp dịch vụ mạng</h1>
              <img style="width: 397px; height: 328px;" :src="require('@/assets/nhanvienMang.png')" />
            </v-flex>
            <v-flex md4>
              <img style="width: 500px; height: 400px;" :src="require('@/assets/service.jpg')" />
            </v-flex> 
        </v-layout>
      </v-container>
    </section>
    <!-- <section id="map" >
      <v-container>
        <google-map />
      </v-container>
    </section> -->
    <div>
      <v-btn class="btnGoHome" fab small flat outline color="cyan" @click="goToTC()"><v-icon color="cyan">fas fa-angle-double-up</v-icon></v-btn>
    </div>
  </div>
</template>
<script>
import Slider from './Carousel.vue'
// import GoogleMap from './GoogleMap.vue'
import { Carousel, Slide } from 'vue-carousel'
export default {
  components: {
     Slider,
    Carousel,
    Slide
    // GoogleMap
  },
  data() {
    return {
      loaiPhong: [],
      formLoaiPhong: {}
    }
  },
  created() {
    this.$store.dispatch('phong/getLoaiPhongs')
  },
  computed: {
    dsLoaiPhong () {
      return this.$store.state.phong.dsLoaiPhong
    }
  },
  methods: {
    goToTC () {
      this.$vuetify.goTo("#trangchu",{duration:1000,offset:100,easing:'easeInQuint'})
    },
    XemChiTiet(id) {
      this.formLoaiPhong.loaiPhong = id
      this.formLoaiPhong.tinhTrangPhongSelect = []
      this.$router.push({path:'/danh-sach-phong-tro.html', query: this.formLoaiPhong})
    }
  },
  filters: {
    formatCurrency (money) {
      if(money) {
        return money.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
      }
      return 0
    }
  }
}
</script>
<style scoped>
#phongtro1 {
height:100vh;
background-image:linear-gradient(to right top, rgba(17, 17, 17, 0.95),
rgba(244, 249, 250, 0)), 
 url(../../../assets/bannerPhongTro2.jpg);
background-size: cover;
background-position: bottom;
background-attachment: fixed; /*giúp giữ cứng hình*/
color: #fff;
}

#gioithieu {
height:584px;
background: #fff;
}
.boxIntro {
  border: 7px solid grey;
  height: 400px;
}
.boxPhongTro {
  width: 329px;
  border: 5px solid grey;
  height: 400px;
  background: #fff;
}
.imagePhongTro {
  width: 318px;
  height: 220px;
}
.btnXemTatCa {
  background: rgba(243, 8, 8, 0.7) !important;
  color:#fff !important;
}
.btnXemTatCa:hover {
  background: red !important;
}
.btnGoHome {
  position: fixed;
  bottom: 0;
  right: 5px;
}
.btnGoHome:hover {
  background: blue !important;
}
</style>
