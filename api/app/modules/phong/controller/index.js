'use strict'

import Mongoose from 'mongoose'
const Phong = Mongoose.model('Phong')

const create = async (request, h) => {
  try {
    return await Phong.create(request.payload)
  } catch (err) {
    throw err
  }
}

const getAll = async (request, h) => {
  try {
    return await Phong.find().populate('LoaiPhong').populate('KhuPhong').populate('TinhTrangPhong')
  } catch (err) {
    throw err
  }
}

export default {
  create,
  getAll
}