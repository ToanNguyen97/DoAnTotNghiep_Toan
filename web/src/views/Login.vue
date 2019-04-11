<template>
  <v-app id="inspire" class="loginForm">
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
          <v-btn color="cyan" @click="Login" dark>Đăng Nhập</v-btn>
        </div>
      </v-flex>
      <v-flex style="display:flex" justify-end>
        <div class="pt-4" style="width:300px;text-align: center;">
          <a href="/"  class="textlink">Về trang chủ</a>
        </div>
        <div class="pt-4" style="width:300px;text-align: center;">
          <a href="" class="textlink">Quên mật khẩu?</a>        
        </div>
      </v-flex>
    </div>
  </v-app>
</template>

<script>
  import toast from '../plugins/toast.js'
  export default {
    data: () => ({
      drawer: null,
      username: '',
      password: ''
    }),
    props: {
      source: String
    },
    methods: {
      Login () {
        let payload = {userName: this.username, passWord: this.password}
        this.$store.dispatch('auth/login', payload).then(res => {          
          if(res.isValid === true)
          {
            toast.Success(`Xin chào ${res.credentials.roles}: ${res.credentials.userInfo.tenNhanVien || res.credentials.userInfo.tenKhachThue}`)
            if(res.credentials.roles === 'chủ trọ') {
              this.$router.push({path: '/tong-quan.html'})
            }
            else if(res.credentials.roles === 'nhân viên') {
              this.$router.push({path: '/danh-sach-phong.html'})
            }
            else {
              this.$router.push({path: '/thong-tin-phong-dang-thue.html'})
            }
            
          }
          else if (res.credentials === null)
          {
            toast.Error(`Tài khoản ${this.username} không tồn tại`)
          }
          else {
            toast.Info(`Mật khẩu không đúng!`)
          }
        }).catch (error => {
          alert(error + ' Lỗi')
        })
      }
    }
  }
</script>
<style scoped>
  #inspire {
    background: url(../assets/login.jpg) no-repeat;
    background-size: cover;
  }
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