const listPhieuTraPhong = (state, data) => state.dsPhieuTraPhong = data
const addPhieuTraPhong = (state, data) => {
  if(state.dsPhieuTraPhong && state.dsPhieuTraPhong.length > 0) {
    state.dsPhieuTraPhong = state.dsPhieuTraPhong.filter(item => item._id != data._id)
    state.dsPhieuTraPhong = [...state.dsPhieuTraPhong, ...[data]]
  }
  else{
    state.dsPhieuTraPhong = [...[data]]
  }
 
}

export default {
  listPhieuTraPhong,
  addPhieuTraPhong
}