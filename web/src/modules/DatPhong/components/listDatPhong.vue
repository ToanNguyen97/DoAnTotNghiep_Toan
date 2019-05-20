<template>
 <div style="background-color: #fff; border-radius:10px " class="danhsachkhachthue">
    <v-layout row wrap justify-start class="ml-2 pl-1">
      <h1 class="mb-2 danhsachPT">Danh sách khách đặt phòng:</h1>    
    </v-layout>
    <v-layout row wrap>
      <v-btn depressed @click="ResetPage"  color="cyan" dark class="mt-3 hidden-xs-only">Làm Mới</v-btn>
      <v-btn depressed fab small @click="ResetPage"  color="success" dark class="mt-3 hidden-md-only hidden-sm-only hidden-lg-only"><v-icon>refresh</v-icon></v-btn>
      <v-spacer></v-spacer>
      <div style="width:300px; margin-right:20px;">
         <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      </div>
    </v-layout>
    <v-layout justify-center mt-2 column>
      <v-data-table
        :search="search"
        :headers="headers"
        :items="dsKhachDatPhong"
        :pagination.sync="pagination"
        hide-actions
        class="elevation-1"
      >
        <template v-slot:items="props">
          <tr>
            <td class="text-xs-left">{{ props.item.hoNguoiBook }} {{props.item.tenNguoiBook}}</td>
            <td class="text-xs-left">{{ props.item.email }}</td>
            <td class="text-xs-left">{{ props.item.soDienThoai }}</td>
            <td class="text-xs-left">{{ props.item.soCMND }}</td>
            <td class="text-xs-left">{{ props.item.phongID.tenPhong }}</td>
            <td class="text-xs-left">{{ props.item.ngayBookPhong | formatDate }}</td>
            <td class="text-xs-left">{{ props.item.ngayNhanPhong | formatDate }}</td>
            <td class="text-xs-left"><v-chip :color="props.item.status === true?'green':'orange'" class="white--text">{{ props.item.status }}</v-chip></td>
            <td class="text-xs-left">
              <v-btn color="indigo" :disabled="props.item.status === true?false:true" outline flat fab small depressed @click="BookPhong(props.item)" ><v-icon>edit</v-icon></v-btn>                 
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-layout> 
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
    <LapHopDong v-model="openHopDong" :soDT="soDT || ''" :phongSelect="phongSelect || {}"/>
  </div>
</template>
<script src="./listDatPhong.js">
</script>

<style scoped>
  .div-danhsach {
    padding-top: 30px;
    padding-left: 5px;
  }
</style>
