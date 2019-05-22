<template>
<v-dialog :value="value" max-width="900px" persistent >
  <v-toolbar flat color="white">
      <v-toolbar-title class="headline font-weight-bold">Danh sách khoản thu</v-toolbar-title>
      <v-spacer></v-spacer>
    <v-icon color="red" @click="Huy">close</v-icon>    
    </v-toolbar>
  <v-layout row style="background-color:#fff;">
    <v-flex md8  >
      <v-data-table  hide-actions :pagination.sync="pagination" :headers="headers" :items="dsKhoanThu" class="elevation-1">
        <template v-slot:items="props">
          <td v-if="props.item._id !== '5c9b3dc77e5bed22acc4811a'" class="text-xs-center">
            <v-edit-dialog  :return-value.sync="props.item.tenKhuPhong" lazy > {{ props.item.tenKhoanThu}}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.tenKhoanThu"
                  label="Sửa tên"
                  single-line
                  @keyup.enter="Edit(props.item)"
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </td>
          <td v-if="props.item._id !== '5c9b3dc77e5bed22acc4811a'" class="text-xs-center">
            <v-edit-dialog :return-value.sync="props.item.giaKhoanThu" lazy > {{ props.item.giaKhoanThu}}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.giaKhoanThu"
                  label="Sửa mô tả"
                  single-line
                  @keyup.enter="Edit(props.item)"
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </td>
          <td v-if="props.item._id !== '5c9b3dc77e5bed22acc4811a'" class="text-xs-center">
            <v-edit-dialog :return-value.sync="props.item.donViTinh" lazy > {{ props.item.donViTinh}}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.donViTinh"
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
    <v-flex md4 mb-3>
      <v-text-field class="px-5" hide-details v-model="formData.tenKhoanThu" label="Nhập tên khoản thu"></v-text-field>
      <v-text-field class="px-5 mb-2" rows="3" hide-details v-model="formData.giaKhoanThu" label="Nhập giá"></v-text-field>
      <v-text-field class="px-5 mb-2" rows="3" hide-details v-model="formData.donViTinh" label="Nhập đơn vị tính"></v-text-field>
      <v-btn :loading="loading" style="margin:auto 40px;" @click="XacNhan" color="success">Thêm Khoản Thu</v-btn>
    </v-flex>
  </v-layout>
</v-dialog>
</template>
<script src='./popupGiaKhoanThu.js'>
</script>