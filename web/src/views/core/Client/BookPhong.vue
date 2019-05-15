<template>
  <div>
    <v-toolbar  color="teal lighten-3" dark >
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Chi tiết phòng trọ</v-toolbar-title>
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
    <v-layout row wrap justify-space-between >
      <v-flex md7 mt-3 ml-3>
        <v-carousel  v-if="phongDetail && phongDetail.anhChiTiet && phongDetail.anhChiTiet.length > 0">
          <v-carousel-item
            v-for="(anh,index) in phongDetail.anhChiTiet"
            :key="index"
            :src="`//localhost:3003/image/${anh}`"
          ></v-carousel-item>
        </v-carousel>
      </v-flex>
      <v-flex xs12 mt-3 sm6 md3 mr-3>
        <v-card flat  style="border:1px dashed black;margin-left: 13px; margin-bottom:10px;">
          <v-img class="" v-if="phongDetail && phongDetail.anhChinh"
            :src="`//localhost:3003/image/${phongDetail.anhChinh}`"               
            height="200px"
          >
          <v-layout
            align-end
            fill-height
            pa-3
            dark
            white--text
          >
            <div class="title font-weight-light">{{phongDetail && phongDetail.loaiPhongID && phongDetail.loaiPhongID.tenLoaiPhong}}</div>
          </v-layout>
          </v-img>
          <v-card-title style="padding:11px 0 11px 11px; ">
            <v-layout row wrap>
                <v-flex>
                  <span class="detailPT subheading black--text">{{phongDetail && phongDetail.khuPhongID && phongDetail.khuPhongID.tenKhuPhong}}</span>
                </v-flex>
                <v-flex>
                  <v-rating
                  v-model="rating"
                  background-color="orange lighten-3"
                  color="orange"
                  ></v-rating>
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-card-text class="py-0" v-if="phongDetail && phongDetail.giaPhong">
              <v-text-field class="pb-1" hide-details :value="$options.filters.formatCurrentcy(phongDetail.giaPhong)" label="Giá phòng" outline readonly></v-text-field>
              <v-textarea outline name="input-7-4" hide-details :value="phongDetail.moTa" label="mô tả phòng"></v-textarea>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn @click="openPopupBook = true" :disabled="disabled" depressed :dark="dark" color="blue" >đặt ngay</v-btn>
              <v-btn  @click="openPopupLienHe = true" depressed dark color="purple">báo khi có phòng</v-btn>
            </v-card-actions>
          </v-card>
      </v-flex>
      <v-divider></v-divider>
      <v-flex mt-3>
        <v-card flat style="padding:4px; border: 1px dashed black;" >
          <v-card-title style="background-color:#00C853;">
            <span class="white--text">Phòng trọ cô mai <v-icon color="yellow">start</v-icon></span>
          </v-card-title>
          <v-card-text>
            <v-list>
               <v-list-tile >
                <v-icon small left color="yellow">star</v-icon>
                <v-list-tile-content>
                  <v-list-tile-title >Uy tín</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
               <v-list-tile >
                <v-icon small left color="green accent-3">fab fa-shirtsinbulk</v-icon>
                <v-list-tile-content>
                  <v-list-tile-title >Giá rẻ</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
               <v-list-tile >
                <v-icon small left color="pink">fas fa-shield-alt</v-icon>
                <v-list-tile-content>
                  <v-list-tile-title >An toàn</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
               <v-list-tile >
                <v-icon small left color="pink">fas fa-user-friends</v-icon>
                <v-list-tile-content>
                  <v-list-tile-title >Thân thiện</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <hr>
    <div class="ml-3 mt-3" style="display:inline-block; border-bottom:2px solid orange;">
      <h1 class="headline">Phòng cùng loại</h1>
    </div>
    <v-layout v-if="dsPhongCungLoai" ma-2 row wrap>
      <v-flex md12>
        <v-card flat>
          <v-layout row wrap>
            <div v-for="item of dsPhongCungLoai.docs" :key="item._id" class="boxPhongTro ma-1">
              <img class="imagePhongTro pa-1" :src="`//localhost:3003/image/${item.anhChinh}`" />
              <v-rating length=5 :value=5  background-color="orange lighten-3" color="orange"></v-rating>
              <span class="black--text pl-2 font-weight-bold title">{{item.loaiPhongID.tenLoaiPhong}}</span>
              <div class="mt-2">
              <span class="black--text pl-2 font-weight-bold title">Giá phòng: {{item.loaiPhongID.giaPhong}}</span>
              </div>
              <div style="text-align:center;">
                <v-btn color="cyan" target="_blank" :to="{path:`/chi-tiet-phong-${item._id}.html`}" class="white--text mt-3">Xem chi tiết</v-btn>
              </div>
            </div>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <popupBook v-model="openPopupBook" :phongSelected="phongDetail" />
    <popupLienHe v-model="openPopupLienHe" :phongSelected="phongDetail" />
  </div>
</template>
<script src="./BookPhong.js"></script>
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