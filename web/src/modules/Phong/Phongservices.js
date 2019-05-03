import axios from 'axios'

const getPhongs = async () => {
  try {
    return await axios.get('http://localhost:3003/api/phong')
  } catch (err) {
    return err
  }
}
const getPhongsClient = async () => {
  try {
    return await axios.get('http://localhost:3003/api/phong')
  } catch (err) {
    return err
  }
}

const getKhuPhongs = async () => {
  try {
    return await axios.get('http://localhost:3003/api/khuphong')
  } catch (err) {
    return err
  }
}

const getLoaiPhongs = async () => {
  try {
    return await axios.get('http://localhost:3003/api/loaiphong')
  } catch (err) {
    return err
  }
}

const getTinhTrangPhongs = async () => {
  try {
    return await axios.get('http://localhost:3003/api/tinhtrangphong')
  } catch (err) {
    return err
  }
}

const XacNhan = async (payload) => {
  try {
    return await axios.post('http://localhost:3003/api/phong', payload)
  } catch (err) {
    return err
  }
}

const deletePhong = async (idXoa) => {
  try {
    return await axios.delete('http://localhost:3003/api/phong/'+ idXoa)
  } catch (err) {
    return err
  }
}

const timKiem = async (payload) => {
  try {
    return await axios.post('http://localhost:3003/api/timkiemphong/timchinhxac='+ payload.isReal, payload.formData)
  } catch (err) {
    return err
  }
}

const traCuu = async (payload) => {
  try {
    let {data} =  await axios.post('http://localhost:3003/api/tracuuphong', payload)
    return data
  } catch (err) {
    return err
  }
}

const getPhongById = async (idPhong) => {
  try {
    return await axios.get('http://localhost:3003/api/phong/'+ idPhong)
  } catch (err) {
    return err
  }
}



export default {
  getPhongs,
  getKhuPhongs,
  getLoaiPhongs,
  getTinhTrangPhongs,
  XacNhan,
  deletePhong,
  timKiem,
  getPhongById,
  traCuu,
  getPhongsClient
}