<template>
  <div style="background-color: #fff; border-radius:10px;" class="infoPhong">
    <v-toolbar color="cyan" dark tabs>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Thông tin phòng đang thuê</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
      <template v-slot:extension>
        <v-tabs v-model="tab" color="cyan" grow>
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab
            v-for="item in dsPhong"
            :key="item._id"
          >
            {{ item.tenPhong }} {{item.khuPhongID && item.khuPhongID.tenKhuPhong}}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in dsPhong" :key="item._id" >
        <v-card flat>
          <v-card-text>
            <v-layout row>
              <v-flex xs12 sm6 md3>
                  <v-card style="margin-left: 13px; margin-bottom:10px;">
                    <v-img v-if="item && item.anhChinh"
                      :src="`//localhost:3003/image/${item.anhChinh}`"               
                      height="200px"
                    >
                    <v-layout align-end fill-height pa-3 dark white--text  >
                      <div class="title font-weight-light">{{item && item.loaiPhongID && item.loaiPhongID.tenLoaiPhong}}</div>
                    </v-layout>
                    </v-img>
                    <v-card-title style="padding:11px 0 11px 11px; ">
                      <v-layout row wrap>
                        <v-flex>
                          <span class="detailPT subheading black--text">{{item && item.khuPhongID && item.khuPhongID.tenKhuPhong}}</span>
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
                    <v-card-text class="py-0" v-if="item && item.giaPhong">
                      <v-text-field class="pb-1" hide-details :value="$options.filters.formatCurrentcy(item.giaPhong)" label="Giá phòng" outline readonly></v-text-field>
                      <v-layout row wrap >
                        <v-flex md6>
                          <v-text-field append-icon="fas fa-bolt" hide-details class="pb-1" :value="item.soDien" label="Số điện" outline readonly></v-text-field>
                        </v-flex>
                        <v-flex md6 pl-1>
                          <v-text-field append-icon="fas fa-tint" hide-details :value="item.soNuoc" label="Số nước" outline readonly></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn flat color="blue" ><v-icon dark>far fa-thumbs-up</v-icon></v-btn>
                      <v-btn flat color="purple"><v-icon dark>fas fa-share-alt</v-icon></v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
                <v-flex  xs12 sm6 md9 >
                  <v-card style="margin-left: 13px; margin-bottom:10px;">
                    <v-card-title>
                      <div class="headline">Danh sách phiếu thu</div> 
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
                    <v-data-table v-if="item && item.dsPhieuThu"
                      :headers="headers"
                      :items="item.dsPhieuThu"
                      :search="search"
                      hide-actions
                      :pagination.sync="pagination"
                    >
                      <template v-slot:items="props">
                        <td class="text-xs-left">{{ props.item._id }}</td>
                        <td class="text-xs-left">{{ props.item.ngayLap | formatDate }}</td>
                        <td class="text-xs-left">{{ props.item.ngayHetHan | formatDate }}</td>
                        <td class="text-xs-left"><v-chip :color="props.item.tinhTrangPhieuThu === 'chưa đóng'?'amber':(props.item.tinhTrangPhieuThu === 'đã đóng'?'green accent-4':'deep-orange darken-1')" class="white--text">{{ props.item.tinhTrangPhieuThu }}</v-chip></td>
                        <td class="text-xs-left" >
                          <v-btn color="indigo" flat fab small depressed @click="ViewDetail(props.item)" ><v-icon >fas fa-eye</v-icon></v-btn>                 
                          <v-btn color="cyan" flat fab small depressed :loading="loading" @click="ThanhToan(props.item)" ><v-icon dark large>fab fa-cc-paypal</v-icon></v-btn>                 
                        </td>
                      </template>
                    </v-data-table>
                    <div class="text-xs-center pt-2">
                      <v-pagination v-model="pagination.page" :length="item.dsPhieuThu.length > 0?Math.ceil(item.dsPhieuThu.length/pagination.rowsPerPage):0"></v-pagination>
                    </div>
                  </v-card>
                </v-flex>
              </v-layout>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script src="./infoPhongOfKhach.js">
</script>

<style scoped >
  .infoPhongs {
    border-bottom: 2px orange solid;
  }
</style>