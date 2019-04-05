<template>
<nav style="display:flex; flex: 0 0 auto;">
  <v-toolbar flat app style="padding-left: 0px;" >
    <v-icon @click="changeMini">{{icon}}</v-icon>
    <v-toolbar-title>  
        <img :src="require('@/assets/logoAdmin.png')" alt="avatar">
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div style="display: flex;">
      <v-text-field
        append-icon="search"
      ></v-text-field>  
     <div class="text-xs-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template slot="activator">
        <v-btn small slot="activator" flat fab class="grey lighten-2" >   
        <v-icon large>account_circle</v-icon>
      </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-avatar v-if="user && user.userInfo">
              <img :src="`//localhost:3003/image/${ user.userInfo.anhDaiDien}`" alt="ảnh">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-if="user && user.roles && user.roles">{{user.roles}} </v-list-tile-title>
              <v-list-tile-sub-title v-if="user && user.userInfo && user.userInfo.hoNhanVien">{{user.userInfo.hoNhanVien}} {{user.userInfo.tenNhanVien}}</v-list-tile-sub-title>
              <v-list-tile-sub-title v-if="user && user.userInfo && user.userInfo.hoKhachThue">{{user.userInfo.hoKhachThue}} {{user.userInfo.tenKhachThue}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn
                :class="fav ? 'red--text' : ''"
                icon
                @click="fav = !fav"
              >
                <v-icon>favorite</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list>
          <v-list-tile class="pl-2">
            <v-list-tile-action >
              <v-btn flat color="pink" ><v-icon color="pink" left>fas fa-user-edit</v-icon>Cập nhật cá nhân</v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile class="pl-2">
            <v-list-tile-action >
              <v-btn flat color="green accent-4" @click="OpenPopupUser" ><v-icon color="green accent-4" left>fas fa-user-shield</v-icon>Cập nhật tài khoản</v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider></v-divider>
          <div style="display:flex;justify-content:center;">
            <v-btn small color="cyan" @click="LogOut" class="white--text" style="text-align:left; text-transform: none;"><v-icon left>fas fa-sign-out-alt</v-icon> Thoát</v-btn>
          </div>
           
        </v-list>
      </v-card>
    </v-menu>
  </div>
    </div>
    
  </v-toolbar>
  <NavigationDrawer @input="input" v-if="user" :permission="user && user.roles" :User="user && user.userInfo" :mini="mini" :check="check" />
  <popupUser v-model="openPopUser"/>
</nav>
</template>

<script src="./Toolbar.js">
</script>

<style>
#btnList {
  min-width: 50px;
}
</style>
