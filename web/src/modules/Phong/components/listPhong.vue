<template>
  <div style="background-color: #fff; border-radius:10px;" class="danhsachphong">
    <v-layout row wrap justify-start class="ml-2 pl-1">
      <h1 class="mb-2 danhsachPT">Danh sách phòng trọ:</h1>    
    </v-layout>
    <v-layout row wrap>
      <v-btn depressed @click="ResetPage"  color="cyan" dark class="mt-3 hidden-xs-only">Làm Mới</v-btn>
      <v-btn depressed fab small @click="ResetPage"  color="success" dark class="mt-3 hidden-md-only hidden-sm-only hidden-lg-only"><v-icon>refresh</v-icon></v-btn>
      <v-btn depressed @click="OpenThem"  color="success" dark class="mt-3 hidden-xs-only">Thêm Mới</v-btn>
      <v-btn depressed fab small @click="OpenThem"  color="success" dark class="mt-3 hidden-md-only hidden-sm-only hidden-lg-only"><v-icon>add_circle_outline</v-icon></v-btn>
      <v-btn depressed @click="OpenTimKiem"  color="info" dark class="mt-3 hidden-xs-only">Tìm kiếm</v-btn>
      <v-btn depressed fab small @click="OpenTimKiem"  color="info" dark class="mt-3 hidden-md-only hidden-sm-only hidden-lg-only"><v-icon>search</v-icon></v-btn> 
      <v-btn depressed @click="OpenDeleteMulti" :disabled="disabled" color="warning" dark class="mt-3 hidden-xs-only">Xóa Nhiều</v-btn>
      <v-btn depressed fab small @click="OpenDeleteMulti" :disabled="disabled"  color="warning" dark class="mt-3 hidden-md-only hidden-sm-only hidden-lg-only"><v-icon>remove_circle_outline</v-icon></v-btn>
    </v-layout>
    <v-layout >
    </v-layout>
    <v-layout justify-center mt-2 column>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="dsPhong"
        :pagination.sync="pagination"
        select-all
        hide-actions
        item-key="_id"
        class="elevation-1"
        :loading="loading"
      >
        <template v-slot:headers="props">
          <tr>
            <th>
              <v-checkbox
                :input-value="props.all"
                :indeterminate="props.indeterminate"
                primary
                hide-details
                @click.stop="toggleAll"
              ></v-checkbox>
            </th>
            <th
              v-for="header in props.headers"
              :key="header.text"
              :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
              @click="changeSort(header.value)"
            >
              <v-icon small>arrow_upward</v-icon>
              {{ header.text }}
            </th>
          </tr>
        </template>
        <template v-slot:items="props">
          <tr>
            <td  :active="props.selected" @click="props.selected = !props.selected">
              <v-checkbox
                :input-value="props.selected"
                primary
                hide-details
              ></v-checkbox>
            </td>
            <td class="text-xs-center">{{ props.item.tenPhong }}</td>
            <td class="text-xs-center"><img height="95" :src="`//localhost:3003/image/${props.item.anhChinh}`" alt=""></td>
            <td class="text-xs-center">{{ props.item.soDien }}</td>
            <td class="text-xs-center">{{ props.item.soNuoc }}</td>
            <td class="text-xs-center">{{ props.item.giaPhong | formatCurrency }}</td>
            <td class="text-xs-center">{{ props.item.khuPhongID.tenKhuPhong }}</td>
            <td class="text-xs-center">{{ props.item.loaiPhongID.tenLoaiPhong}}</td>
            <td class="text-xs-center">
            <v-chip :color="props.item.tinhTrangPhongID.tenTinhTrangPhong === 'Còn trống'?'cyan': (props.item.tinhTrangPhongID.tenTinhTrangPhong === 'Đã thuê'? 'green accent-4':(props.item.tinhTrangPhongID.tenTinhTrangPhong === 'Cho ở ghép'?'pink':'amber'))" class="white--text">{{props.item.tinhTrangPhongID.tenTinhTrangPhong}}</v-chip>  
            </td>
            <td class="justify-center text-xs-center">
             <v-layout row justify-center>    
              <v-tooltip  top class="my-3">
                <v-icon slot="activator" small @click="GotoEdit(props.item)">edit</v-icon>
                <span>sửa</span>
              </v-tooltip>
              <v-tooltip top class="my-3">
                <v-icon slot="activator" small @click="OpenSnackback(props.item)">delete</v-icon>
                <span>xóa</span>
              </v-tooltip>
              <v-tooltip top class="my-3">
                <v-icon  slot="activator"  small @click="GotoDetail(props.item._id)">error</v-icon>
                <span>chi tiết</span>
              </v-tooltip>
            </v-layout>   
          </td>
          </tr>
        </template>
      </v-data-table>
    </v-layout> 
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
    <v-snackbar v-model="snackbar" top  color="warning">
      <span>Bạn có chắc chắn muốn xóa {{this.tenPhong}}!</span>
      <v-btn color="success" @click="Delete">OK</v-btn>
      <v-btn color="red" @click="ResetSnackback">Cancel</v-btn>
    </v-snackbar>
    <v-snackbar v-model="snackbarMulti" top  color="warning">
      <span>Bạn có chắc chắn muốn xóa những phòng chọn!</span>
      <v-btn color="success" @click="DeleteMulti">OK</v-btn>
      <v-btn color="red" @click="ResetSnackbackMulti">Cancel</v-btn>
    </v-snackbar>
    <popupPhong v-model="edit" :isThem="isThem" :phongSelect="phongSelect || {}"/>
    <popupTimKiem v-model="open" />
  </div>
</template>
<script src="./listPhong.js">
</script>
<style scoped>
  .div-danhsach {
    padding-top: 30px;
    padding-left: 5px;
  }
</style>