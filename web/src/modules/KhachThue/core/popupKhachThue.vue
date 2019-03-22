<template>
  <v-dialog :value="value" max-width="1000px" persistent >
  <v-card>         
    <v-card-text>
      <v-container fluid grid-list-md>
        <v-layout justify-center>
          <h1 class="mb-2 danhsachKT">Thông tin khách thuê</h1>    
        </v-layout>     
        <v-form  ref="form" v-model="valid" lazy-validation>
          <v-layout row wrap justify-space-between>
            <v-flex xs12 sm6 md3>
              <v-text-field v-model="formData.hoKhachThue"  :rules="hoKhachThueRules" :counter="30" label="Họ Khách Thuê"></v-text-field>
            </v-flex>   
            <v-flex xs12 sm6 md3>
              <v-text-field v-model="formData.tenKhachThue"  :rules="tenKhachThueRules" :counter="20" label="Tên Khách Thuê"></v-text-field>
            </v-flex>   
            <v-flex xs12 sm6 md3>
              <v-select
                v-model="formData.loaiKhachThueID"
                :items="dsLoaiKhachThue"
                label="Loại Khách Thuê"
                item-text="tenLoaiKhachThue"
                item-value="_id"
              ></v-select>
            </v-flex>   
            <v-flex xs12 sm6 md3>
              <v-select
                v-model="formData.tinhTrangKhachThue"
                :items="dsTinhTrang"
                label="Tình Trạng"
                item-text="ten"
                item-value="ten"
              ></v-select>
            </v-flex>   
          </v-layout>
          <v-layout row wrap>   
            <v-flex   xs12 sm6 md3 size="10px">
              <div>
                <input hidden type="file" style="display: none" ref="file" accept="image/*"  @change="choosedFile">
                <v-btn depressed  color="success"  @click="chooseFIle">Ảnh Đại Diện</v-btn>
              </div>
              <div v-if="isThem">
                  <img :src="anhDaiDien" height="144">
              </div>
              <div v-else> 
                <div v-if="srcAnhDaiDien">
                  <img :src="srcAnhDaiDien" height="144">
                </div>                            
              </div>
            </v-flex>
            <v-flex style="justify-content: center;display: flex;" xs12 sm6 md3>
              <v-menu v-model="menu"  :close-on-content-click="false"  full-width  max-width="290"  >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :value="computedDateFormattedMomentjs"
                    clearable
                    label="Ngày Sinh"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  locale=vi
                  v-model="formData.ngaySinh"
                  @change="menu = false"
                ></v-date-picker>
              </v-menu>           
            </v-flex>
            <v-flex  xs12 sm6 md3>
              <v-text-field v-model="formData.soCMND" type="number"  label="Số chứng minh"></v-text-field>
            </v-flex>
            <v-flex  xs12 sm6 md3>
              <v-card flat style="padding-left:30px;">
                <v-card-title class="pa-0">
                  Giới tính
                </v-card-title>
                <v-card-text class="pa-0">
                  <v-radio-group class="pa-0" row v-model="formData.gioiTinh" :mandatory="true">
                    <v-radio label="Nam"  :value="true"></v-radio>
                    <v-radio label="Nữ" :value="false"></v-radio>
                  </v-radio-group>
                </v-card-text>
              </v-card>
            </v-flex>            
          </v-layout>
          <v-layout row wrap>
            <v-flex  xs12 sm6 md3>
              <v-text-field v-model="formData.soDienThoai" type="number"  label="Số điện thoại"></v-text-field>
            </v-flex>
            <v-flex  xs12 sm6 md3>
              <v-text-field v-model="formData.diaChi"  label="Địa Chỉ"></v-text-field>
            </v-flex>
            <v-flex  xs12 sm6 md3>
              <v-text-field v-model="formData.email" type="email"  label="E-mail"></v-text-field>
            </v-flex>            
            <v-flex  xs12 sm6 md3>
              <v-text-field v-model="formData.hoTenNguoiThan"   label="Họ tên người thân"></v-text-field>
            </v-flex>                                                                
          </v-layout>                                                                  
        </v-form>                                                       
        <v-layout row wrap mt-2>
            <v-flex xs12 sm12 md12 style="display: flex !important;justify-content: center !important;">                   
              <v-btn depressed color="blue darken-1" dark @click="XacNhan" >Xác nhận</v-btn>
              <v-btn depressed color="yellow darken-1" dark @click="Huy" >Hủy</v-btn>
            </v-flex>
        </v-layout>  
      </v-container>
    </v-card-text>          
  </v-card>
</v-dialog>
</template>

<script src="./popupKhachThue.js">
</script>

<style >
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.colorText {
  color: #fff !important;
}
.danhsachKT {
    border-bottom: 4px solid tomato;  
}
</style>


