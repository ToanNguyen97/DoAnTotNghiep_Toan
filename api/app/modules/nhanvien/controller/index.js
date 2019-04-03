'use strict'
import Mongoose from 'mongoose'
import Boom from 'boom'
const fs = require('fs')
const NhanVien = Mongoose.model('NhanVien')

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
     item  = new NhanVien(data)
   }
   else
   {
     if(data.anhDaiDien.name === null || data.anhDaiDien.name === "" || data.anhDaiDien.name === undefined) {
       item = await NhanVien.findById({_id: data._id})
       data.anhDaiDien = item.anhDaiDien
       item = Object.assign(item,data)
     }
     else {
       let anhDaiDien64 = data.anhDaiDien.file64.replace(/^data(.*?)base64,/, "")
       fs.writeFile(`app/lib/images/${data.anhDaiDien.name}`,anhDaiDien64, 'base64', function (err) {
         return err
       })
       data.anhDaiDien = data.anhDaiDien.name
       item = await NhanVien.findById({_id: data._id})
       item = Object.assign(item, data)
     }
    }   
    await item.save()    
    let nhanVien = await NhanVien.findById({_id: item._id}) || Boom.notFound()
    return nhanVien
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const getAll = async (request, h) => {
  try {
    return await NhanVien.find() || Boom.notFound()
  } catch (err) {
    return Boom.forbidden(err)
  }
}
export default {
  save,
  getAll
}