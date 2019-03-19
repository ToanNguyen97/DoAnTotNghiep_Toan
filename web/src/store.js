import Vue from 'vue'
import Vuex from 'vuex'
import Phong from './modules/Phong/store/index'
import KhachThue from './modules/KhachThue/store/index'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    phong: Phong,
    khachthue: KhachThue
  }
})
