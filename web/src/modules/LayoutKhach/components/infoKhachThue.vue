<template>
  <div style="background-color: #fff; border-radius:10px;"  class=" pb-5 infoKhachThue">
    <v-layout row wrap justify-start class="ml-2 pl-1">
      <h1 class="mb-2 detailPT">Thông tin khách thuê</h1>    
    </v-layout>
    <v-layout row wrap>
      <v-flex   xs12 sm6 md3 size="10px" style="overflow: hidden;">
          <div v-if="anhDaiDien" class="box-anh">
            <img :src="anhDaiDien" width="100%"> 
            <div class="button-anh">
              <input hidden type="file" style="display: none" ref="file" accept="image/*"  @change="choosedFile">
              <button @click="chooseFIle"><v-icon large dark>fas fa-camera</v-icon></button>
            </div>  
          </div>                     
      </v-flex>
      <v-flex md9 pl-2>
        <v-card>
          <v-card-title>
            <span class="display-1">Profile</span>
            <v-spacer></v-spacer>
            <v-btn color="cyan" class="white--text" @click="XacNhan" depressed >Cập nhật <v-icon  right>far fa-edit</v-icon></v-btn>
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
                  <v-menu v-model="menu"  :close-on-content-click="false"  full-width  max-width="290"  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        :value="computedDateFormattedMomentjs"
                        required
                        clearable
                        label="Ngày Sinh"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      locale=vi
                      v-model="infoKhach.ngaySinh"
                      @change="menu = false"
                    ></v-date-picker>
                  </v-menu>        
                <!-- <v-text-field hide-details class="mb-2" :value="infoKhach.ngaySinh |formatDate" outline label="Ngày sinh"></v-text-field> -->
              </v-flex>
              <v-flex md6 >
                <v-select
                  outline
                  hide-details
                  v-model="infoKhach.gioiTinh"
                  :items="gioiTinh"
                  required
                  label="Giới Tính"
                  item-text="text"
                  item-value="value"
                ></v-select>
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
  .box-anh {
    position: relative;
  }
  .button-anh {
    display: flex;
    flex-direction: column-reverse;
    position: absolute;
    right: 100%;
    opacity: 0;
    bottom: 5px;
    width: 100%;
    right: 100%;
    height: 65px;
    background-color: #0000008f;
    text-align: center;
  }
  .button-anh button {
   height: 100%;
  }

  .box-anh:hover {
    cursor: pointer;
  }
  .box-anh:hover .button-anh {
    transition: .3s;
    opacity: 1;
    right: 0
  }
</style>