<template>
<nav>
  <v-toolbar flat app style="padding-left: 0px;">
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
              <v-list-tile-title>Admin</v-list-tile-title>
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
           
        </v-list>
      </v-card>
    </v-menu>
  </div>
    </div>
    
  </v-toolbar>
  <NavigationDrawer @input="input" :mini="mini" :check="check" />
  <!-- <v-navigation-drawer v-model="drawer" >
    <p>test</p>
  </v-navigation-drawer> -->
</nav>
</template>

<script>
import NavigationDrawer from '@/views/core/Admin/NavigationDrawer'
export default {
  components: {
    NavigationDrawer
  },
  data () {
    return {
      fav: true,
      menu: false,
      hints: true,
      mini: true,
      check: true,
      icon: 'format_list_bulleted',
      items: [
        {name: 'About me', icon: 'people', path: '/about'},
        {name: 'Cập nhật', icon: 'edit', path: '/login'},
        {name: 'Thoát', icon: 'arrow_forward', path: '/login'}
      ]
    }
  },
  methods: {
    input (data) {
      this.$emit('input', data)
    },
    goToInfo () {
      this.$router.push({name: 'Login'})
    },
    changeMini () {
      this.mini = !this.mini
      if(this.mini == false)
      {
        this.icon = 'format_align_center'
        this.check = false
      }
      else
      {
        this.icon = 'format_list_bulleted'
        this.check = true
      }
    }
  }
}
</script>

<style>
.search-txt {
  border-radius: 5px solid #e84118;
  margin-top: 10px;
  background: none;
  outline: none;
  float: left;
  color: black;
  font-size: 16px;
  transition: 0.4s;
  line-height: 30px;
  width: 240px;
}
.search-btn {
  color: #e84118 !important;
  float: left;
  border-radius: 50%;
  background: #2f3640;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
}

.search-btn:hover >.search-txt {
  width: 240px !important;
}
#btnList {
  min-width: 50px;
}
</style>
