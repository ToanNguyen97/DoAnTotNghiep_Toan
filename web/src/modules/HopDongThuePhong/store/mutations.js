'use strict'

const getListHopDongThuePhong = function (state, data) {
  state.dsHopDongThuePhong = data
}

const addOrUpadteHopDong = function (state, data) {
  state.dsHopDongThuePhong = state.dsHopDongThuePhong.filter((item) => {
    item._id != data._id 
  })
  state.dsHopDongThuePhong = [...state.dsHopDongThuePhong, ...[data]]
}

export default {
  getListHopDongThuePhong,
  addOrUpadteHopDong
}