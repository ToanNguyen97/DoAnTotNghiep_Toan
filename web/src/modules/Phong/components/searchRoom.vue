<template>
  <div style="background-color: #fff; border-radius:10px;" class="searchRoom">
    <v-layout row wrap justify-start class="ml-2 pl-1">
      <h1 class="mb-1 searchR">Tra cứu phòng:</h1>    
    </v-layout>
    <v-layout row >
      <v-flex shrink>
          <div class="boxCarousel" >
            <h1 class="searchR headline"><v-icon large color="cyan" class="pr-2">search</v-icon>Thông tin tra cứu</h1>
            <div class="mt-2">
              <v-select label="Chọn loại phòng" v-model="formData.loaiPhong" :items="dsLoaiPhong" item-text="tenLoaiPhong" item-value="_id" outline class="pa-2 labelSelect" hide-details></v-select>
              <v-select label="Chọn giá phòng" v-model="formData.giaPhong" :items="dsLoaiPhong" item-text="giaPhong" item-value="_id" outline class="px-2" hide-details></v-select>
              <div style="display: flex; flex-direction: column;">
                <v-checkbox class="pl-3"
                  v-for="item of dsTinhTrangPhong" :key="item._id"
                  style="display:inline-block"
                    v-model="formData.tinhTrangPhongSelect"
                    :label="item.tenTinhTrangPhong"
                    id="checkbox-oghep"
                    :value="item._id"
                    color="pink"
                    hide-details
                ></v-checkbox>
                <v-checkbox class="pl-3"
                style="display:inline-block"
                  v-model="formData.isMang"
                  label="Có dịch vụ mạng"
                  id="checkbox-oghep"
                  color="cyan darken-3"
                  hide-details
                ></v-checkbox>
                <div style="text-align:center" class="pt-3">
                  <v-btn color="cyan" :loading="loading" @click="TimKiem" class="btnTimKiem" dark>Tìm Kiếm  <v-icon>search</v-icon> </v-btn>
                  <v-btn color="purple" @click="Reset" class="btnTimKiem" dark><v-icon>refresh</v-icon></v-btn>
                </div>
              </div>      
            </div>
          </div>
      </v-flex>
      <v-flex grow pa-1 pt-2>
        <v-card flat style="height:540px;border-radius: 12px; border: 1px solid black;" >
          <v-card-title class="title pb-1">
            Kết quả tra cứu: {{ketqua}}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div  class="hide-overflow" style="position: relative;">
              <div id="scrolling-techniques" class="scroll-y" style="max-height: 450px;">
                <v-container pt-0 style="height: 500px;">
                  <div style="width:950px;" class="pl-4">
                    <v-layout justify-start row wrap v-if="dsPhong && dsPhong.length > 0">
                      <transition-group name="list" >
                        <v-btn style="height:auto;" target="_blank" :to="{path:`/thong-tin-chi-tiet-phong-${item._id}.html`}" :color="item.tinhTrangPhongID._id === '5c88669ffcd238559ca25d13'?'cyan accent-2':(item.tinhTrangPhongID._id === '5c8866adfcd238559ca25d14'?'green accent-3':(item.tinhTrangPhongID._id === '5c8866b6fcd238559ca25d15'?'pink accent-2':'amber accent-3'))"  class="py-3 list-item" v-for="item of dsPhong" :key="item._id">
                        {{item.tenPhong}}<br>
                        {{item.khuPhongID.tenKhuPhong}}<br>
                        {{item.giaPhong.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}}<br>
                        {{item.tinhTrangPhongID && item.tinhTrangPhongID.tenTinhTrangPhong}}
                        </v-btn>
                      </transition-group>
                    </v-layout>
                  </div>
                </v-container>
              </div>
            </div> 
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script src="./searchRoom.js">
</script>
<style scoped>
.searchR {
  border-bottom: 3px solid tomato;
}
.boxCarousel {
  width: 364px;
  height: 475px;
  color: black;
  margin:10px 0 0 20px;
  border-radius: 12px;
  border: 1px solid black;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s ease-in;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>