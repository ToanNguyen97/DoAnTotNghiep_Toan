<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <v-btn
                    slot="activator"
                    :href="source"
                    icon
                    large
                    target="_blank"
                  >
                    <v-icon large>code</v-icon>
                  </v-btn>
                  <span>Source</span>
                </v-tooltip>
                <v-tooltip right>
                  <v-btn slot="activator" icon large href="https://codepen.io/johnjleider/pen/wyYVVj" target="_blank">
                    <v-icon large>mdi-codepen</v-icon>
                  </v-btn>
                  <span>Codepen</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="Username" v-model="username" label="username" type="text"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" v-model="password" name="password" label="Password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="Login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
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
            toast.Success(`Xin chào ${res.credentials.userName}!`)
            this.$router.push({path: '/admin'})
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