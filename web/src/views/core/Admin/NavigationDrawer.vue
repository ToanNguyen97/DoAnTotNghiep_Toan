<template>
  <div @mouseover="check?isOpenMini = false:''" @mouseleave="check?isOpenMini = true:''" >
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
        <v-list-tile to="/danh-sach-phong.html">
           <v-list-tile-action>
              <v-icon color="white">insert_chart_outlined</v-icon>
           </v-list-tile-action>
           <v-list-tile-content >
              <v-list-tile-title class="fonttext" >Biểu Đồ</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-list-group
            v-for="item in menus"
            :key="item.title"
            v-model="item.active"
            :prepend-icon="item.action"
            no-action
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title class="fonttext">{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-list-tile
              v-for="subItem in item.items"
              :key="subItem.title"
              to="/danh-sach-phong.html"
              prepend-icon="insert_chart_outlined"             
            >
            <v-list-tile-content>
              <v-tooltip left>
                <template slot="activator">
                  <v-list-tile-title class="colortext">{{subItem.title }}</v-list-tile-title>
                </template>
                <span>{{ subItem.title }}</span>
              </v-tooltip>
                                         
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

<script>
  export default {
    props: {
      mini: {
        type: Boolean      
      },
      check: {
        type: Boolean
      }
    },
    data () {
      return {
        menus: [
          {
            action: 'account_balance',
            title: 'Phòng Trọ',
            items: [
              { title: 'Danh sách phòng', icon: 'visibility' },
              { title: 'Thêm phòng', icon: 'add' }
            ]
          },
          {
            action: 'people_outline',
            title: 'Khách Thuê',
            active: true,
            items: [
              { title: 'Danh sách khách thuê', icon: 'visibility' },
              { title: 'Thêm khách thuê', icon: 'person_add' }
            ]
          },
          {
            action: 'event_note',
            title: 'Hợp Đồng',
            items: [
              { title: 'Danh sách hợp đồng', icon: 'visibility' },
              { title: 'Lập hợp đồng', icon: 'add'}
            ]
          },
          {
            action: 'monetization_on',
            title: 'Phiếu Thu Tiền',
            items: [
              { title: 'Danh sách phiếu thu', icon: 'visibility' },
              { title: 'Lập phiếu thu', icon: 'add'}
            ]
          },
          {
            action: 'signal_cellular_no_sim',
            title: 'Phiếu Trả Phòng',
            items: [
              { title: 'Danh sách phiếu trả phòng', icon: 'visibility' },
              { title: 'Lập phiếu trả phòng', icon: 'add'}
            ]
          },
          {
            action: 'add_to_queue',
            title: 'Thống Kê',
            items: [
              { title: 'Thống kê phòng', icon: 'account_balance' },
              { title: 'Thống kê khách thuê', icon: 'people_outline' },
              { title: 'Thống kê phiếu thu', icon: 'monetization_on' },
              { title: 'Thống kê phiếu trả phòng', icon: 'signal_cellular_no_sim' },
            ]
          },
          {
            action: 'settings',
            title: 'Cấu hình',
            items: [
              { title: 'Sao lưu', icon: 'settings_power', color:'yellow' },
              { title: 'Phục hồi', icon: 'settings_backup_restore' }
            ]
          }],   
        drawer: true,
        isOpenMini: true,
        giaoviens: [
        { name:'Xem Danh Sách', icon: 'visibility', path:'/danh-sach-phong.html'},
        { name:'Thêm', icon: 'add', path:'/danh-sach-phong.html'},
        { name:'Sửa', icon: 'update', path:'/danh-sach-phong.html'},
        { name:'Xóa', icon: 'delete', path:'/danh-sach-phong.html'}
        ],
        sinhviens: [
        { name:'Xem Danh Sách', icon: 'visibility', path:'/danh-sach-sinh-vien.html'},
        { name:'Thêm', icon: 'add', path:'/them-sinh-vien.html'},
        { name:'Sửa', icon: 'update', path:'/sua-sinh-vien'},
        { name:'Xóa', icon: 'delete', path:'/xoa-sinh-vien'}
        ],
        right: null
      }
    },  
    watch: {
      mini () {
        if (this.mini) {
          this.isOpenMini = true
        }else
        {
          this.isOpenMini = false
        }    
      },
      isOpenMini (v) {
        this.$emit('input', v)
      }
    },

    methods: {
      goToItem (path) {
        this.$router.push({path: path})
      }
    }
  }
</script>

<style>
.theme--light.v-list .v-list__group--active:before {
  background: transparent !important;
}
.white {
  border-color: #fff;
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
