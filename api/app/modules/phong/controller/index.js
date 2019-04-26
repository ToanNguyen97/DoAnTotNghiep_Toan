'use strict'

import Mongoose from 'mongoose'
import Boom from 'boom'
const Phong = Mongoose.model('Phong')
const fs = require('fs')

const save = async (request, h) => {
  try {
    let data = request.payload
    let phong = {}
    let item = {}
    let anhChinhName 
    let anhChiTietName
    if(data._id)
    {
      if(data.anhChinh.name === null || data.anhChinh.name.length === 0 || data.anhChinh.name === undefined )
      {
        let entity = await Phong.findById({_id: data._id})
        anhChinhName = entity.anhChinh       
      }
      else 
      {
        anhChinhName = data.anhChinh.name
        let anhChinh64 = data.anhChinh.file64.replace(/^data(.*?)base64,/, "")
        fs.writeFile(`app/lib/images/${anhChinhName}`, anhChinh64, 'base64', function(err) {
          return err
        })
      }

      if(data.anhChiTiet.name.length !=0)
      {
        anhChiTietName = data.anhChiTiet.name
        let anhChiTiet64 = []
        for(let item of data.anhChiTiet.file64)
        {
          let anh = item.replace(/^data(.*?)base64,/, "")
          anhChiTiet64.push(anh)
        }
        for(let i=0; i < data.anhChiTiet.name.length; i++)
        {
          fs.writeFile(`app/lib/images/${data.anhChiTiet.name[i]}`, anhChiTiet64[i], 'base64', function(err) {
            return err
          })
        }
      }
      else {
        let entity = await Phong.findById({_id: data._id})
        anhChiTietName = entity.anhChiTiet
      }

      let payload = {tenPhong: data.tenPhong, anhChinh: anhChinhName, anhChiTiet: anhChiTietName, moTa: data.moTa, soDien: data.soDien,
        soNuoc: data.soNuoc, giaPhong: data.giaPhong, dKMang: data.dKMang, status: data.status, homeFlag: data.homeFlag,
        hotFlag:data.hotFlag, tinhTrangPhongID: data.tinhTrangPhongID, khuPhongID: data.khuPhongID, loaiPhongID: data.loaiPhongID }
      
      item = await Phong.findOneAndUpdate({_id: data._id}, payload) ||  Boom.notFound()
      phong = await Phong.findById({_id: item._id}).populate('loaiPhongID').populate('khuPhongID').populate('tinhTrangPhongID')
    }
    else
    {
      anhChinhName = data.anhChinh.name
        let anhChinh64 = data.anhChinh.file64.replace(/^data(.*?)base64,/, "")
        fs.writeFile(`app/lib/images/${anhChinhName}`, anhChinh64, 'base64', function(err) {
          return err
      })

      anhChiTietName = data.anhChiTiet.name
      let anhChiTiet64 = []
      for(let item of data.anhChiTiet.file64)
      {
        let anh = item.replace(/^data(.*?)base64,/, "")
        anhChiTiet64.push(anh)
      }
      for(let i=0; i < data.anhChiTiet.name.length; i++)
      {
        fs.writeFile(`app/lib/images/${data.anhChiTiet.name[i]}`, anhChiTiet64[i], 'base64', function(err) {
          return err
        })
      }

      let payload = {tenPhong: data.tenPhong, anhChinh: anhChinhName, anhChiTiet: anhChiTietName, moTa: data.moTa, soDien: data.soDien,
        soNuoc: data.soNuoc, giaPhong: data.giaPhong, dKMang: data.dKMang, status: data.status, homeFlag: data.homeFlag,
        hotFlag:data.hotFlag, tinhTrangPhongID: data.tinhTrangPhongID, khuPhongID: data.khuPhongID, loaiPhongID: data.loaiPhongID }
      item =  await Phong.create(payload)
      phong = await Phong.findById({_id: item._id}).populate('loaiPhongID').populate('khuPhongID').populate('tinhTrangPhongID')
    }
    return phong
  } catch (err) {
    console.log(err)
    return Boom.forbidden(err)
  }
}

const getAll = async (request, h) => {
  try {
    if(request.pre.isRoles) {
      return await Phong.find().populate('loaiPhongID').populate('khuPhongID').populate('tinhTrangPhongID').populate('dsPhieuThu').lean()
    }
    else {
      return h.response({message:'Not allowed'})
    }
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
    return await Phong.findById({_id: request.params.id}).populate(['loaiPhongID',{path:'khuPhongID',populate:['dsPhong']},'tinhTrangPhongID',{path: 'dsHopDong', populate:[{path:'khachThueID', populate:['loaiKhachThueID',]}]}, {path:'dsPhieuThu', populate:[{path:'dsCTPT', populate:['cacKhoanThuID']}]}]).lean()
  } catch (err) {
    return Boom.forbidden(err)
  }
}


const searchMultiple = async (request, h) => {
  try {
    let data = request.payload
    if(request.params.isReal === true)
    {
      let items = await Phong.find(data).populate('loaiPhongID').populate('khuPhongID').populate('tinhTrangPhongID')
      return items
    }
    else {
      let items = await Phong.SearchMultiple(request.payload)
      return items
    }
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const tracuuphong = async (request, h) => {
  try {
    let items = await Phong.tracuuphong(request.payload)
    return items
  } catch (err) {
    return Boom.forbidden(err)
  }
}

export default {
  save,
  getById,
  getAll,
  update,
  deletePhong,
  searchMultiple,
  tracuuphong
}