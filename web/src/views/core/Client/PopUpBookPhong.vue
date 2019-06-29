<template>
  <section id="popup-bookphong">
    <v-dialog :value="value" max-width="1000px" persistent >
      <v-form  ref="form" v-model="valid" lazy-validation> 
        <v-card>
          <v-card-title primary-title>
            <div class="headline">Thông tin đặt phòng: <span class="cyan--text">{{phongSelected.tenPhong}}</span></div>
            <v-spacer></v-spacer>
            <v-btn fab color="red" depressed small @click="$emit('input',false)" ><v-icon color="white">cancel</v-icon></v-btn>
          </v-card-title>
          <v-card-text class="pt-0">
            <div class="container pt-0">
              <v-layout row justify-space-between>
                <v-flex md7>
                  <v-text-field label="Họ người đặt" v-model="formData.hoNguoiBook" :rules="hoNguoiBookRules" required :counter="20" prepend-icon="people"></v-text-field>
                </v-flex>
                <v-flex md4>
                  <v-text-field label="Tên người đặt" :rules="tenNguoiBookRules" required :counter="13" v-model="formData.tenNguoiBook" prepend-icon="people"></v-text-field>
                </v-flex>
              </v-layout>
              <v-text-field v-model="formData.email" :rules="emailRules" required  label="Email" prepend-icon="email"></v-text-field>
              <v-text-field v-model="formData.soCMND" type="number" :rules="soCMNDRules" required label="Số chứng minh/Passort" prepend-icon="fas fa-passport"></v-text-field>
              <v-text-field v-model="formData.soDienThoai" type="number"  :rules="soDienThoaiRules" :counter="13" required label="Số điện thoại" prepend-icon="fas fa-mobile-alt"></v-text-field>
              <v-text-field v-model="formData.diaChi" :rules="diaChiRules" :counter="100" required label="Địa chỉ" prepend-icon="place"></v-text-field>
              <v-layout row wrap>
                <v-flex md6>
                  <v-chip label outline color="green">Ngày nhận phòng</v-chip> <date-picker class="pt-2 px-2" v-model="formData.ngayNhanPhong"  :not-before="new Date()" required  :lang="lang" format="DD-MM-YYYY" confirm pickers ></date-picker>
                  <span v-if="!formData.ngayNhanPhong" class="red--text">*chọn ngày</span>
                </v-flex>
                <v-flex md6>
                  <v-btn color="primary" :loading="loadingBook" @click="Book()" depressed dark>Đặt Phòng</v-btn>
                  <v-btn color="purple" @click="Reset()" append-icon="fas fa-redo" depressed dark>Làm mới <v-icon right>cached</v-icon></v-btn>
                </v-flex>
              </v-layout>
            </div>
          </v-card-text>
        </v-card>
      </v-form>  
    </v-dialog>
  </section>
</template>

<script src="./PopUpBookPhong.js"></script>

<style scoped>
  
</style>