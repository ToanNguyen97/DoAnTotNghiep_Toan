<template>
  <v-dialog :value="value" max-width="700px" persistent >
  <v-card>         
    <v-card-text>
      <v-container fluid grid-list-md>
        <v-layout  justify-center>
          <h1 class="mb-2 danhsachHD">Thông Tin Phiếu Thu</h1>    
        </v-layout> 
        <v-layout row wrap>
          <v-flex xs12 sm12 md12>
            <v-card>
               <v-card-text >
                 <v-layout row wrap>
                   <v-flex xs12 sm6 md3>
                    <v-avatar size="100" tile>
                      <img height="144" v-if="value" :src='`//localhost:3003/image/${phieuThuTienSelect.anhChinh}`' >
                    </v-avatar>                
                   </v-flex>
                   <v-flex xs12 sm6 md9>
                     <v-text-field outline readonly hide-details label="Tên phòng" v-model="phieuThuTienSelect.tenPhong"></v-text-field>      
                     <v-text-field style="padding-bottom:4px" readonly hide-details label="Số điện cũ" :value="formData.soDien" append-icon="fas fa-bolt"></v-text-field>    
                     <v-text-field style="padding-bottom:4px"  type="number"  hide-details label="Số điện mới" v-model="formData.soDienMoi" append-icon="fas fa-bolt"></v-text-field>    
                     <v-text-field style="padding-bottom:4px"  readonly hide-details label="Số nước cũ" :value="formData.soNuoc" append-icon="fas fa-tint"></v-text-field>       
                     <v-text-field style="padding-bottom:4px" type="number"   hide-details label="Số nước mới" v-model="formData.soNuocMoi" append-icon="fas fa-tint"></v-text-field>       
                     <v-textarea style="padding-bottom:4px"   hide-details label="Nhắc nhở" v-model="formData.moTa" placeholder="Một số lưu ý" ></v-textarea>       
                   </v-flex>
                 </v-layout>
                </v-card-text>
            </v-card>
          </v-flex>      
        </v-layout>                                                          
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

<script src="./popupPhieuThuTien.js">
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
.danhsachHD {
    border-bottom: 4px solid tomato;  
}
.titleinfo {
  border-bottom: 2px solid  tomato
}
 .v-chip.true {
   background: blue
 }
 .v-chip.false {
  background: pink
 }

</style>


