<template>
  <div  @mouseover="check?isOpenMini = false:''" @mouseleave="check?isOpenMini = true:''" >
  <!--thuộc tính temporary: giúp làm bóng-->
    <v-navigation-drawer
      v-model="drawer"
      hide-overlay
      stateless
      width=250
      :mini-variant.sync="isOpenMini"
      clipped
      absolute      
      app
      id="navigation"   
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://scontent.fdad3-2.fna.fbcdn.net/v/t1.0-9/51668716_409788743163726_5283625250930556928_n.jpg?_nc_cat=104&_nc_oc=AQkQIuzMfnnz38Kj24cqTrKEuezZlStqfvqj0We_adO3uhmPrg-LtrKNiQcApweFc3g&_nc_ht=scontent.fdad3-2.fna&oh=e09662684de02af3643d20364e57e7be&oe=5CE92585">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Dương Thị Bích Vân</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <hr class="white"/>
        <v-list-tile v-if="showDashboard()">
          <v-list-tile-content>
            <v-list-tile-title >Hien thi</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon >chat_bubble</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-group
            v-for="item in menus"
            :key="item.title"
            v-model="item.active"
            :prepend-icon="item.action"
            
          >
            <template v-slot:activator>
              <v-list-tile :to="item.link">
                <v-list-tile-content>
                  <v-list-tile-title class="fonttext">{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-list-tile
              v-for="subItem in item.items"
              :key="subItem.title"
              :to="subItem.link"         
            >
            <v-list-tile-content>
                <template slot="activator">
                  <v-list-tile-title class="colortext">{{subItem.title }}</v-list-tile-title>
                </template>
                <span>{{ subItem.title }}</span>                                       
            </v-list-tile-content>
              <v-list-tile-action>
                <v-icon dark>{{ subItem.icon }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script src="./NavigationDrawer.js">
</script>

<style scoped>
.theme--light.v-list .v-list__group--active:before {
  background: transparent !important;
}
.white {
  border-color: #fff !important;
  width: 50%;
  margin: auto;
}
#OpenNavigation {
  min-width: 60px;
}
#navigation {
  position: fixed;
  background: #0098f0;
  background: -webkit-gradient(linear,left bottom,left top,from(#0098f0),to(#00f2c3));
  background: linear-gradient(0deg,#0098f0,#00f2c3);
  margin-top: 70px !important;
  margin-left: 10px;
  border-radius: 10px;
  display: block !important;
}
.v-navigation-drawer .v-list {
  background: transparent;
}

.fonttext {
  color: #fff !important;
}
.v-list__group__header__prepend-icon .v-icon {
    color: #fff;
}
.colortext {
  color: black !important;
}
</style>
