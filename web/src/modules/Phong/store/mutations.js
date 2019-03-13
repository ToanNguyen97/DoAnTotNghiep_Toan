const getListPhong = (state, data) => {
  state.dsPhong = data
}

const getListKhuPhong = (state, data) => {
  state.dsKhuPhong = data
}

const getListLoaiPhong = (state, data) => {
  state.dsLoaiPhong = data
}

const getListTinhTrangPhong = (state, data) => {
  state.dsTinhTrangPhong = data
}

const addPhong = (state, phong) => {
  state.dsPhong = [...state.dsPhong, ...[phong]]
}

export default {
  addPhong,
  getListPhong,
  getListKhuPhong,
  getListLoaiPhong,
  getListTinhTrangPhong
}