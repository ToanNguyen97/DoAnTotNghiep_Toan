<template>
  <section id="popup-bookphong">
    <v-dialog :value="value" max-width="1000px" persistent >
      <v-card>
        <v-card-title primary-title>
          <div class="headline">Tên phòng : <span class="cyan--text">{{phongSelected.tenPhong}}</span></div>
          <v-spacer></v-spacer>
          <v-btn fab color="red" depressed small @click="$emit('input',false)" ><v-icon color="white">cancel</v-icon></v-btn>
        </v-card-title>
        <v-card-text class="pt-0">
          <div class="container pt-0">
            <v-text-field label="Họ Tên người đặt" v-model="formData.hoTenNguoiLienHe" prepend-icon="people"></v-text-field>
            <v-text-field v-model="formData.email"  label="Email" prepend-icon="email"></v-text-field>
            <v-text-field v-model="formData.soDienThoai" label="Số điện thoại" prepend-icon="fas fa-mobile-alt"></v-text-field>
            <v-layout row wrap justify-center>
              <v-btn color="primary" :loading="loadingLienHe" @click="LienHe()" depressed dark>Gửi liên hệ</v-btn>
              <v-btn color="purple" @click="Reset()" append-icon="fas fa-redo" depressed dark>Làm mới <v-icon right>cached</v-icon></v-btn>
            </v-layout>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </section>
</template>

<script src="./LienHe.js"></script>

<style scoped>
  
</style>