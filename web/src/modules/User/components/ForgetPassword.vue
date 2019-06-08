<template>
<v-dialog :value="value" max-width="500" persistent>
  <v-card>
    <v-card-title class="justify-center">
      <div class="format-div display-1"><span>Quên Mật Khẩu</span></div> 
    </v-card-title>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-text>
        <v-flex md12>
          <v-text-field outline v-model="formData.email" :rules="emailRules" append-icon="email" label="Email"></v-text-field>
        </v-flex>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn color="success" @click="GetPass">Lấy Mật Khẩu</v-btn>
        <v-btn color="amber" @click="Huy" dark>Đóng</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</v-dialog>
</template>

<script src="./ForgetPassword.js"></script>