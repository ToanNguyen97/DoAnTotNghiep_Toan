'use strict'

const getListNhanVien = function (state, data) {
  state.dsNhanVien = data
}

const addNhanVien = function (state, data) {
  state.dsNhanVien = state.dsNhanVien.filter(item => item._id != data._id)
  state.dsNhanVien = [...state.dsNhanVien, ...[data]]
}

export default {
  getListNhanVien,
  addNhanVien

}