<template>
  <div>
    <v-toolbar  color="teal lighten-3" dark >
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Danh sách phòng trọ cô Mai</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon :to="{path:'/index.html'}">
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn icon :to="{path:'/login'}">
        <v-icon>fas fa-sign-in-alt</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-layout ma-2 row wrap>
      <div style="display:flex; ">
        <div class="boxPhongTro">
          <img class="imagePhongTro pa-1" :src="require('@/assets/bannerPhongTro.jpg')" />
          <v-rating length=5 :value=5  background-color="orange lighten-3" color="orange"></v-rating>
          <span class="black--text pl-2 font-weight-bold title">Phòng gác lửng</span>
          <div class="mt-2">
          <span class="black--text pl-2 font-weight-bold title">Giá phòng: 1.500.000 đ</span>
          </div>
          <div style="text-align:center;">
            <v-btn color="cyan"  class="white--text mt-3">Xem chi tiết</v-btn>
          </div>
        </div>
        <div class="boxPhongTro ">
          <img class="imagePhongTro pa-1" :src="require('@/assets/bannerPhongTro.jpg')" />
          <v-rating length=5 :value=5  background-color="orange lighten-3" color="orange"></v-rating>
          <span class="black--text pl-2 font-weight-bold title">Phòng gác lửng</span>
          <div class="mt-2">
          <span class="black--text pl-2 font-weight-bold title">Giá phòng: 1.500.000 đ</span>
          </div>
          <div style="text-align:center;">
            <v-btn color="cyan"  class="white--text mt-3">Xem chi tiết</v-btn>
          </div>
        </div>
        <div class="boxPhongTro">
          <img class="imagePhongTro pa-1" :src="require('@/assets/bannerPhongTro.jpg')" />
          <v-rating length=5 :value=5  background-color="orange lighten-3" color="orange"></v-rating>
          <span class="black--text pl-2 font-weight-bold title">Phòng gác lửng</span>
          <div class="mt-2">
          <span class="black--text pl-2 font-weight-bold title">Giá phòng: 1.500.000 đ</span>
          </div>
          <div style="text-align:center;">
            <v-btn color="cyan"  class="white--text mt-3">Xem chi tiết</v-btn>
          </div>
        </div>
        <div class="boxPhongTro">
          <img class="imagePhongTro pa-1" :src="require('@/assets/bannerPhongTro.jpg')" />
          <v-rating length=5 :value=5  background-color="orange lighten-3" color="orange"></v-rating>
          <span class="black--text pl-2 font-weight-bold title">Phòng gác lửng</span>
          <div class="mt-2">
          <span class="black--text pl-2 font-weight-bold title">Giá phòng: 1.500.000 đ</span>
          </div>
          <div style="text-align:center;">
            <v-btn color="cyan"  class="white--text mt-3">Xem chi tiết</v-btn>
          </div>
        </div>
      </div>
      <div style="display:flex;" class="mt-2">
        <div class="boxPhongTro">
          <img class="imagePhongTro pa-1" :src="require('@/assets/bannerPhongTro.jpg')" />
          <v-rating length=5 :value=5  background-color="orange lighten-3" color="orange"></v-rating>
          <span class="black--text pl-2 font-weight-bold title">Phòng gác lửng</span>
          <div class="mt-2">
          <span class="black--text pl-2 font-weight-bold title">Giá phòng: 1.500.000 đ</span>
          </div>
          <div style="text-align:center;">
            <v-btn color="cyan"  class="white--text mt-3">Xem chi tiết</v-btn>
          </div>
        </div>
        <div class="boxPhongTro ">
          <img class="imagePhongTro pa-1" :src="require('@/assets/bannerPhongTro.jpg')" />
          <v-rating length=5 :value=5  background-color="orange lighten-3" color="orange"></v-rating>
          <span class="black--text pl-2 font-weight-bold title">Phòng gác lửng</span>
          <div class="mt-2">
          <span class="black--text pl-2 font-weight-bold title">Giá phòng: 1.500.000 đ</span>
          </div>
          <div style="text-align:center;">
            <v-btn color="cyan"  class="white--text mt-3">Xem chi tiết</v-btn>
          </div>
        </div>
        <div class="boxPhongTro">
          <img class="imagePhongTro pa-1" :src="require('@/assets/bannerPhongTro.jpg')" />
          <v-rating length=5 :value=5  background-color="orange lighten-3" color="orange"></v-rating>
          <span class="black--text pl-2 font-weight-bold title">Phòng gác lửng</span>
          <div class="mt-2">
          <span class="black--text pl-2 font-weight-bold title">Giá phòng: 1.500.000 đ</span>
          </div>
          <div style="text-align:center;">
            <v-btn color="cyan"  class="white--text mt-3">Xem chi tiết</v-btn>
          </div>
        </div>
        <div class="boxPhongTro">
          <img class="imagePhongTro pa-1" :src="require('@/assets/bannerPhongTro.jpg')" />
          <v-rating length=5 :value=5  background-color="orange lighten-3" color="orange"></v-rating>
          <span class="black--text pl-2 font-weight-bold title">Phòng gác lửng</span>
          <div class="mt-2">
          <span class="black--text pl-2 font-weight-bold title">Giá phòng: 1.500.000 đ</span>
          </div>
          <div style="text-align:center;">
            <v-btn color="cyan"  class="white--text mt-3">Xem chi tiết</v-btn>
          </div>
        </div>
      </div>
    </v-layout>
    <div class="boxPhongTro fixed">
      <v-select label="Chọn khu phòng" :items="dsLoaiPhong" outline class="pa-2" hide-details></v-select>
      <v-select label="Chọn loại phòng" :items="dsLoaiPhong" outline class="pa-2" hide-details></v-select>
      <v-select label="Chọn giá phòng" :items="dsLoaiPhong"  outline class="pa-2" hide-details></v-select>
      <v-layout row>
        <v-flex md6>
          <v-checkbox class="pl-3" v-model="isOGhep" label="Cho ở ghép" id="checkbox-oghep" color="orange darken-3" value="orange darken-3"  hide-details ></v-checkbox>
          <v-checkbox class="pl-3" v-model="isConTrong" label="Còn trống" id="checkbox-oghep" color="orange darken-3" value="orange darken-3" hide-details></v-checkbox>
          <v-checkbox class="pl-3" v-model="isMang" label="Có dịch vụ mạng" id="checkbox-oghep"  color="orange darken-3" value="orange darken-3" hide-details ></v-checkbox>
        </v-flex>
        <v-flex md6>
         <v-btn color="cyan" class="white--text ml-4 mt-5" depressed>Tìm kiếm <v-icon>search</v-icon></v-btn>
        </v-flex>
      </v-layout>
    
    </div>
  </div>
</template>

<script>
export default {
  data() {
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
<style scoped>
.boxPhongTro {
  width: 268px;
  border: 1px solid black;
  height: 400px;
  background: #fff;
  margin-right: 8px;
}
.imagePhongTro {
  width: 265px;
  height: 220px;
}
.fixed {
  width: 350px;
  position: fixed;
  top: 85px;
  right:0;
}
</style>
