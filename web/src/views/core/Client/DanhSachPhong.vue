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
    <div v-if="progress" style="text-align: center;margin-top: 100px; margin-right: 300px;">
      <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-else>
      <v-layout v-if="dsPhong && dsPhong.length === 0" ma-2 row wrap>
        <v-flex md9>
          <v-card flat>
            <v-layout row wrap>
            <v-alert
                :value="true"
                type="info"
              >
                Không có kết quả cần tìm
              </v-alert>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout v-if="dsPhong" ma-2 row wrap>
        <v-flex md9>
          <v-card flat>
            <v-layout row wrap>
              <div v-for="item of dsPhong" :key="item._id" class="boxPhongTro ma-1">
                <img class="imagePhongTro pa-1" :src="`//localhost:3003/image/${item.anhChinh}`" />
                <v-rating length=5 :value=5  background-color="orange lighten-3" color="orange"></v-rating>
                <span class="black--text pl-2 font-weight-bold title">{{item.loaiPhongID.tenLoaiPhong}}: {{item.tenPhong}}</span>
                <div class="mt-2">
                <span class="black--text pl-2 font-weight-bold title">Giá phòng: {{item.giaPhong | formatCurrency}}</span>
                </div>
                <div style="text-align:center;">
                  <v-btn @click="openBook(item)" v-if="item.ok"  depressed dark color="green accent-3" class="white--text mt-3">đặt ngay</v-btn>
                  <v-btn color="cyan" target="_blank" depressed :to="{path:`/chi-tiet-phong-${item._id}.html`}" class="white--text mt-3">Xem chi tiết</v-btn>
                </div>
              </div>
            </v-layout>
            <div class="text-xs-center">
              <v-pagination
                v-model="page"
                :length="pages"
              ></v-pagination>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
    <div class="boxPhongTro fixed">
        <v-select label="Chọn loại phòng"  v-model="formData.loaiPhong" :items="dsLoaiPhong" item-text="tenLoaiPhong" item-value="_id" outline class="pa-2 labelSelect" hide-details></v-select>
        <v-select label="Chọn giá phòng"  v-model="formData.giaPhong" :items="dsLoaiPhong" item-text="giaPhong" item-value="_id" outline class="px-2" hide-details></v-select>
      <v-layout row>
        <v-flex md6>
          <div v-if="dsTinhTrangPhong" >
            <v-checkbox v-for="item of dsTinhTrangPhong" :key="item._id" class="pl-3"
              style="display:inline-block"
              v-model="formData.tinhTrangPhongSelect"
              :label="item.tenTinhTrangPhong"
              :value="item._id"
              color="orange"
              hide-details
            ></v-checkbox>
            <v-checkbox class="pl-3"
            style="display:inline-block"
              v-model="formData.isMang"
              label="Có dịch vụ mạng"
              id="checkbox-oghep"
              color="red"
              hide-details
            ></v-checkbox>
          </div>
        </v-flex>
        <v-flex md6>
         <v-btn color="cyan" @click="TimKiem" :loading="loading" class="white--text ml-4 mt-5" depressed>Tìm kiếm <v-icon>search</v-icon></v-btn>
        </v-flex>
      </v-layout>
    </div>
    <popUpBook v-model="openBooked" :phongSelected="phongSelected" />
  </div>
</template>

<script src="./DanhSachPhong.js"></script>
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
