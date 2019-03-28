const getListPhieuThuTien = (state, data) => state.dsPhieuThuTien = data
const addPhieuThuTien = (state, data) => state.dsPhieuThuTien = [...state.dsPhieuThuTien, ...[data]]
const updatePhieuThu = (state, data) => {
  state.dsPhieuThuTien = state.dsPhieuThuTien.filter(item => item._id != data._id)
  state.dsPhieuThuTien = [...state.dsPhieuThuTien, ...[data]]
}
export default {
  getListPhieuThuTien,
  addPhieuThuTien,
  updatePhieuThu
}