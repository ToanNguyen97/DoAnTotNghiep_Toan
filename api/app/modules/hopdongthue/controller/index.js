'use strict'

import Mongoose from 'mongoose'
import Boom from 'boom'
const HopDongThuePhong = Mongoose.model('HopDongThuePhong')

const save = async (request, h) => {
  try {
    let data = request.payload
    let item = await HopDongThuePhong.findById(data._id)
    if(item) {
      item = Object.assign(item, data)
    }
    else {
      item = new HopDongThuePhong(data)
    }
    await item.save()
    return await HopDongThuePhong.find({_id: item._id}).populate('khachThueID').populate('phongID')
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