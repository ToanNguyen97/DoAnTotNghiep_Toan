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
        <v-list-tile v-if="showDashboard()" :to="'/danh-sach-khach-thue.html'" >
           <v-list-tile-action>
            <v-icon>insert_chart_outlined</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="fonttext">Biểu Đồ</v-list-tile-title>
          </v-list-tile-content>        
        </v-list-tile>
        <v-list-tile v-if="showRoom()" :to="'/danh-sach-phong.html'" >
           <v-list-tile-action>
            <v-icon>account_balance</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="fonttext">Phòng Trọ</v-list-tile-title>
          </v-list-tile-content>        
        </v-list-tile>
        <v-list-tile v-if="showCustomer()" :to="'/danh-sach-khach-thue.html'" >
           <v-list-tile-action>
            <v-icon>people_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="fonttext">Khách Thuê</v-list-tile-title>
          </v-list-tile-content>        
        </v-list-tile>
        <v-list-tile v-if="showContract()" :to="'/danh-sach-hop-dong-thue-phong.html'" >
           <v-list-tile-action>
            <v-icon>event_note</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="fonttext">Hợp Đồng</v-list-tile-title>
          </v-list-tile-content>        
        </v-list-tile>
        <v-list-tile v-if="showBill()" :to="'/phieu-thu-tien-phong.html'" >
           <v-list-tile-action>
            <v-icon>monetization_on</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="fonttext">Phiếu Thu Tiền</v-list-tile-title>
          </v-list-tile-content>        
        </v-list-tile>
        <v-list-tile v-if="showLayoutKhach()" :to="'/thong-tin-khach-thue.html'" >
           <v-list-tile-action>
            <v-icon>far fa-address-card</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="fonttext">Thông tin cá nhân</v-list-tile-title>
          </v-list-tile-content>        
        </v-list-tile>
        <v-list-tile v-if="showNhanVien()" :to="'/danh-sach-nhan-vien.html'" >
           <v-list-tile-action>
            <v-icon>fas fa-users</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="fonttext">Danh sách nhân viên</v-list-tile-title>
          </v-list-tile-content>        
        </v-list-tile>
        <v-list-group
          prepend-icon="add_to_queue"
          v-if="showStatistical()"
        >
          <template v-slot:activator>
            <v-list-tile >
              <v-list-tile-content>
                <v-list-tile-title class="fonttext">Thống Kê</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
            <v-list-tile v-for="subItem in itemsTK" :key="subItem.title"  :to="subItem.link">
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
        <v-list-group
          v-if="showSetUp()"
          prepend-icon="settings"
        >
          <template v-slot:activator>
            <v-list-tile >
              <v-list-tile-content>
                <v-list-tile-title class="fonttext">Cấu hình</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
            <v-list-tile v-for="subItem in itemsSetup" :key="subItem.title"  :to="subItem.link">
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
