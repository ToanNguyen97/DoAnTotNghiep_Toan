'use strict'

const getListNhanVien = function (state, data) {
  state.dsNhanVien = data
}

const addNhanVien = function (state, data) {
  state.dsNhanVien = state.dsNhanVien.filter(item => item._id != data._id)
  state.dsNhanVien = [...state.dsNhanVien, ...[data]]
}
const removeNhanVien = (state, data) => {
  state.dsNhanVien = state.dsNhanVien.filter(item => {
    return item._id != data._id
  })
}
export default {
  getListNhanVien,
  addNhanVien,
  removeNhanVien

}