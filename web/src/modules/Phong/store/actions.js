import axios from 'axios'

const getPhongs = async (context) => {
  try {
    let {data} = await axios.get('http://localhost:3003/api/phong')
    context.commit('getListPhong', data)
  } catch (err)  {
    return err
  }
}

const getKhuPhongs = async (context) => {
  try {
    let {data} = await axios.get('http://localhost:3003/api/khuphong')
    context.commit('getListKhuPhong', data)
  } catch (err)  {
    return err
  }
}

const getLoaiPhongs = async (context) => {
  try {
    let {data} = await axios.get('http://localhost:3003/api/loaiphong')
    context.commit('getListLoaiPhong', data)
  } catch (err)  {
    return err
  }
}

const getTinhTrangPhongs = async (context) => {
  try {
    let {data} = await axios.get('http://localhost:3003/api/tinhtrangphong')
    context.commit('getListTinhTrangPhong', data)
  } catch (err)  {
    return err
  }
}

const XacNhan = async (context, payload) => {
  console.log('xem: ',payload)
  let {data} = await axios.post('http://localhost:3003/api/phong', payload)
  context.commit('addPhong', data)
}

export default {
  XacNhan,
  getPhongs,
  getKhuPhongs,
  getLoaiPhongs,
  getTinhTrangPhongs
}