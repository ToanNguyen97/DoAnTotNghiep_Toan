<template>
  <v-img id="inspire"  style="height:100vh;" :lazy-src="require('@/assets/loginLazy.jpg')" :src="require('@/assets/login.jpg')"  class="grey lighten-2 loginForm">
   <template v-slot:placeholder>
      <v-layout fill-height align-center justify-center ma-0 >
        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
      </v-layout>
    </template>
    <div class="loginbox">
      <h1 style="text-align:center">Phòng Trọ Cô Mai</h1>
      <hr>
      <v-flex style="display:flex" justify-center>
        <div class="pt-4" style="width:400px;">
          <v-text-field append-icon="people" v-model="username"  type="text" hide-details background-color="white" dark label="Tên Đăng Nhập" outline ></v-text-field>
        </div>
      </v-flex>
      <v-flex style="display:flex" justify-center>
        <div class="pt-4" style="width:400px;">
          <v-text-field  append-icon="lock" v-model="password" @keyup.enter="Login" type="passWord" hide-details background-color="white" dark label="Mật Khẩu" outline ></v-text-field>
        </div>
      </v-flex>
      <v-flex style="display:flex" justify-center>
        <div class="pt-4" style="width:300px;text-align: center;">
          <v-btn color="cyan" :loading="loading" @click="Login" dark>Đăng Nhập</v-btn>
        </div>
      </v-flex>
      <v-flex style="display:flex" justify-end>
        <div class="pt-4" style="width:300px;text-align: center;">
          <router-link style="text-decoration:none;" class="pt-2 white--text" :to="{path:'/index.html'}">về trang chủ</router-link>
        </div>
        <div class="pt-4" style="width:300px;text-align: center;">
          <a href="" class="textlink">Quên mật khẩu?</a>        
        </div>
      </v-flex>
    </div>
  </v-img>
</template>

<script>
  import toast from '../plugins/toast.js'
  export default {
    data: () => ({
      drawer: null,
      username: '',
      password: '',
      loading: false
    }),
    props: {
      source: String
    },
    methods: {
      Login () {
        this.loading = true
        let payload = {userName: this.username, passWord: this.password}
        this.$store.dispatch('auth/login', payload).then(res => { 
          /*chúng ta check role của account đó nếu thuộc diện account admin thì vào admin,
            khách thì vào khách,
            còn các nhóm còn lại thì chuyển sang route admin (route admin là route mặc định)
          */
          if(res.isValid === true && res.credentials.status === false) {
            toast.Error('Vui lòng vào mail để kích hoạt tài khoản')
            this.loading = false
          }
          else if(res.isValid === true)
          {
            toast.Success(`Xin chào ${res.credentials.rolesGroupID.nameRoleGroup}: ${res.credentials.userInfo.tenNhanVien || res.credentials.userInfo.tenKhachThue}`)
            if(res.credentials.rolesGroupID._id === '5cc565ac9f49904f20b6211e') {
              this.$router.push({path: '/tong-quan.html'})
            }
            else if(res.credentials.rolesGroupID._id === '5cc565b39f49904f20b6211f') {
              this.$router.push({path: '/thong-tin-phong-dang-thue.html'})
            }
            else {
              this.$router.push({path: '/admin'})
            }
            this.loading = false
          }
          else if (res.credentials === null)
          {
            toast.Error(`Tài khoản ${this.username} không tồn tại`)
             this.loading = false
          }
          else {
            toast.Error(`Mật khẩu không đúng!`)
            this.loading = false
          }
        }).catch (error => {
          alert(error + ' Lỗi')
        })
      }
    }
  }
</script>
<style scoped>
  .loginbox {
    position: absolute;
    width: 589px;
    height: 350px;
    top:50%;
    left: 50%;
    background: rgba(0,0,0,.8);
    color: white;
    transform: translate(-50%,-50%);
    border-radius: 12px;
  }
  .textlink {
    color: white;
    text-decoration: none;
  }
</style>