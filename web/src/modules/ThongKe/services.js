import axios from 'axios'
import toast from '../../plugins/toast'
const ThongKe = async (payload) => {
  try {
    let {data} = await axios.post(`http:${window.urlApi}api/hopdong-thongke`, payload, {withCredentials: true})
    return data
  } catch (err) {
    toast.Error(err)
  }
}
const ThongKePhieuThu = async (payload) => {
  try {
    let {data} = await axios.post(`http:${window.urlApi}api/phieuthu-thongke`, payload, {withCredentials: true})
    return data
  } catch (err) {
    toast.Error(err)
  }
}

const BaoHetHan = async (dsHD) => {
  try {
    let {data} = await axios.post(`http:${window.urlApi}api/hopdong-baohethan`, {dsHD}, {withCredentials: true})
    return data
  } catch (err) {
    return err
  }
}

const BaoHetHanPT = async (dsPT) => {
  try {
    let {data} = await axios.post(`http:${window.urlApi}api/phieuthu-baohethan`, {dsPT}, {withCredentials: true})
    return data
  } catch (err) {
    return err
  }
}

export default {
  ThongKe,
  BaoHetHan,
  ThongKePhieuThu,
  BaoHetHanPT
}