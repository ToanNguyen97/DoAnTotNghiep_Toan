<template>
  <div style="background-color: #fff; border-radius:10px" class="danhsachphong">
    <v-layout row wrap justify-start class="ml-2 pl-1">
      <h1 class="mb-2 danhsachPT">Danh sách phòng trọ:</h1>    
    </v-layout>
    <v-layout row wrap>
       <popupPhong v-model="edit" :phongSelect="phongSelect || {}"/>
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
            <td class="text-xs-center"><img height="100" :src="`//localhost:3003/image/${props.item.anhChinh}`" alt=""></td>
            <td class="text-xs-center">{{ props.item.soDien }}</td>
            <td class="text-xs-center">{{ props.item.soNuoc }}</td>
            <td class="text-xs-center">{{ props.item.giaPhong | formatCurrency }}</td>
            <td class="text-xs-center">{{ props.item.khuPhongID.tenKhuPhong }}</td>
            <td class="text-xs-center">{{ props.item.loaiPhongID.tenLoaiPhong}}</td>
            <td class="justify-center text-xs-center">
             <v-layout row justify-center>    
              <v-tooltip  top class="my-3">
                <v-icon slot="activator" small @click="GotoEdit(props.item)">edit</v-icon>
                <span>sửa</span>
              </v-tooltip>
              <v-tooltip top class="my-3">
                <v-icon slot="activator" small @click="OpenSnackback(props.item._id)">delete</v-icon>
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
  </div>
</template>
<script src="./listPhong.js">
</script>
<style scoped>
  .div-danhsach {
    padding-top: 30px;
    padding-left: 5px;
  }
  .danhsachPT {
    border-bottom: 4px solid tomato;  
  }
</style>