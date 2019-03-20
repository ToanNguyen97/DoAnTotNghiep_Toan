'use strict'
import Mongoose from 'mongoose'
import Boom from 'boom'
const fs = require('fs')
const KhachThue = Mongoose.model('KhachThue')

const save = async (request, h) => {
  try {
   let data = request.payload
   let item = {}
   if(!data._id)
   {
     let anhDaiDien64 = data.anhDaiDien.file64.replace(/^data(.*?)base64,/, "")
     fs.writeFile(`app/lib/images/${data.anhDaiDien.name}`, anhDaiDien64, 'base64', function (err) {
       return err
     })
     data.anhDaiDien = data.anhDaiDien.name
     item  = new KhachThue(data)
   }
   else
   {
     if(data.anhDaiDien.name === null || data.anhDaiDien.name === "" || data.anhDaiDien.name === undefined) {
       item = await KhachThue.findById({_id: data._id})
       data.anhDaiDien = item.anhDaiDien
       item = Object.assign(item,data)
     }
     else {
       let anhDaiDien64 = data.anhDaiDien.file64.replace(/^data(.*?)base64,/, "")
       fs.writeFile(`app/lib/images/${data.anhDaiDien.name}`,anhDaiDien64, 'base64', function (err) {
         return err
       })
       data.anhDaiDien = data.anhDaiDien.name
       item = await KhachThue.findById({_id: data._id})
       item = Object.assign(item, data)
     }
    }   
    await item.save()
    let khachThue = await KhachThue.findById({_id: item._id}).populate('loaiKhachThueID') || Boom.notFound()
    return khachThue
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

const deleteKhachThue = async (request, h) => {
  try {
    return await KhachThue.findOneAndDelete({_id: request.params.id}) || Boom.notFound()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const search = async (request, h) => {
  try {
    let data = request.payload
    if(request.params.isReal === true) {
      let items = await KhachThue.find(data).populate('loaiKhachThueID')
      return items
    }
    else {
      let items = await KhachThue.searchMultiple(data)
      return items
    }
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const getByDT = async (request, h) => {
  try {
    console.log('vao roi')
    return await KhachThue.find({soDienThoai: request.params.sdt}).populate('loaiKhachThueID') || Boom.notFound()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

export default {
  save,
  getAll,
  deleteKhachThue,
  search,
  getByDT
}