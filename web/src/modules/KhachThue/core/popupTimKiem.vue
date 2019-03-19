<template>
  <v-dialog :value="value" max-width="700px" persistent >
  <v-card>         
    <v-card-text>
      <v-container fluid grid-list-md>
        <v-layout justify-center>
          <h1 class="mb-2 danhsachKT">Thông tin khách thuê cần tìm</h1>    
        </v-layout>     
        <v-form  ref="form" v-model="valid" lazy-validation>
          <v-layout row wrap justify-space-between>
            <v-flex xs12 sm6 md6>
              <v-text-field v-model="formData.hoKhachThue"  label="Họ Khách Thuê"></v-text-field>
            </v-flex>   
            <v-flex xs12 sm6 md6>
              <v-text-field v-model="formData.tenKhachThue"   label="Tên Khách Thuê"></v-text-field>
            </v-flex>   
            <v-flex xs12 sm6 md6>
              <v-select
                v-model="formData.loaiKhachThueID"
                :items="dsLoaiKhachThue"
                label="Loại Khách Thuê"
                item-text="tenLoaiKhachThue"
                item-value="_id"
              ></v-select>
            </v-flex>   
            <v-flex xs12 sm6 md6>
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
            <v-flex style="justify-content: center;display: flex;" xs12 sm6 md6>
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
            <v-flex  xs12 sm6 md6>
              <v-text-field v-model="formData.soCMND" type="number"  label="Số chứng minh"></v-text-field>
            </v-flex>
            <v-flex  xs12 sm6 md6>
              <v-card flat  >
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
            <v-flex  xs12 sm6 md6>
              <v-text-field v-model="formData.soDienThoai" type="number"  label="Số điện thoại"></v-text-field>
            </v-flex>          
          </v-layout>
          <v-layout row wrap>    
            <v-flex  xs12 sm6 md4>
              <v-text-field v-model="formData.diaChi"  label="Địa Chỉ"></v-text-field>
            </v-flex>
            <v-flex  xs12 sm6 md4>
              <v-text-field v-model="formData.email"  label="E-mail"></v-text-field>
            </v-flex>            
            <v-flex  xs12 sm6 md4>
              <v-text-field v-model="formData.hoTenNguoiThan"   label="Họ tên người thân"></v-text-field>
            </v-flex>                                                                
          </v-layout>
          <v-flex xs12 mt-2 sm12 md12 style="display: flex !important;justify-content: center !important;">                   
            <v-speed-dial direction="top" transition="slide-y-reverse-transition" >
              <template v-slot:activator>
                <v-btn color="green darken-1" dark >Xác nhận <v-icon dark right>check_circle_outline</v-icon> </v-btn>
              </template>
              <v-btn dark small color="green" @click="Search(true)">tìm chính xác</v-btn>
              <v-btn dark small color="indigo" @click="Search(false)">tìm gần đúng</v-btn>
            </v-speed-dial>
            <v-btn color="info" dark @click="Reset" >Làm Mới <v-icon dark right>autorenew</v-icon></v-btn>
            <v-btn color="yellow darken-1" dark @click="Huy" >Hủy <v-icon dark right>highlight_off</v-icon></v-btn>  
          </v-flex>                                                                
        </v-form> 
      </v-container>
    </v-card-text>          
  </v-card>
</v-dialog>
</template>

<script src="./popupTimKiem.js">
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

#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
</style>


