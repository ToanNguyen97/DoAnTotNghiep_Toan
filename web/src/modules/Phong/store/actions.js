import PhongServices from '../Phongservices.js'
const getPhongs = async (context) => {
  try {
    let {data} = await PhongServices.getPhongs()
    if(data.message !== 'Not allowed') {
      context.commit('getListPhong', data)
      return true
    }else {
      return false
    }
  } catch (err)  {
    return err
  }
}

const getKhuPhongs = async (context) => {
  try {
    let {data} = await PhongServices.getKhuPhongs()
    context.commit('getListKhuPhong', data)
  } catch (err)  {
    return err
  }
}

const getLoaiPhongs = async (context) => {
  try {
    let {data} = await PhongServices.getLoaiPhongs()
    context.commit('getListLoaiPhong', data)
  } catch (err)  {
    return err
  }
}

const getTinhTrangPhongs = async (context) => {
  try {
    let {data} = await PhongServices.getTinhTrangPhongs()
    context.commit('getListTinhTrangPhong', data)
  } catch (err)  {
    return err
  }
}

const XacNhan = async (context, payload) => {
  let {data} = await PhongServices.XacNhan(payload)
  context.commit('addPhong', data)
}

const deletePhong = async (context, idXoa) => {
  let {data} = await PhongServices.deletePhong(idXoa)
  context.commit('deletePhong', data)
  return data
}

const deleteMultiPhong = async (context, deleteMultiId) => {
  for(let item of deleteMultiId) {
    await PhongServices.deletePhong(item)
  }
  context.commit('deletePhongMulti', deleteMultiId)
}

const timKiem = async (context, payload) => {
  try {
    let {data} = await PhongServices.timKiem(payload)
    context.commit('searchPhong', data)
    return data
  } catch (err) {
    console.log(err)
  }
}

const getPhongById = async (context, idPhong) => {
  try {
    let {data} = await PhongServices.getPhongById(idPhong)
    return data
  } catch (err) {
    return err
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
  deletePhong,
  getPhongById
}