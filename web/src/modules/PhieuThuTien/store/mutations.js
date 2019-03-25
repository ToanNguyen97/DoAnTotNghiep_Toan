const getListPhieuThuTien = (state, data) => state.dsPhieuThuTien = data
const addPhieuThuTien = (state, data) => state.dsPhieuThuTien = [...state.dsPhieuThuTien, ...[data]]
export default {
  getListPhieuThuTien,
  addPhieuThuTien
}