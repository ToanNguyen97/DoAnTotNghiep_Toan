'use strict'

const getListKhachThue = function (state, data) {
  state.dsKhachThue = data
}

const addKhachThue = function (state, data) {
  state.dsKhachThue = state.dsKhachThue.filter(item => item._id != data._id)
  state.dsKhachThue = [...state.dsKhachThue, ...[data]]
}

const getListLoaiKhachThue = function (state, data) {
  state.dsLoaiKhachThue = data
}

const deleteKhachThue = function (state, data) {
  state.dsKhachThue = state.dsKhachThue.filter(item => item._id != data._id)
}

const deleteMultiKhachThue = function (state, idMulti) {
  state.dsKhachThue = state.dsKhachThue.filter(item => !idMulti.includes(item._id))
}

const addKhachByDT = function (state, data) {
  state.khachThue = data
}

export default {
  getListKhachThue,
  getListLoaiKhachThue,
  addKhachThue,
  deleteKhachThue,
  deleteMultiKhachThue,
  addKhachByDT
}