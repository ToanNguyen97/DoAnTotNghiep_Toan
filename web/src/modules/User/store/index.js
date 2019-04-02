import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('token') || '',
    status: '',
    user: {}
  },
  getters,
  mutations,
  actions

}