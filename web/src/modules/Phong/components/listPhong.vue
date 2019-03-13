<template>
  <div style="background-color: #fff; border-radius:10px">
    <v-layout row wrap justify-start class="ml-2 pl-1">
      <h1 class="mb-2 danhsachPT">Danh sách phòng trọ:</h1>    
    </v-layout>
    <v-layout row wrap>
      <v-dialog v-model="dialog" max-width="1000px">
        <v-btn  slot="activator" color="primary" dark class="mt-3 hidden-xs-only">Thêm Nhanh</v-btn>
        <v-btn  slot="activator" fab small  color="primary" dark class="mt-3 hidden-md-only hidden-sm-only hidden-lg-only"><v-icon>add_circle_outline</v-icon></v-btn>
        <v-card>         
          <v-card-text>
            <v-container fluid grid-list-md>
              <v-layout justify-center>
                <h1 class="mb-2 danhsachPT">Thông tin phòng trọ</h1>    
              </v-layout>     
              <v-form  ref="form" v-model="valid" lazy-validation>
                <v-layout row wrap justify-space-between>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="tenPhong"  :rules="tenPhongRules" :counter="20" label="Tên Phòng Trọ"></v-text-field>
                  </v-flex>   
                  <v-flex xs12 sm6 md4>
                    <v-select
                      v-model="khuPhongId"
                      :items="dsKhuPhong"
                      label="Khu Phòng"
                      item-text="tenKhuPhong"
                      item-value="_id"
                    ></v-select>
                  </v-flex>   
                  <v-flex xs12 sm6 md4>
                    <v-select
                      v-model="loaiPhongId"
                      :items="dsLoaiPhong"
                      label="Loại Phòng"
                      item-text="tenLoaiPhong"
                      item-value="_id"
                    ></v-select>
                  </v-flex>   
                </v-layout>
                <v-layout row wrap justify-space-between>   
                  <v-flex shrink  size="10px">
                    <div>
                      <input hidden type="file" style="display: none" ref="file" accept="image/*"  @change="choosedFile">
                      <v-btn  color="success"  @click="chooseFIle">Ảnh Chính</v-btn>
                    </div>
                    <div>
                      <img :src="anhChinh" height="144">
                    </div>
                  </v-flex>
                  <v-flex grow size="10px">
                    <div>
                      <input hidden type="file" style="display: none" ref="multifile" multiple accept="image/*"  @change="choosedFileMulti">
                      <v-btn color="success" @click="chooseFIleMulti">Ảnh Chi Tiết</v-btn>
                    </div>
                    <div>
                      <img v-for="(item,index) in anhChiTiet" :key="index" style="padding-right:5px;" :src="item" height="144">
                    </div>
                  </v-flex>       
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12 sm6 md4>
                    <v-textarea
                      height="70"
                      outline
                      label="mô tả phòng trọ"
                      placeholder="mô tả phòng trọ"
                      v-model="moTa"
                    ></v-textarea>
                  </v-flex>                                                                                     
                  <v-flex xs6 sm6 md2>
                      <v-text-field
                        height="70"
                        type="number"
                        readonly
                        label="Số điện"
                        v-model="soDien"
                        outline
                      ></v-text-field>
                  </v-flex>                                                                                     
                  <v-flex xs6 sm6 md2>
                      <v-text-field
                        height="70"
                        readonly
                        type="number"
                        label="Số nước"
                        v-model="soNuoc"
                        outline
                      ></v-text-field>
                  </v-flex> 
                  <v-flex xs12 sm6 md4>
                   <v-text-field
                      height="70"
                      type="number"
                      label="Giá phòng"
                      v-model="giaPhong"
                      outline
                    ></v-text-field>
                  </v-flex>                                                                                        
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs6 sm6 md2>
                    <v-checkbox
                      v-model="dKMang"
                      label="Đăng ký mạng"
                      color="success"
                      :value="false"
                      hide-details
                    ></v-checkbox>
                  </v-flex>
                  <v-flex xs6 sm6 md2 shrink>
                    <v-checkbox
                      v-model="homeFlag"
                      label="Đăng trang chủ"
                      color="success"
                      :value="false"
                      hide-details
                    ></v-checkbox>
                  </v-flex>
                  <v-flex xs6 sm6 md2>
                    <v-checkbox
                      v-model="status"
                      label="Kích hoạt"
                      color="success"
                      :value="false"
                      hide-details
                    ></v-checkbox>
                  </v-flex>
                  <v-flex xs6 sm6 md2>
                    <v-checkbox
                      v-model="hotFlag"
                      label="Phòng hot"
                      color="success"
                      :value="false"
                      hide-details
                    ></v-checkbox>
                  </v-flex>
                </v-layout>                                                                          
              </v-form>                                                       
              <v-layout row wrap mt-2 >
                  <v-flex xs12 sm12 md12 style="display: flex !important;justify-content: center !important;">                   
                    <v-btn color="blue darken-1" dark @click="ThemPhong" >Xác nhận</v-btn>
                    <v-btn color="yellow darken-1" dark  >Hủy</v-btn>
                  </v-flex>
              </v-layout>  
            </v-container>
          </v-card-text>          
        </v-card>
      </v-dialog>
    </v-layout>
    <v-card flat v-for="phong in dsPhong" :key="phong._id">
      <v-layout row wrap>
        <v-flex>
          <div class="caption grey--text">Tên Phòng</div>
          <div>{{phong.TenPhong}}</div>
        </v-flex>
        <v-flex>
          <div class="caption grey--text">Số Điện</div>
          <div>{{phong.SoDien}}</div>
        </v-flex>
        <v-flex>
          <div class="caption grey--text">Số Nước</div>
          <div>{{phong.SoNuoc}}</div>
        </v-flex>
        <v-flex>
          <div class="caption grey--text">Giá Phòng</div>
          <div>{{phong.giaPhong}}</div>
        </v-flex>
        <v-flex>
          <div class="caption grey--text">Loại Phòng</div>
          <div>{{phong.loaiPhongID}}</div>
        </v-flex>
        <v-flex>
          <div class="caption grey--text">Khu Phòng</div>
          <div>{{phong.khuPhongID}}</div>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>
<script src="./listPhong.js"></script>
<style>
  .danhsachPT {
    border-bottom: 4px solid tomato;  
  }
</style>