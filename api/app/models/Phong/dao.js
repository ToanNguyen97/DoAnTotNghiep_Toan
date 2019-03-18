'use strict'

module.exports = function (schema, options) {
  schema.statics.SearchMultiple = async function (payload) {
    let Model = this
    let queryString = {}
    if (payload.tenPhong)
    {
      queryString.tenPhong = { $regex: '.*' + payload.tenPhong + '.*' }
    }
    if (payload.khuPhongID)
    {
      queryString.khuPhongID = payload.khuPhongID
    }
    if (payload.loaiPhongID)
    {
      queryString.loaiPhongID = payload.loaiPhongID
    }
    if (payload.moTa) 
    {
      queryString.moTa = {$regex : `.*${payload.moTa}.*`}
    }
    if (payload.soDien)
    {
      queryString.soDien = payload.soDien
    }
    if (payload.soNuoc)
    {
      queryString.soNuoc = payload.soNuoc
    }
    if (payload.dKMang)
    {
      queryString.dKMang = payload.dKMang
    }
    if (payload.homeFlag)
    {
      queryString.homeFlag = payload.homeFlag
    }
    if (payload.hotFlag)
    {
      queryString.hotFlag = payload.hotFlag
    }
    if (payload.status)
    {
      queryString.status = payload.status
    }
    console.log(queryString)
    let data = await Model.find(queryString).lean()
    return data
  }
}