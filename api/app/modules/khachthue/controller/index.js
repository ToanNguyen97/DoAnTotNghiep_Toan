'use strict'
import Mongoose from 'mongoose'
import Boom from 'boom'
const fs = require('fs')
const KhachThue = Mongoose.model('KhachThue')

const save = async (request, h) => {
  try {
    let item = await KhachThue.find()
    return item
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const getAll = async (request, h) => {
  try {
    return await KhachThue.find().populate('loaiKhachThueID') || Boom.notFound()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

export default {
  save,
  getAll
}