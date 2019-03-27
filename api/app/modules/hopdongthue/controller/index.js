'use strict'

import Mongoose from 'mongoose'
import Boom from 'boom'
import Mail from '../../../lib/basemail/sendMail.js'
const HopDongThuePhong = Mongoose.model('HopDongThuePhong')
const KhachThue = Mongoose.model('KhachThue')
const Phong = Mongoose.model('Phong')
//import translateCharacter from '../../../lib/services/translateCharacter.js'

const save = async (request, h) => {
  try {
    let data = request.payload
    let item = await HopDongThuePhong.findById(data._id)
    let khachThue = {}
    if(item) {
      item = Object.assign(item, data)
    }
    else {
      item = new HopDongThuePhong(data)
      // sau khi lập hợp đồng thì thêm phòng đó vào khách thuê và sửa tình trạng khách từ chưa thuê sang đã thuê
      khachThue = await KhachThue.findById({_id: item.khachThueID})
      if(khachThue && !khachThue.phongs) {
        khachThue.phongs = []
      }
      khachThue.phongs = khachThue.phongs.filter(key => key != String(item.phongID))
      khachThue.phongs = [...khachThue.phongs, ...[item.phongID]]
      khachThue.tinhTrangKhachThue = "Đang thuê"
      await khachThue.save()
      // cập nhật tình trạng phòng đã thuê
      let phong = await Phong.findById({_id: item.phongID}).populate('tinhTrangPhongID')
      if(phong.tinhTrangPhongID.id === "5c88669ffcd238559ca25d13") {
        phong.tinhTrangPhongID = "5c8866adfcd238559ca25d14"
      }
      else if (phong.tinhTrangPhongID.id === "5c8866b6fcd238559ca25d15") // tạm thời chưa check số lượng == 4 =>  đã thuê else cho ở ghép
      {
        phong.tinhTrangPhongID = "5c8866adfcd238559ca25d14"
      }
      await phong.save()
    }
    await item.save()
    let hopdong = await HopDongThuePhong.findById(item._id).populate([
      { path: 'khachThueID' },
      { path: 'phongID', populate: ['khuPhongID', 'tinhTrangPhongID', 'loaiPhongID'] }
    ])
    Mail.SenMail(hopdong, khachThue.email)
    return hopdong
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const getAll = async (request, h) => {
  try {
    return await HopDongThuePhong.find().populate([{path:'khachThueID'},{path:'phongID', populate:['loaiPhongID','tinhTrangPhongID','khuPhongID']}])
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const getById = async (request, h) => {
  try {
    return await HopDongThuePhong.find({_id: request.params.id}).populate('khachThueID').populate('phongID') || Boom.notFound()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

export default {
  getAll,
  getById,
  save
}