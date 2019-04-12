<template>
  <div >
    <v-img  style="height:100vh;" :src="require('@/assets/banner2.jpg')"
      gradient="to right top,rgba(17, 17, 17, 0.95), rgba(244, 249, 250, 0)"
      aspect-ratio="1"
      class="yellow mb-2"
      >
      <template v-slot:placeholder>
        <v-layout fill-height align-center justify-center ma-0 >
          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
        </v-layout>
      </template>
      <MenuTop/>
      <v-layout row  style="height:400px; padding-top:150px;" >
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
          <div class="boxCarousel" >
            <h1 class="texttimkiem"><v-icon large color="white" class="pr-2">search</v-icon>Tìm kiếm phòng</h1>
            <div class="mt-3">
              <v-select label="Chọn loại phòng" :items="dsLoaiPhong"  dark background-color="white" outline class="pa-2 labelSelect" hide-details></v-select>
              <v-select label="Chọn giá phòng" :items="dsLoaiPhong" dark background-color="white" outline class="px-2 py-3" hide-details></v-select>
              <div >
                <v-checkbox class="pl-3"
                style="display:inline-block"
                  v-model="isOGhep"
                  dark
                  label="Cho ở ghép"
                  id="checkbox-oghep"
                  color="orange darken-3"
                  value="orange darken-3"
                  hide-details
                ></v-checkbox>
                <v-checkbox class="pl-2"
                style="display:inline-block"
                  v-model="isConTrong"
                  dark
                  label="Còn trống"
                  id="checkbox-oghep"
                  color="orange darken-3"
                  value="orange darken-3"
                  hide-details
                ></v-checkbox>
                <v-checkbox class="pl-2"
                style="display:inline-block"
                  v-model="isMang"
                  dark
                  label="Có dịch vụ mạng"
                  id="checkbox-oghep"
                  color="orange darken-3"
                  value="orange darken-3"
                  hide-details
                ></v-checkbox>
              </div>
              <div style="text-align:center" class="pt-3">
                <v-btn color="cyan" class="btnTimKiem" dark>Tìm Kiếm  <v-icon>search</v-icon> </v-btn>
              </div>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-img>
    <div style="width:300px;height:10px;background:orange;margin:0 auto;"></div>
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
    <section id="phongtro1" >
      <v-container>
        <h1 class="display-2 pb-4 font-weight-thin">Một số loại phòng trọ</h1>
        <v-layout pt-5 justify-space-between>
          <v-flex md4 ml-5>
            <div class="boxPhongTro">
              <img class="imagePhongTro pa-1" :src="require('@/assets/bannerPhongTro.jpg')" />
              <v-rating length=5 :value=5  background-color="orange lighten-3" color="orange"></v-rating>
              <span class="black--text pl-2 font-weight-bold title">Loại phòng: Phòng cửa gỗ</span>
              <div class="mt-2">
              <span class="black--text pl-2 font-weight-bold title">Giá phòng: 1.000.000 đ</span>
              </div>
              <div style="text-align:center;">
                <v-btn color="cyan"  class="white--text mt-3">Xem chi tiết</v-btn>
              </div>
            </div>
          </v-flex>
          <v-flex md4>
            <div class="boxPhongTro">
              <img class="imagePhongTro pa-1" :src="require('@/assets/bannerPhongTro.jpg')" />
              <v-rating length=5 :value=5  background-color="orange lighten-3" color="orange"></v-rating>
              <span class="black--text pl-2 font-weight-bold title">Loại phòng: Phòng cửa sắt</span>
              <div class="mt-2">
              <span class="black--text pl-2 font-weight-bold title">Giá phòng: 1.200.000 đ</span>
              </div>
              <div style="text-align:center;">
                <v-btn color="cyan"  class="white--text mt-3">Xem chi tiết</v-btn>
              </div>
            </div>
          </v-flex>
          <v-flex md4>
            <div class="boxPhongTro">
              <img class="imagePhongTro pa-1" :src="require('@/assets/bannerPhongTro.jpg')" />
              <v-rating length=5 :value=5  background-color="orange lighten-3" color="orange"></v-rating>
              <span class="black--text pl-2 font-weight-bold title">Loại phòng: Phòng gác lửng</span>
              <div class="mt-2">
              <span class="black--text pl-2 font-weight-bold title">Giá phòng: 1.500.000 đ</span>
              </div>
              <div style="text-align:center;">
                <v-btn color="cyan"  class="white--text mt-3">Xem chi tiết</v-btn>
              </div>
            </div>
          </v-flex>
        </v-layout>
        <div style="text-align:center; position:unset; margin-top:50px;">
          <v-btn  class="btnXemTatCa"  outline>Xem tất cả</v-btn>
        </div>
      </v-container>
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
      isOGhep: false,
      isConTrong: false,
      isMang: false,
      dsLoaiPhong: [
        'Phòng cửa gỗ',
        'Phòng cửa sắt',
        'Phòng gác lửng'
      ]
    }
  },
  watch: {
    isOGhep (v) {
      if(v) {
        this.isConTrong = false
      }
    },
    isConTrong (v) {
      if(v) {
        this.isOGhep = false
      }
    }
  },
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

</style>