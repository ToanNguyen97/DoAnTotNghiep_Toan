const countPhong = state => {
  return state.dsPhong.filter((item) => {
    return item.tinhTrangPhongID.tenTinhTrangPhong != 'Còn trống'
  }).length
}

export default {
  countPhong
}