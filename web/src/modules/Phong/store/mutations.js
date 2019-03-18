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
  state.dsPhong = state.dsPhong.filter( item => item._id != phong._id)
  state.dsPhong = [...state.dsPhong, ...[phong]]
}

const deletePhong = (state, phong) => {
  state.dsPhong = state.dsPhong.filter(item => item._id != phong._id)
}

const deletePhongMulti  = (state, data) => {
  state.dsPhong = state.dsPhong.filter(item => 
    !data.includes(item._id)
  )
}

const searchPhong = (state, data) => {
  state.dsPhong = [...data]
}

export default {
  addPhong,
  getListPhong,
  getListKhuPhong,
  getListLoaiPhong,
  searchPhong,
  getListTinhTrangPhong,
  deletePhongMulti,
  deletePhong
}