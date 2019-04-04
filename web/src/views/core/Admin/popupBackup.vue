<template>
  <v-dialog :value="value" persistent max-width="500px">
    <v-card >
      <v-card-title class="justify-center">
       <div class="heading backup" >Vui lòng chọn thự mục để chứa dữ liệu</div>
      </v-card-title>
      <v-card-text>
        <div style="display:flex; justify-content:center">
          <input type="file" hidden ref="file" @change="getfolder" webkitdirectory  />
          <v-btn color="success" @click="chooseFile">Chọn thư mục</v-btn>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-layout justify-center>
          <v-btn color="success" v-if="restore" @click="SaoLuu" >Phục Hồi</v-btn>
          <v-btn color="success" v-else @click="SaoLuu" >Sao Lưu</v-btn>
          <v-btn color="red" dark  @click="Huy()">Đóng <v-icon>close</v-icon></v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script src="./popupBackup.js"></script>

<style >
  .backup {
    border-bottom: 2px solid tomato;  
  }
</style>