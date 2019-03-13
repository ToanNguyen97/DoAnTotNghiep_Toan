'use strict'

import Mongoose from 'mongoose'
import Boom from 'boom'
const Phong = Mongoose.model('Phong')
const fs = require('fs')

const create = async (request, h) => {
  try { 
    let anhChinh = request.payload.anhChinh
    let anhChinhName = anhChinh.name
    let anhChinh64 = anhChinh.file64.replace(/^data(.*?)base64,/, "")
    fs.writeFile(`app/lib/images/${anhChinhName}`, anhChinh64, 'base64', function(err) {
      return err
    })
    let anhChiTiet = request.payload.anhChiTiet
    let anhChiTiet64 = []
    for(let item of anhChiTiet.file64)
    {
      let anh = item.replace(/^data(.*?)base64,/, "")
      anhChiTiet64.push(anh)
    }
    console.log(anhChiTiet.name)
    for(let i=0; i < anhChiTiet.name.length; i++)
    {
      fs.writeFile(`app/lib/images/${anhChiTiet.name[i]}`, anhChinh64[i], 'base64', function(err) {
        return err
      })
    }
    console.log(request.payload)
    // return await Phong.create(request.payload)
    return true
  } catch (err) {
    console.log(err)
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