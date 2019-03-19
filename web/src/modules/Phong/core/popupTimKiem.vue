<template>
  <v-dialog  :value="value" max-width="1000px" persistent >
  <v-card>         
    <v-card-text>
      <v-container fluid grid-list-md>
        <v-layout justify-center>
          <h1 class="mb-2 danhsachPT">Thông tin phòng trọ cần tìm</h1>    
        </v-layout>         
        <v-form  ref="form" v-model="valid" lazy-validation>
          <v-layout row wrap justify-space-between>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="formData.tenPhong"   :counter="20" label="Tên Phòng Trọ"></v-text-field>
            </v-flex>   
            <v-flex xs12 sm6 md4>
              <v-select
                v-model="formData.khuPhongID"
                :items="dsKhuPhong"
                label="Khu Phòng"
                item-text="tenKhuPhong"
                item-value="_id"
              ></v-select>
            </v-flex>   
            <v-flex xs12 sm6 md4>
              <v-select
                v-model="formData.loaiPhongID"
                :items="dsLoaiPhong"
                label="Loại Phòng"
                item-text="tenLoaiPhong"
                item-value="_id"
              ></v-select>
            </v-flex>   
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm6 md4>
              <v-textarea
                height="70"
                outline
                label="mô tả phòng trọ"
                v-model="formData.moTa"
                hide-details
              ></v-textarea>
            </v-flex>                                                                                     
            <v-flex xs6 sm6 md2>
                <v-text-field
                  height="70"
                  type="number"
                  label="Số điện"
                  v-model="formData.soDien"
                  outline
                  hide-details
                ></v-text-field>
            </v-flex>                                                                                     
            <v-flex xs6 sm6 md2>
                <v-text-field
                  height="70" 
                  type="number"
                  label="Số nước"
                  v-model="formData.soNuoc"
                  outline
                  hide-details
                ></v-text-field>
            </v-flex> 
            <v-flex xs12 sm6 md4>
              <v-text-field
                height="70"
                type="number"
                label="Giá phòng"
                v-model="formData.giaPhong"
                outline
                hide-details
              ></v-text-field>
            </v-flex>                                                                                        
          </v-layout>
          <v-layout row wrap justify-center>
            <v-flex xs6 sm6 md2>
              <v-checkbox
                v-model="formData.dKMang"
                label="Đăng ký mạng"
                color="success"
                :value="false"
                hide-details
              ></v-checkbox>
            </v-flex>
            <v-flex xs6 sm6 md2 shrink>
              <v-checkbox
                v-model="formData.homeFlag"
                label="Đăng trang chủ"
                color="success"
                :value="false"
                hide-details
              ></v-checkbox>
            </v-flex>
            <v-flex xs6 sm6 md2>
              <v-checkbox
                v-model="formData.status"
                label="Kích hoạt"
                color="success"
                :value="false"
                hide-details
              ></v-checkbox>
            </v-flex>
            <v-flex xs6 sm6 md2>
              <v-checkbox
                v-model="formData.hotFlag"
                label="Phòng hot"
                color="success"
                :value="false"
                hide-details
              ></v-checkbox>
            </v-flex>
          </v-layout>
          <v-flex xs12 mt-2 sm12 md12 style="display: flex !important;justify-content: center !important;">                   
            <v-speed-dial direction="left" transition="slide-y-reverse-transition" >
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
.danhsachPT {
    border-bottom: 4px solid tomato;  
}
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
</style>