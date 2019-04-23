<template>
<div style="background-color: #fff; border-radius:10px;" class="detailphieuthu">
  <v-layout row wrap justify-start class="ml-2 pl-1">
    <h1 class="mb-2 detailTK">Thống Kê Hợp Đồng</h1>    
  </v-layout>
  <v-layout>
    <v-flex md3>
      <v-card class="boxThongKe mb-3" >
        <v-card-title >
          <span class="title font-weight-bold">Nhập thông tin cần thống kê</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="py-0">
          <date-picker class="pt-2 px-2" v-model="formData.ngayThongKe" :lang="lang" format="DD-MM-YYYY" confirm range pickers ></date-picker>
          <v-layout row wrap class="px-2 checkbox">
            <v-checkbox hide-details class="checkChuaThue pr-2" v-model="formData.tieuChi" value="hdLap" label="Hợp Đồng Lập"></v-checkbox>
            <v-checkbox hide-details class="checkChuaThue pr-2" v-model="formData.tieuChi" value="hdKT" color="success"  label="Hợp Đồng Hết Hạn"></v-checkbox>
          </v-layout>
          <div class="text-md-center mt-2">
            <v-btn color="info" :loading="loadingTK" @click="ThongKePhong" depressed>Xác Nhận</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex md9 ml-5 v-show="dsHD && dsHD.length >0">
      <v-layout ml-2 pb-2>
        <v-card>
          <v-card-title>
            <span class="title font-weight-bold">Kết quả thống kê</span>
          <v-divider class="mx-2" inset vertical ></v-divider>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn outline color="amber" v-on="on"  flat dark depressed icon ><v-icon>mail</v-icon></v-btn>
            </template>
            <span>Báo hết hạn</span>
          </v-tooltip>
          <download-excel v-if="dsHD && dsHD.length > 0" :data="dsHD" title="Thống Kê Hợp Đồng Hết Hạn" :fields="exportHeader"  worksheet="Hợp Đồng Hết Hạn" name='hopdonghethan.xls'>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn outline color="success"  v-on="on" flat dark depressed icon ><v-icon color="success" >fas fa-file-download</v-icon></v-btn>
                </template>
                <span>Xuất Exel</span>
              </v-tooltip>
            </download-excel>
          <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search" label="Nhập thông tin tìm kiếm" single-line hide-details ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="dsHD"
            :search="search"
            hide-actions
            :pagination.sync="pagination"
          >
            <template v-slot:items="props">
              <td class="text-xs-right">{{ props.item._id }}</td>
              <td class="text-xs-right">{{ props.item.khachThueID && props.item.khachThueID.hoKhachThue}} {{ props.item.khachThueID &&  props.item.khachThueID.tenKhachThue}}</td>
              <td class="text-xs-right">{{props.item.phongID &&  props.item.phongID.tenPhong}}</td>
              <td class="text-xs-right">{{ props.item.ngayLap | formarDate}}</td>
              <td class="text-xs-right">{{ props.item.ngayKetThuc | formarDate}}</td>
            </template>
            <template  v-slot:no-results>
              <v-alert :value="true" color="error" icon="warning">
                Từ khóa tìm kiếm  "{{ search }}" không có kết quả.
              </v-alert>
            </template>
            <template  v-slot:no-data>
              <v-alert :value="true" color="info" icon="warning">
                Chưa có kết quả thống kê
              </v-alert>
            </template>
          </v-data-table>
          <div class="text-xs-center pt-2">
            <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
          </div>
        </v-card>
      </v-layout>
    </v-flex>
  </v-layout>
</div>
</template>
<script src="./thongKeHopDong.js">
</script>
<style scoped>
 .detailTK {
    border-bottom: 4px solid tomato; 
  }
  .boxThongKe {
    margin-left: 12px;
    width: fit-content;
  }
  .checkbox > .v-label {
    color: black !important;
  }
</style>

