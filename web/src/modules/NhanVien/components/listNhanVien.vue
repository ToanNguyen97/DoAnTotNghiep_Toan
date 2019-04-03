<template>
 <div style="background-color: #fff; border-radius:10px " class="danhsachkhachthue">
    <v-layout row wrap justify-start class="ml-2 pl-1">
      <h1 class="mb-2 danhsachPT">Danh sách nhân viên:</h1>    
    </v-layout>
    <v-layout row wrap>
      <v-btn depressed @click="ResetPage"  color="cyan" dark class="mt-3 hidden-xs-only">Làm Mới</v-btn>
      <v-btn depressed fab small @click="ResetPage"  color="success" dark class="mt-3 hidden-md-only hidden-sm-only hidden-lg-only"><v-icon>refresh</v-icon></v-btn>
      <v-btn depressed @click="OpenThem"  color="success" dark class="mt-3 hidden-xs-only">Thêm Mới</v-btn>
      <v-btn depressed fab small @click="OpenThem"  color="success" dark class="mt-3 hidden-md-only hidden-sm-only hidden-lg-only"><v-icon>add_circle_outline</v-icon></v-btn>
      <v-btn depressed @click="OpenDeleteMulti" :disabled="disabled" color="warning" dark class="mt-3 hidden-xs-only">Xóa Nhiều</v-btn>
      <v-btn depressed fab small @click="OpenDeleteMulti" :disabled="disabled"  color="warning" dark class="mt-3 hidden-md-only hidden-sm-only hidden-lg-only"><v-icon>remove_circle_outline</v-icon></v-btn>
    </v-layout>
    <v-layout >
    </v-layout>
    <v-layout justify-center mt-2 column>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="dsNhanVien"
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
            <td class="text-xs-center">{{ props.item.hoNhanVien }} {{ props.item.tenNhanVien }}</td>
            <td class="text-xs-center"><img height="100" :src="`//localhost:3003/image/${props.item.anhDaiDien}`" alt=""></td>
            <td class="text-xs-center">{{ props.item.ngaySinh | formarDate }}</td>
            <td class="text-xs-center">{{ props.item.gioiTinh? 'Nam': 'Nữ' }}</td>
            <td class="text-xs-center">{{ props.item.soCMND }}</td>
            <td class="text-xs-center">{{ props.item.soDienThoai }}</td>
            <td class="text-xs-center">{{ props.item.diaChi}}</td>
            <td class="text-xs-center">
             <v-chip :color="props.item.ChucVu === 'nhân viên'? 'deep-orange ':(props.item.ChucVu === 'chủ trọ'? 'green accent-4': 'amber ')" class="white--text">{{ props.item.ChucVu }}</v-chip>
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
      <span>Bạn có chắc chắn muốn xóa {{this.tenNhanVien}}!</span>
      <v-btn color="success" @click="Delete">OK</v-btn>
      <v-btn color="red" @click="ResetSnackback">Cancel</v-btn>
    </v-snackbar>
    <v-snackbar v-model="snackbarMulti" top  color="warning">
      <span>Bạn có chắc chắn muốn xóa những nhân viên chọn!</span>
      <v-btn color="success" @click="DeleteMulti">OK</v-btn>
      <v-btn color="red" @click="ResetSnackbackMulti">Cancel</v-btn>
    </v-snackbar>
    <popupNhanVien v-model="edit" :isThem="isThem" :NhanVienSelect="NhanVienSelect || {}"/>
  </div>
</template>
<script src="./listNhanVien.js">
</script>

<style scoped>
  .div-danhsach {
    padding-top: 30px;
    padding-left: 5px;
  }
</style>
