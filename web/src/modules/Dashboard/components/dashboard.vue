<template>
<div style="background-color: #fff; border-radius:10px " class="dashboard">
  <v-layout row wrap class="ml-2 ">
    <h1 class="mb-2 danhsachPT">Tổng quan</h1>    
  </v-layout>
  <v-layout row pt-2 style="justify-content:center;">
    <v-card width="1300" height="155" color="white">      
      <v-layout align-center justify-center row fill-height>
        <v-flex md3>
          <div style="display:flex; flex-direction: column;">
            <v-icon color="success" class="fix-content" large>fas fa-users</v-icon>
            <span class="textfomat">{{countKhach}}</span>
            <span style="text-align:center;">Tổng Số Khách</span>     
          </div>
        </v-flex>
        <hr class="format-hr">
        <v-flex md3>
          <div style="display:flex; flex-direction: column;">
            <v-icon color="red" class="fix-content" large>fas fa-comments-dollar</v-icon>
            <span class="textfomat">{{countMoney.tongTien}}</span>
            <span style="text-align:center;">Tổng Số Tiền Tháng: <span class="font-weight-bold">{{countMoney.thang}}</span></span>     
          </div>
        </v-flex>
        <hr class="format-hr">
        <v-flex md3>
          <div style="display:flex; flex-direction: column;">
            <v-icon color="cyan" class="fix-content" large>far fa-address-card</v-icon>
            <span class="textfomat">{{countHopDong}}</span>
            <span style="text-align:center;">Tổng Số Hợp Đồng</span>     
          </div>
        </v-flex>
        <hr class="format-hr" style="background-color:black;">  
        <v-flex md3>
          <div style="display:flex; flex-direction: column;">
            <v-icon color="amber" dark class="fix-content" large>fas fa-house-damage</v-icon>
            <span class="textfomat">{{countPhong}}</span>
            <span style="text-align:center;">Tổng Số Phòng Đã Thuê</span>     
          </div>
        </v-flex>
      </v-layout>    
    </v-card>
  </v-layout>
<v-container>
<v-layout row justify-space-between style="margin-top:15px;" >
  <Chart class="pr-3" />
  <CirleChart />
</v-layout>
</v-container>
</div>
</template>

<script src="./dashboard.js">
</script>
<style  scoped>
.fix-content {
  text-align:center;

}
.textfomat {
  text-align:center;
  font-size: 42px;
}
.format-hr {
  height: 76px;
  background-color: black;
}

</style>