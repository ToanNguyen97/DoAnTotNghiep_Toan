import Vue from 'vue'
import Vuex from 'vuex'
import Phong from './modules/Phong/store/index'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    phong: Phong
  }
})
