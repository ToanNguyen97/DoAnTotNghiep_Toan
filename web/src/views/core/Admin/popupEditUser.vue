<template>
<v-dialog :value="value" max-width="500" persistent>
  <v-card>
    <v-card-title class="justify-center">
      <div class="format-div display-1"><span>Thông tin tài khoản</span></div> 
    </v-card-title>
    <v-card-text>
      <v-flex md12>
        <v-text-field outline v-model="formData.userName" append-icon="fas fa-id-card-alt" label="Tên tài khoản"></v-text-field>
      </v-flex>
      <v-flex md12>
        <v-text-field outline v-model="formData.email" append-icon="email" label="Email"></v-text-field>
      </v-flex>
      <v-flex md12 v-if="!changePass">
         <v-checkbox
            class="white--text"
            v-model="changePass"
            label="Đổi mật khẩu"
            color="info"
            :value="changePass"
            hide-details
          ></v-checkbox>
      </v-flex>
      <v-scale-transition >
        <v-flex md12 v-if="changePass">
          <v-text-field type="password" v-model="formData.oldPass" outline append-icon="fas fa-key" label="Mật khẩu cũ"></v-text-field>
        </v-flex>
      </v-scale-transition>
      <v-scale-transition >    
        <v-flex md12 v-if="changePass">
          <v-text-field type="password" outline v-model="formData.newPass" append-icon="fas fa-fingerprint" label="Mật khẩu mới"></v-text-field>
        </v-flex>
      </v-scale-transition>
      <v-scale-transition >
        <v-flex md12 v-if="changePass">
          <v-text-field type="password" outline v-model="formData.xacNhan" append-icon="fas fa-clipboard-check" label="Xác nhận mật khẩu"></v-text-field>
        </v-flex>
      </v-scale-transition>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn color="success">Lưu</v-btn>
      <v-btn color="amber" @click="Huy" dark>Đóng</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script src="./popupEditUser.js">
</script>

<style>
  .format-div {
    border-bottom: 4px sandybrown solid;
    text-align: center;
  }
</style>