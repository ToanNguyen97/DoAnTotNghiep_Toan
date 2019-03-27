<template>
  <div style="background-color: #fff; border-radius:10px; height: 580px;" class="detailphieuthu">
    <v-layout row wrap justify-start class="ml-2 pl-1">
      <h1 class="mb-2 detailPT">Phiếu thu tiền: {{phong && phong.tenPhong}}</h1>    
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6 md3>
         <v-card style="margin-left: 13px;">
            <v-img v-if="phong != {}"
              :src="`//localhost:3003/image/${phong.anhChinh}`"
              height="200px"
            >
            </v-img>
            <v-card-title primary-title>
              <div>
                <div class="headline">Top western road trips</div>
                <span class="grey--text">1,000 miles of wonder</span>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat>Share</v-btn>
              <v-btn flat color="purple">Explore</v-btn>
            </v-card-actions>
          </v-card>
      </v-flex>
      <v-flex  xs12 sm6 md9 >
         <v-card style="margin-left: 13px;">
            <v-card-title primary-title>
              <div>
                <div class="headline">Thông tin phiếu thu: tháng</div>
              </div>
            </v-card-title>
            <v-card-text v-if="phong.dsPhieuThu">
              <v-card flat v-for="phieuthu in phong.dsPhieuThu[0].dsCTPT" :key="phieuthu._id">
                <v-layout row wrap >
                  <v-flex xs4 md1>
                    <div class="caption grey--text">STT</div>
                    <div>{{phieuthu.STT}}</div>
                  </v-flex>
                  <v-flex xs4 sm4 md2>
                    <div class="caption grey--text">Dịch vụ</div>
                    <div>{{phieuthu.cacKhoanThuID.tenKhoanThu}}</div>
                  </v-flex>
                  <v-flex sm4 md2>
                    <div class="caption grey--text">Chỉ số cũ</div>
                    <div>{{phieuthu.chiSoCu}}</div>
                  </v-flex>
                  <v-flex sm4 md2>
                    <div class="caption grey--text">Chỉ số mới</div>
                    <div>{{phieuthu.chiSoMoi}}</div>
                  </v-flex>
                  <v-flex sm4 md2>
                    <div class="caption grey--text">Đơn giá</div>
                    <div>{{phieuthu.cacKhoanThuID.giaKhoanThu.toLocaleString()}}</div>
                  </v-flex>
                  <v-flex xs4 sm4 md2>
                    <div >
                      <div class="caption grey--text">Đơn vị tính</div>
                      <v-chip small color="info" class="white--text my-2`">{{phieuthu.cacKhoanThuID.donViTinh}}</v-chip>
                    </div>
                  </v-flex>
                  <v-flex sm4 md1>
                    <div class="caption grey--text">Thành tiền</div>
                    <div>{{(phieuthu.chiSoMoi - phieuthu.chiSoCu)*phieuthu.cacKhoanThuID.giaKhoanThu}}</div>
                  </v-flex>                
                </v-layout>
                <v-divider></v-divider>
              </v-card>
            </v-card-text>
            <v-card-actions>
              <v-btn flat>Share</v-btn>
              <v-btn flat color="purple">Explore</v-btn>
            </v-card-actions>
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