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
  let {data} = await axios.post('http://localhost:3003/api/phong', payload)
  context.commit('addPhong', data)
}

const deletePhong = async (context, idXoa) => {
  let {data} = await axios.delete('http://localhost:3003/api/phong/'+ idXoa)
  context.commit('deletePhong', data)
  return data
}

const deleteMultiPhong = async (context, deleteMultiId) => {
  for(let item of deleteMultiId) {
    await axios.delete('http://localhost:3003/api/phong/'+ item)
  }
  context.commit('deletePhongMulti', deleteMultiId)
}

const timKiem = async (context, payload) => {
  try {
    let {data} = await axios.post('http://localhost:3003/api/timkiemphong/timchinhxac='+ payload.isReal, payload.formData)
    context.commit('searchPhong', data)
    return data
  } catch (err) {
    console.log(err)
  }
  
}
export default {
  XacNhan,
  getPhongs,
  timKiem,
  getKhuPhongs,
  getLoaiPhongs,
  getTinhTrangPhongs,
  deleteMultiPhong,
  deletePhong
}