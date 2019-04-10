<template>
  <v-dialog :value="value" max-width=900 persistent>
    <v-card>
      <v-card-title primary-title>
        <div class="headline">Thông tin chi tiết phiếu tháng {{tenThang}}</div>
        <v-spacer></v-spacer>
          <v-btn fab color="red" depressed small @click="$emit('input',false)" ><v-icon color="white">cancel</v-icon></v-btn>
      </v-card-title>
      <v-card-text v-if="DetailCTPT">
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
        <v-card flat v-for="phieuthu in DetailCTPT.dsCTPT" :key="phieuthu._id">
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
        <v-layout row >
          <v-flex style="padding-top: 10px;">
            <span class="red--text">(*)</span> Lưu ý thanh toán bằng PayPal quy ra USD: <span class="font-weight-bold">{{(tongTien/23000).toFixed(2)}} $</span> (1 USD ~23.000 đ)
          </v-flex>
          <div class="font-weight-bold" style="justify-content: flex-end; display: flex; padding-top: 10px; padding-right: 43px;">
            Tổng tiền: {{tongTien | formatCurrentcy}}
          </div>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script src="./popupDetailPT.js">
</script>