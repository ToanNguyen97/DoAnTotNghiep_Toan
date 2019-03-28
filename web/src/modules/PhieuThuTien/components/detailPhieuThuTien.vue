<template>
  <div style="background-color: #fff; border-radius:10px;" class="detailphieuthu">
    <v-layout row wrap justify-start class="ml-2 pl-1">
      <h1 class="mb-2 detailPT">Phiếu thu tiền: {{phong && phong.tenPhong}}</h1>    
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6 md3>
         <v-card style="margin-left: 13px; margin-bottom:10px;">
              <v-img v-if="phong && phong.anhChinh"
                :src="`//localhost:3003/image/${phong.anhChinh}`"
                height="200px"
              >
              </v-img>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{phong && phong.khuPhongID && phong.khuPhongID.tenKhuPhong}}: <span class="subheading">{{phong && phong.loaiPhongID && phong.loaiPhongID.tenLoaiPhong}}</span> </div>               
              </div>
            </v-card-title>
            <v-card-text class="py-0" v-if="phong && phong.giaPhong">
              <span >Giá phòng: {{phong.giaPhong | formatCurrentcy}}</span> <br>
              <span>Số điện: {{ phong.soDien}} Kwh</span> <br>     
              <span>Số nước: {{ phong.soNuoc}} Khối</span>     
            </v-card-text>
            <v-card-actions>
              <v-btn flat>Share</v-btn>
              <v-btn flat color="purple">Explore</v-btn>
            </v-card-actions>
          </v-card>
      </v-flex>
      <v-flex  xs12 sm6 md9 >
        <v-card style="margin-left: 13px; margin-bottom:10px;">
          <v-card-title>
            <div class="headline">Danh sách phiếu thu</div> 
            <v-spacer></v-spacer>
            <v-text-field
              style="width: 0px;"
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table v-if="phong && phong.dsPhieuThu"
            :headers="headers"
            :items="phong.dsPhieuThu"
            :search="search"
            hide-actions
            :pagination.sync="pagination"
          >
            <template v-slot:items="props">
              <td class="text-xs-left">{{ props.item._id }}</td>
              <td class="text-xs-left">{{ props.item.ngayLap | formatDate }}</td>
              <td class="text-xs-left">{{ props.item.ngayHetHan | formatDate }}</td>
              <td class="text-xs-left"><v-chip :color="props.item.tinhTrangPhieuThu === 'chưa đóng'?'amber':(props.item.tinhTrangPhieuThu === 'đã đóng'?'green accent-4':'deep-orange darken-1')" class="white--text">{{ props.item.tinhTrangPhieuThu }}</v-chip></td>
              <td class="text-xs-left">
                <v-btn color="indigo" outline flat small depressed @click="ViewDetail(props.item)" >Xem Chi Tiết</v-btn>                 
              </td>
            </template>
          </v-data-table>
          <div class="text-xs-center pt-2">
            <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
          </div>
        </v-card>
         <v-card style="margin-left: 13px; margin-bottom:10px;">
            <v-card-title primary-title>
              <div class="headline">Thông tin chi tiết phiếu tháng {{tenThang}}</div>
              <v-spacer></v-spacer>
              <v-btn color="success" :disabled="disabled" @click="ThanhToan" style="text-transform: none;" outline  >Thanh Toán <v-icon right dark>fas fa-dollar-sign</v-icon></v-btn>
              <v-btn color="info" @click="SendMail" style="text-transform: none;" outline>Gửi Mail <v-icon dark right>email</v-icon></v-btn>
            </v-card-title>
            <v-card-text v-if="phong.dsPhieuThu">
              <v-layout row wrap>
                <v-flex xs4 sm4 md1>
                  <div class="subheading pb-1" >Dịch vụ</div>
                </v-flex>
                <v-flex sm4 md2>
                  <div class="subheading pb-1" style="text-align:center;">Chỉ số cũ</div>              
                </v-flex>
                <v-flex sm4 md2>
                  <div class="subheading pb-1" style="text-align:center;">Chỉ số mới</div>             
                </v-flex>
                <v-flex sm4 md1>
                  <div class="subheading pb-1">Số lượng</div>             
                </v-flex>
                <v-flex sm4 md2>
                  <div class="subheading pb-1" style="text-align:center;">Đơn giá</div>
                </v-flex>
                <v-flex xs4 sm4 md2>
                  <div >
                    <div class="subheading pb-1" style="text-align:center;">Đơn vị tính</div>
                  </div>
                </v-flex>
                <v-flex sm4 md2>
                  <div class="subheading pb-1" style="text-align:center;">Thành tiền</div>
                </v-flex>              
              </v-layout>
              <v-divider style="margin-top:5px;"></v-divider>
              <v-card flat v-for="phieuthu in dsCTPT" :key="phieuthu._id">
                <v-layout row wrap  mt-1>                
                  <v-flex xs4 sm4 md1 style="padding-top: 6px;">
                    <div >{{phieuthu.cacKhoanThuID.tenKhoanThu}}</div>
                  </v-flex>
                  <v-flex sm4 md2 style="padding-top: 6px;">
                    <div style="text-align:center;">{{phieuthu.chiSoCu}}</div>
                  </v-flex>
                  <v-flex sm4 md2 style="padding-top: 6px;">
                   <div style="text-align:center;">{{phieuthu.chiSoMoi}}</div>
                  </v-flex>
                  <v-flex v-if="phieuthu.chiSoMoi" sm4 md1 style="padding-top: 6px;">
                   <div >{{phieuthu.chiSoMoi - phieuthu.chiSoCu}}</div>
                  </v-flex>
                  <v-flex v-else sm4 md1 style="padding-top: 6px;">
                   <div >1</div>
                  </v-flex>
                  <v-flex sm4 md2 style="padding-top: 6px;">
                   <div style="text-align:center;">{{phieuthu.donGia | formatCurrentcy}}</div>
                  </v-flex>
                  <v-flex xs4 sm4 md2>
                    <div style="text-align:center;"><v-chip small color="info" class="white--text my-2`">{{phieuthu.cacKhoanThuID.donViTinh}}</v-chip></div>
                  </v-flex>
                  <v-flex v-if="phieuthu.chiSoMoi > 0" sm4 md2 style="padding-top: 6px;">
                    <div style="text-align:center;">{{(phieuthu.chiSoMoi - phieuthu.chiSoCu)*phieuthu.donGia | formatCurrentcy}}</div>
                  </v-flex>                
                  <v-flex v-else sm4 md2 style="padding-top: 6px;">
                    <div style="text-align:center;">{{phieuthu.donGia | formatCurrentcy}}</div>
                  </v-flex>                
                </v-layout>
                <v-divider style="margin-top:5px;"></v-divider>
              </v-card>
              <v-layout row justify-end style="padding-top: 10px; padding-right: 53px;">
                <div>Tổng tiền: {{tongTien | formatCurrentcy}}</div>
              </v-layout>
            </v-card-text>
          </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>

    </v-layout>
  </div>
</template>

<script src="./detailPhieuThuTien.js">
</script>

<style scoped>
  .detailPT {
    border-bottom: 4px solid tomato; 
  }
</style>