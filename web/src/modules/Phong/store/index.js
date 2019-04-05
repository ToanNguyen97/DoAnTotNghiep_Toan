import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'
export default {
  namespaced: true,
  state: {
    dsPhong: [],
    dsKhuPhong: [],
    dsLoaiPhong: [],
    dsTinhTrangPhong: []
  },
  getters,
  mutations,
  actions
}