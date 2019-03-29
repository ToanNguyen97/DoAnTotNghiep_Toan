import Mongoose from 'mongoose'
import Boom from 'boom'
const PhieuTraPhong = Mongoose.model('PhieuTraPhong')
const KhachThue = Mongoose.model('KhachThue')
const save = async (request, h) => {
  try {
    let data = request.payload
    let item = {}
    if(!data._id) {
      item = new PhieuTraPhong(data)
      // bắt đầu cập nhật khách thuê khi trả phòng nếu thuê 2 phòng trở lên thì trừ phòng này ra , còn k thì cập nhật trạng thái thành đã trả phòng
      let khachThue = await KhachThue.findById({_id:item.khachThueID})
      if(khachThue && khachThue.phongs && khachThue.phongs.length >0) {

        khachThue.phongs = khachThue.phongs.filter(key => String(key) != String(item.phongID))
      }
      if(khachThue.phongs &&  khachThue.phongs.length === 0)
      {
        khachThue.tinhTrangKhachThue = 'Đã trả phòng'
      }
      await khachThue.save()
    }
    else {
      item = await PhieuTraPhong.findById({_id:data._id})
      item = Object.assign(item, data)
    }
    await item.save()
    let phieu = await PhieuTraPhong.findById({_id:item._id}).populate('khachThueID')
    return phieu  
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const getAll = async (request, h) => {
  try {
    return await PhieuTraPhong.find()
  } catch (err) {
    return Boom.forbidden()
  }
}

const getById = async (request, h) => {
  try {
    return await PhieuTraPhong.findById({_id:request.params._id}) || Boom.notFound()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const getByPhongId = async (request, h) => {
  try {
    return await PhieuTraPhong.find({phongID:request.params.idphong}).populate('khachThueID') || {}
  } catch (err) {
    return Boom.forbidden(err)
  }
}

export default {
  save,
  getAll,
  getById,
  getByPhongId
}