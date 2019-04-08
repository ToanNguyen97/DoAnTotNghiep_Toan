<template>
  <div style="background-color: #fff; border-radius:10px;" class="infoKhachThue">
    <v-layout row wrap justify-start class="ml-2 pl-1">
      <h1 class="mb-2 detailPT">Thông tin khách thuê</h1>    
    </v-layout>
    <v-layout row wrap>
      <v-flex md3>
        <v-card>
          <v-img v-if="infoKhach && infoKhach.anhDaiDien" :src="`//localhost:3003/image/${infoKhach.anhDaiDien}`"></v-img>
        </v-card>
      </v-flex>
      <v-flex md9 pl-2>
        <v-card>
          <v-card-title>
            <span class="display-1">Profile</span>
            <v-spacer></v-spacer>
            <v-btn color="cyan" class="white--text" depressed >Cập nhật <v-icon  right>far fa-edit</v-icon></v-btn>
          </v-card-title>
          <v-card-text>
            <v-layout v-if="infoKhach">
              <v-flex md6 pr-1> 
                <v-text-field hide-details class="mb-2" v-model="infoKhach.hoKhachThue" outline label="Họ khách"></v-text-field>
              </v-flex>
              <v-flex md6> 
                <v-text-field hide-details class="mb-2" v-model="infoKhach.tenKhachThue" outline label="Tên khách"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex md6 pr-1> 
                <v-text-field hide-details class="mb-2" :value="infoKhach.ngaySinh |formatDate" outline label="Ngày sinh"></v-text-field>
              </v-flex>
              <v-flex md6 > 
               <v-text-field  hide-details class="mb-2" :value="infoKhach.gioiTinh?'Nam':'Nữ'" outline label="Giới tính"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex md6 pr-1> 
                <v-text-field outline hide-details class="mb-2" v-model="infoKhach.soCMND" label="Số chứng minh"></v-text-field>
              </v-flex>
              <v-flex md6> 
                <v-text-field outline hide-details class="mb-2" v-model="infoKhach.soDienThoai" label="Số điện thoại"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex md6 pr-1> 
                <v-text-field outline hide-details class="mb-2" v-model="infoKhach.hoTenNguoiThan" label="Họ tên người thân"></v-text-field>
              </v-flex>
              <v-flex md6> 
                <v-text-field outline hide-details class="mb-2" v-model="infoKhach.email" label="Email"></v-text-field>
              </v-flex>
            </v-layout>
            <v-flex>
              <v-text-field outline hide-details v-model="infoKhach.diaChi" label="Địa chỉ"></v-text-field>
            </v-flex>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script src="./infoKhachThue.js">
</script>

<style scoped>
  .detailPT {
    border-bottom: 2px solid tomato; 
  }
</style>