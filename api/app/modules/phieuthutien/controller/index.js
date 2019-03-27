import Mongoose, { Schema } from 'mongoose'
import Boom from 'boom'
import moment from 'moment'
const PhieuThuTien = Mongoose.model('PhieuThuTien')
const Phong = Mongoose.model('Phong')
const CTPhieuThuTien = Mongoose.model('CTPhieuThuTien')

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
      let ngaylap = new Date(data.ngayLap)
      let getThangNam = moment(ngaylap).format('MMYYYY')
      // ngày hết hạn là ngày 10 của tháng tiếp theo: số 11 ở cuối vì chênh lệch múi giờ sẽ giảm xuống 10
      data.ngayHetHan = new Date(`${ngaylap.getFullYear()}-${ngaylap.getMonth() + 2}-11`)
      // mã phiểu thu gồm: PT + số phòng + số khu phòng + tháng và năm tạo
      data._id = `PTP${soPhong[1]}KV${soKhuPhong[2]}${getThangNam}`
      data.tinhTrangPhieuThu = 'chưa đóng'
      phong.soDien = data.soDienMoi
      phong.soNuoc = data.soNuocMoi
      let {_id, phongID, ngayLap, ngayHetHan, moTa, tinhTrangPhieuThu} = data
      await phong.save()
      item = new PhieuThuTien({_id, phongID, ngayLap, ngayHetHan, moTa, tinhTrangPhieuThu})
      //tiếp theo sẽ tạo chi tiết phiếu thu và thêm vào DB
      let tienThu = [      
        {
          phieuThuID: item.id,
          chiSoCu: data.soDien,
          chiSoMoi: data.soDienMoi,
          cacKhoanThuID:'5c983b7d28aebc66041a45aa',   
        },
        {
          phieuThuID: item.id,
          chiSoCu: data.soNuoc,
          chiSoMoi: data.soNuocMoi,
          cacKhoanThuID: '5c983b9b28aebc66041a45ab',   
        }
      ]
      if(phong.dKMang === true) {
        tienThu.push({
          phieuThuID: item.id,
          cacKhoanThuID: '5c983bf228aebc66041a45ac'
        })
      }
      for(let ctPT of tienThu) {
        await CTPhieuThuTien.create(ctPT)
      }
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