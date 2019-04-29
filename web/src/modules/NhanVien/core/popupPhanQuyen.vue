<template>
 <v-dialog :value="value" max-width="1000px" persistent >
  <v-card>
    <v-card-title class="pb-0">
      <v-layout>
        <h1 class="mb-2 danhsachKT">Phân Quyền</h1>
        <v-spacer></v-spacer>
        <v-btn color="red" @click="Huy" dark fab small depressed><v-icon>close</v-icon></v-btn>  
      </v-layout>   
    </v-card-title>       
    <v-card-text class="pt-1">
      <v-layout class="boxPhanQuyen" mt-4 row justify-center>
        <v-flex pl-2 md5>
          <div>
          <v-chip outline label small hide-details class="ml-2 mt-4" color="orange" text-color="black">
            Nhóm Quyền
            <v-icon color="cyan" right @click="openRoleGroup = true">add</v-icon>
          </v-chip>
          <v-combobox
          hide-details
          :items="dsRoleGroup"
          flat
          placeholder="chọn nhóm"
          item-text= "nameRoleGroup"
          v-model="roleGroupSelect"
          color="success"
          style="max-width:150px; margin-left:10px;"
          ></v-combobox> 
          </div>
        </v-flex>
        <v-divider vertical ></v-divider>
        <v-flex  my-3 ml-3>
          <h1 class="headline font-weight-bold red--text">Chức năng của trang web</h1>
          <v-layout row wrap>
            <v-flex md6  v-for="item of dsRole" :key="item._id">
            <v-checkbox  v-model="formData.roles" class="mt-1" hide-details color="success" :value="item._id" :label="item.roleName"></v-checkbox>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>                            
      <v-layout row wrap mt-2>
          <v-flex xs12 sm12 md12 style="display: flex !important;justify-content: center !important;">                   
            <v-btn depressed color="blue darken-1" :loading="loading" dark @click="XacNhan" >Xác nhận</v-btn>
            <v-btn depressed color="yellow darken-1" dark @click="Huy" >Hủy</v-btn>
          </v-flex>
      </v-layout>  
    </v-card-text>
      <popupRoleGroup v-model="openRoleGroup"></popupRoleGroup>  
  </v-card>
</v-dialog>
</template>
<script src='./popupPhanQuyen.js'>
</script>
<style scoped>
  .boxPhanQuyen {
    border: 1px solid red;
  }
</style>