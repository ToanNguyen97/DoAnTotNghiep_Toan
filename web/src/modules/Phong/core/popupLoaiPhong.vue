<template>
<v-dialog :value="value" max-width="700px" persistent >
  <v-toolbar flat color="white">
      <v-toolbar-title class="headline font-weight-bold">Danh sách loại phòng</v-toolbar-title>
      <v-spacer></v-spacer>
    <v-icon color="red" @click="Huy">close</v-icon>    
    </v-toolbar>
  <v-layout row style="background-color:#fff;">
    <v-flex md8  >
      <v-data-table  hide-actions :pagination.sync="pagination" :headers="headers" :items="dsLoaiPhong" class="elevation-1">
        <template v-slot:items="props">
          <td class="text-xs-center">
            <v-edit-dialog :return-value.sync="props.item.tenKhuPhong" lazy > {{ props.item.tenLoaiPhong}}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.tenLoaiPhong"
                  label="Sửa tên"
                  single-line
                  @keyup.enter="Edit(props.item)"
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </td>
          <td class="text-xs-center">
            <v-edit-dialog :return-value.sync="props.item.giaPhong" lazy > {{ props.item.giaPhong}}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.giaPhong"
                  label="Sửa mô tả"
                  single-line
                  @keyup.enter="Edit(props.item)"
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </td>
        </template>
      </v-data-table>
      <div class="text-xs-center pt-2" >
        <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
      </div>
    </v-flex>
    <v-flex md4 >
      <v-text-field class="px-5" hide-details v-model="formData.tenLoaiPhong" label="Nhập loại phòng"></v-text-field>
      <v-text-field class="px-5 mb-2" rows="3" hide-details v-model="formData.giaPhong" label="Nhập giá phòng"></v-text-field>
      <v-btn :loading="loading" style="margin:auto 40px;" @click="XacNhan" color="success">Thêm Loại Phòng</v-btn>
    </v-flex>
  </v-layout>
</v-dialog>
</template>
<script src='./popupLoaiPhong.js'>
</script>