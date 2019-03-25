import actions from './actions.js'
import mutations from './mutations.js'

export default {
  namespaced: true,
  state: {
    dsPhong: [],
    dsKhuPhong: [],
    dsLoaiPhong: [],
    dsTinhTrangPhong: []
  },
  mutations,
  actions
}