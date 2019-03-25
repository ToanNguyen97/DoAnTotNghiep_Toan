import Mongoose from 'mongoose'
import Boom from 'boom'
import moment from 'moment'
const PhieuThuTien = Mongoose.model('PhieuThuTien')
const Phong = Mongoose.model('Phong')

const getAll = async (request, h) => {
  try {
    return await PhieuThuTien.find().populate('phongID')
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const save = async (request, h) => {
  try {
    let data = request.payload
    let item = {}
    if(!data._id) {
      let phong = await Phong.findById({_id: data.phongID}).populate('khuPhongID')
      let soKhuPhong = phong.khuPhongID.tenKhuPhong.split(' ')
      let soPhong = phong.tenPhong.split(' ')
      let ngayLap = new Date(data.ngayLap)
      console.log(ngayLap)
      let getThangNam = moment(ngayLap).format('MMYYYY')
      // ngày hết hạn là ngày 10 của tháng tiếp theo
      data.ngayHetHan = new Date(`${ngayLap.getFullYear()}-${ngayLap.getMonth() + 2}-11`)
      // mã phiểu thu gồm: PT + số phòng + số khu phòng + tháng và năm tạo
      data._id = `PTP${soPhong[1]}KV${soKhuPhong[2]}${getThangNam}`
      data.tinhTrangPhieuThu = 'chưa đóng'
      phong.soDien = data.soDienMoi
      phong.soNuoc = data.soNuocMoi
      await phong.save()
      item = new PhieuThuTien(data)
    } else {
      item = await PhieuThuTien.findById({_id: data._id})
      item = Object.assign(item, data)
    }
    return await item.save()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

export default {
  getAll,
  save
}