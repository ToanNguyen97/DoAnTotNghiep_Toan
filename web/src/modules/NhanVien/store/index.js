'use strict'

import actions from './actions.js'
import mutations from './mutations.js'

export default {
  namespaced: true,
  state: {
    dsNhanVien: []
  },
  mutations,
  actions
}