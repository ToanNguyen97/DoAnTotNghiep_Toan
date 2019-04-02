import Vue from 'vue'
import Vuex from 'vuex'
import Phong from './modules/Phong/store/index'
import KhachThue from './modules/KhachThue/store/index'
import HopDongThuePhong from './modules/HopDongThuePhong/store/index'
import PhieuThuTien from './modules/PhieuThuTien/store/index'
import PhieuTraPhong from './modules/PhieuTraPhong/store/index'
import Auth from './modules/User/store/index'
import axios from 'axios';
//khi f5 thi gán token cho axios để request ok
const token = localStorage.getItem('token')
if(token) {
  axios.defaults.headers.common['Authorization'] = token
}

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    phong: Phong,
    khachthue: KhachThue,
    hopdongthuephong: HopDongThuePhong,
    phieuthutien: PhieuThuTien,
    phieutraphong: PhieuTraPhong,
    auth: Auth
  }
})
