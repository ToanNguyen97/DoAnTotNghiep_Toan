<template>
<v-dialog :value="value" max-width="700px" persistent >
  <v-toolbar flat color="white">
      <v-toolbar-title class="headline font-weight-bold">Nhóm người sử dụng</v-toolbar-title>
      <v-spacer></v-spacer>
    <v-icon color="red" @click="Huy">close</v-icon>    
    </v-toolbar>
  <v-layout row style="background-color:#fff;">
    <v-flex md8  >
      <v-data-table  hide-actions :pagination.sync="pagination" :headers="headers" :items="dsRoleGroup" class="elevation-1">
        <template v-slot:items="props">
          <td class="text-xs-left">
            <v-edit-dialog :return-value.sync="props.item.nameRoleGroup" lazy > {{ props.item.nameRoleGroup}}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.nameRoleGroup"
                  label="Sửa tên"
                  single-line
                  @keyup.enter="Edit(props.item)"
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </td>
          <td class="text-xs-left">{{props.item.dsNhanVien && props.item.dsNhanVien.length }}</td>
        </template>
      </v-data-table>
      <div class="text-xs-center pt-2" >
        <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
      </div>
    </v-flex>
    <v-flex md4 >
      <v-text-field class="px-5" v-model="formData.nameRoleGroup" label="Nhập tên nhóm"></v-text-field>
      <v-btn :loading="loading" style="margin:auto 61px;" @click="XacNhan" color="success">Xác nhận</v-btn>
    </v-flex>
  </v-layout>
</v-dialog>
</template>
<script src='./popupRoleGroup.js'>
</script>