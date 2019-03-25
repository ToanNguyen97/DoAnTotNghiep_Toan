import Mongoose from 'mongoose'
import Boom from 'boom'
const PhieuThuTien = Mongoose.model('PhieuThuTien')

const getAll = async (request, h) => {
  try {
    return await PhieuThuTien.find()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const save = async (request, h) => {
  try {
    let data = request.payload
    let item = {}
    if(!data._id) {
      data._id = "PTP01KV01032019"
      item = new PhieuThuTien(data)
    } else {
      item = await PhieuThuTien.findById({_id: data._id})
      item = Object.assign(item, data)
    }
    return await item.save()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

export default {
  getAll,
  save
}