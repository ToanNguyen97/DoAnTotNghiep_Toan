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
            <v-list-tile-avatar>
              <img src="https://scontent.fdad3-2.fna.fbcdn.net/v/t1.0-9/51668716_409788743163726_5283625250930556928_n.jpg?_nc_cat=104&_nc_oc=AQkQIuzMfnnz38Kj24cqTrKEuezZlStqfvqj0We_adO3uhmPrg-LtrKNiQcApweFc3g&_nc_ht=scontent.fdad3-2.fna&oh=e09662684de02af3643d20364e57e7be&oe=5CE92585" alt="John">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{user.userName}}</v-list-tile-title>
              <v-list-tile-sub-title>Dương Thị Bích Vân</v-list-tile-sub-title>
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
          <v-list-tile v-for="item in items" :key="item.name">
            <v-list-tile-action>
               <v-icon left>{{item.icon}}</v-icon> 
            </v-list-tile-action>
            <router-link :to="item.path" style="text-decoration:none;"><v-list-tile-title>{{item.name}}</v-list-tile-title></router-link>
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
  <NavigationDrawer @input="input" v-if="user" :permission="user && user.roles" :mini="mini" :check="check" />
  <!-- <v-navigation-drawer v-model="drawer" >
    <p>test</p>
  </v-navigation-drawer> -->
</nav>
</template>

<script src="./Toolbar.js">
</script>

<style>
#btnList {
  min-width: 50px;
}
</style>
