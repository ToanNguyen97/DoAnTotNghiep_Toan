<template>
 <div style="background-color: #fff; border-radius:10px " class="danhsachphieuthu">
    <v-layout row wrap justify-start class="ml-2 pl-1">
      <h1 class="mb-2 danhsachPT">Phiếu Thu Tiền:</h1>    
    </v-layout>
    <v-layout row wrap>
      <v-btn depressed @click="ResetPage"  color="cyan" dark class="mt-3 hidden-xs-only">Làm Mới</v-btn>
      <v-btn depressed fab small @click="ResetPage"  color="success" dark class="mt-3 hidden-md-only hidden-sm-only hidden-lg-only"><v-icon>refresh</v-icon></v-btn>
      <v-combobox
        :items="dsKhuPhong"
        v-model="idKhuPhong"
        label="Khu Phòng"
        item-text= "tenKhuPhong"
        item-value= "_id"
        style="max-width:150px; margin-left:10px;"
      ></v-combobox>     
    </v-layout>
    <v-layout >
    </v-layout>
    <v-layout justify-center mt-2 column v-if="dsPhieuThuTien">
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
            <td class="text-xs-center">{{ props.item.soDien}} </td>
            <td class="text-xs-center">{{ props.item.soNuoc}}</td>
            <td class="text-xs-center">
              <v-chip  :color="$options.filters.checkPhieuThu(props.item.dsPhieuThu).value == 'c'? 'info':($options.filters.checkPhieuThu(props.item.dsPhieuThu).value == 'cd'?'amber':($options.filters.checkPhieuThu(props.item.dsPhieuThu).value == 'dd')?'green accent-4':'deep-orange darken-1')" text-color="white">{{ $options.filters.checkPhieuThu(props.item.dsPhieuThu).label}}</v-chip>
            </td>
            <td class="justify-center text-xs-left">
             <v-layout row justify-center>    
                <v-btn color="success"  outline flat small depressed @click="OpenThem(props.item)">Ghi Điện Nước</v-btn>
                <v-btn color="indigo" outline flat small depressed :to="`/chi-tiet-phieu-thu-tien/p.${props.item._id}.html`" >Xem Chi Tiết</v-btn>                 
            </v-layout>   
          </td>
          </tr>
        </template>
      </v-data-table>
    </v-layout> 
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>  
    <popupPhieuThuTien v-model="edit"  :isThem="isThem" :phieuThuTienSelect="phieuThuTienSelect || {}"/>
  </div>
</template>
<script src="./listPhieuThuTien.js">
</script>

<style scoped>
  .div-danhsach {
    padding-top: 30px;
    padding-left: 5px;
  }
</style>
