<template>
  <div style="background-color: #fff; border-radius:10px;" class="detailphieuthu">
    <v-layout row wrap justify-start class="ml-2 pl-1">
      <h1 class="mb-2 detailPT">{{phong && phong.tenPhong}}</h1>    
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6 md3>
         <v-card style="margin-left: 13px; margin-bottom:10px;">
          <v-img v-if="phong && phong.anhChinh"
            :src="`//localhost:3003/image/${phong.anhChinh}`"               
            height="200px"
          >
          <v-layout
            align-end
            fill-height
            pa-3
            dark
            white--text
          >
            <div class="title font-weight-light">{{phong && phong.loaiPhongID && phong.loaiPhongID.tenLoaiPhong}}</div>
          </v-layout>
          </v-img>
          <v-card-title style="padding:11px 0 11px 11px; ">
            <v-layout row wrap>
              <v-flex>
                <span class="detailPT subheading black--text">{{phong && phong.khuPhongID && phong.khuPhongID.tenKhuPhong}}</span>
              </v-flex>
              <v-flex>
                <v-rating
                v-model="rating"
                background-color="orange lighten-3"
                color="orange"
                ></v-rating>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-card-text class="py-0" v-if="phong && phong.giaPhong">
            <v-text-field class="pb-1" hide-details :value="$options.filters.formatCurrentcy(phong.giaPhong)" label="Giá phòng" outline readonly></v-text-field>
            <v-layout row wrap >
              <v-flex md6>
                <v-text-field append-icon="fas fa-bolt" hide-details class="pb-1" :value="phong.soDien" label="Số điện" outline readonly></v-text-field>
              </v-flex>
              <v-flex md6 pl-1>
                <v-text-field append-icon="fas fa-tint" hide-details :value="phong.soNuoc" label="Số nước" outline readonly></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="blue" ><v-icon dark>far fa-thumbs-up</v-icon></v-btn>
            <v-btn flat color="purple"><v-icon dark>fas fa-share-alt</v-icon></v-btn>
            <v-tooltip bottom>
            <template v-slot:activator="{ on }">
               <v-btn flat color="green accent-3" @click="openHD = true" v-on="on"><v-icon dark>fas fa-file-signature</v-icon></v-btn>
            </template>
            <span>Lập hợp đồng</span>
          </v-tooltip>
           
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex  xs12 sm6 md9 >
        <v-tabs
          v-model="active"
          color="cyan"
          dark
          slider-color="yellow"
          style="margin-left: 13px;">
        <v-tab ripple >
          Khách đang thuê
        </v-tab>
        <v-tab-item>
          <v-card style=" margin-bottom:10px;">
            <v-card-title>
              <div class="headline">Danh sách khách đang ở</div> 
              <v-spacer></v-spacer>
              <v-text-field
                style="width: 0px;"
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table v-if="phong && dsKhachThue && dsKhachThue.length >0"
              :headers="headers"
              :items="dsKhachThue"
              :search="search"
              hide-actions
            >
              <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.hoKhachThue}} {{ props.item.tenKhachThue}}</td>
                <td class="text-xs-left"><v-img height=90 :src="`//localhost:3003/image/${props.item.anhDaiDien}`"></v-img></td>
                <td class="text-xs-left"><v-chip :color="props.item.gioiTinh?'blue':'pink'" class="white--text">{{props.item.gioiTinh?'Nam':'Nữ'}}</v-chip></td>
                <td class="text-xs-left">{{props.item.soDienThoai}}</td>
                <td class="text-xs-left">{{props.item.diaChi}}</td>
                <td class="text-xs-left">{{props.item.email}}</td>
                <td class="text-xs-left">
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn color="deep-orange" v-on="on" @click="TraPhong(props.item)" icon outline flat fab small depressed ><v-icon>fa fa-window-close</v-icon></v-btn> 
                    </template>
                    <span>Trả Phòng</span>
                  </v-tooltip>
                </td>
              </template>
            </v-data-table>
          </v-card> 
        </v-tab-item>
        <v-tab ripple >
          Khách từng ở
        </v-tab>
        <v-tab-item>
          <v-card style=" margin-bottom:10px;">
            <v-card-title>
              <div class="headline">Danh sách khách từng ở</div> 
              <v-spacer></v-spacer>
              <v-text-field
                style="width: 0px;"
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table v-if="phong"
              :headers="headers1"
              :items="dsPhieuTraPhong"
              :search="search1"
              hide-actions
              :pagination.sync="pagination"
            >
              <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.khachThueID.hoKhachThue}} {{ props.item.khachThueID.tenKhachThue}}</td>
                <td class="text-xs-left"><v-img height=90 :src="`//localhost:3003/image/${props.item.khachThueID.anhDaiDien}`"></v-img></td>
                <td class="text-xs-left"><v-chip :color="props.item.khachThueID.gioiTinh?'blue':'pink'" class="white--text">{{props.item.khachThueID.gioiTinh?'Nam':'Nữ'}}</v-chip></td>
                <td class="text-xs-left">{{props.item.khachThueID.soDienThoai}}</td>
                <td class="text-xs-left">{{props.item.khachThueID.diaChi}}</td>
                <td class="text-xs-left">{{props.item.khachThueID.email}}</td>
                <td class="text-xs-left">{{props.item.ngayLap | formatDate}}</td>
                <td class="text-xs-left">
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn color="cyan" v-on="on" @click="TraPhong(props.item)" icon outline flat fab small depressed ><v-icon>fas fa-info-circle</v-icon></v-btn> 
                    </template>
                    <span>Trả Phòng</span>
                  </v-tooltip>
                </td>
              </template>
            </v-data-table>
            <div class="text-xs-center pt-2">
              <v-pagination v-if="pagination.page" v-model="pagination.page" :length="pages"></v-pagination>
            </div>
          </v-card> 
        </v-tab-item>
        <v-tab ripple>
          Bình Luận
        </v-tab>
          <v-tab-item>
            <v-card>
              <v-card-text style="text-align:center">
                <div class="fb-comments" :data-href="urlComment" data-width="700" data-numposts="7"></div>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>   
      </v-flex>
    </v-layout>
    <lap-hop-dong v-model="openHD" :phongSelect="phong || {}"></lap-hop-dong>
  </div>
</template>

<script src="./detailPhong.js">
</script>

<style scoped>
  .detailPT {
    border-bottom: 4px solid tomato; 
  }
</style>