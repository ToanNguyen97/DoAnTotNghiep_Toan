'use strict'

import Mongoose from 'mongoose'
import Boom from 'boom'
import Mail from '../../../lib/basemail/sendMail.js'
const HopDongThuePhong = Mongoose.model('HopDongThuePhong')
const KhachThue = Mongoose.model('KhachThue')
//import translateCharacter from '../../../lib/services/translateCharacter.js'

const save = async (request, h) => {
  try {
    let data = request.payload
    let item = await HopDongThuePhong.findById(data._id)
    if(item) {
      item = Object.assign(item, data)
    }
    else {
      item = new HopDongThuePhong(data)
      // sau khi lập hợp đồng thì thêm phòng đó vào khách thuê
      let khachThue = await KhachThue.findById({_id: item.khachThueID})
      if(khachThue && !khachThue.phongs) {
        khachThue.phongs = []
      }
      khachThue.phongs = khachThue.phongs.filter(key => key != item.phongID)
      khachThue.phongs = [...khachThue.phongs, ...[item.phongID]]
      khachThue.save()
      Mail.SenMail()
    }
    await item.save()
    return await HopDongThuePhong.findById({_id: item._id}).populate('khachThueID').populate('phongID')
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const getAll = async (request, h) => {
  try {
    return await HopDongThuePhong.find().populate('khachThueID').populate('phongID')
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