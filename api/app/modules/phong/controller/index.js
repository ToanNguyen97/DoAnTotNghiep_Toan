'use strict'

import Mongoose from 'mongoose'
import Boom from 'boom'
const Phong = Mongoose.model('Phong')


const create = async (request, h) => {
  try {
    return await Phong.create(request.payload)
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const getAll = async (request, h) => {
  try {
    return await Phong.find().populate('LoaiPhong').populate('KhuPhong').populate('TinhTrangPhong')
  } catch (err) {
    return Boom.forbidden(err)
  }
}

export default {
  create,
  getAll
}