import axios from 'axios'

const listKhachDatPhong = async () => {
  try {
    let {data} = await axios.get(`${window.urlApi}api/list-khach-dat-phong`)
    return data
  } catch (err) {
    return err
  }
}
const ThemKhach = async (formData) => {
  try {
    let {data} = await axios.post(`${window.urlApi}api/khachthue-them-book`,formData)
    return data
  } catch (err) {
    return err
  }
}

export default {
  listKhachDatPhong,
  ThemKhach
}