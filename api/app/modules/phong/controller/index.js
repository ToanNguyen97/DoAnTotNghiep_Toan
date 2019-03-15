'use strict'

import Mongoose from 'mongoose'
import Boom from 'boom'
const Phong = Mongoose.model('Phong')
const fs = require('fs')

const save = async (request, h) => {
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
    for(let i=0; i < anhChiTiet.name.length; i++)
    {
      fs.writeFile(`app/lib/images/${anhChiTiet.name[i]}`, anhChiTiet64[i], 'base64', function(err) {
        return err
      })
    }
    let data = request.payload
    console.log('xem data: ', data)
    let payload = {tenPhong: data.tenPhong, anhChinh: anhChinhName, anhChiTiet: anhChiTiet.name, moTa: data.moTa, soDien: data.soDien,
      soNuoc: data.soNuoc, giaPhong: data.giaPhong, dKMang: data.dKMang, status: data.status, homeFlag: data.homeFlag,
      hotFlag:data.hotFlag, tinhTrangPhongID: data.tinhTrangPhongID, khuPhongID: data.khuPhongID, loaiPhongID: data.loaiPhongID }
    let item = {}
    
    if(!data._id) {
      item = await Phong.create(payload)
    }
    else {
      if (data._id && !Mongoose.Types.ObjectId.isValid(data._id)) {
        return Boom.badRequest('Phong Id not valid.')
      }
      payload._id = data._id
      item = await Phong.findById({_id: data._id})
      if (!item) {
        return Boom.badRequest('Phong not found.')
      }
      item = Object.assign(item, payload)
    }
    await item.save()
    let phong = await Phong.findById({_id: item._id}).populate('loaiPhongID').populate('khuPhongID')
    return phong
  } catch (err) {
    console.log(err)
    return Boom.forbidden(err)
  }
}

const getAll = async (request, h) => {
  try {
    return await Phong.find().populate('loaiPhongID').populate('khuPhongID').populate('tinhTrangPhongID')
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const update = async (request, h) => {
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
      fs.writeFile(`app/lib/images/${anhChiTiet.name[i]}`, anhChiTiet64[i], 'base64', function(err) {
        return err
      })
    }
    let payload = {tenPhong: request.payload.tenPhong, anhChinh: anhChinhName, anhChiTiet: anhChiTiet.name, moTa: request.payload.moTa, soDien: request.payload.soDien,
    soNuoc: request.payload.soNuoc, giaPhong: request.payload.giaPhong, dKMang: request.payload.dKMang, status: request.payload.status, homeFlag: request.payload.homeFlag,
    tinhTrangPhongID: request.payload.tinhTrangPhongID, khuPhongID: request.payload.khuPhongID, loaiPhongID: request.payload.loaiPhongID }
    let data =  await Phong.findOneAndUpdate({_id: request.params.id},payload)
    let phong = await Phong.findById({_id: data._id}).populate('loaiPhongID').populate('khuPhongID')
    return phong || Boom.notFound()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const deletePhong = async (request, h) => {
  try {
    return await Phong.findOneAndRemove({_id: request.params.id}) || Boom.notFound()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const getById = async (request, h) => {
  try {
    return await Phong.findById({_id: request.params.id}).populate('loaiPhongID').populate('khuPhongID')
  } catch (err) {
    return Boom.forbidden(err)
  }
}

export default {
  save,
  getById,
  getAll,
  update,
  deletePhong
}