import Vue from 'vue'
import Vuex from 'vuex'
import Phong from './modules/Phong/store/index'
import KhachThue from './modules/KhachThue/store/index'
import HopDongThuePhong from './modules/HopDongThuePhong/store/index'
import PhieuThuTien from './modules/PhieuThuTien/store/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    phong: Phong,
    khachthue: KhachThue,
    hopdongthuephong: HopDongThuePhong,
    phieuthutien: PhieuThuTien
  }
})
