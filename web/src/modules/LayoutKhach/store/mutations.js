const getDetailKhach = (state, data) => {
  state.khachThue = data
}

const setKhach = (state,data) => {
  state.khachThue = data
}

const getPhongOfKhach = (state, data) => {
  state.dsPhong = data
}
export default {
  getDetailKhach,
  setKhach,
  getPhongOfKhach
}