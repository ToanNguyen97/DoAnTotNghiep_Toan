'use strict'
const Joi = require('joi')
Joi.ObjectId = require('joi-objectid')(Joi)

const khachThueVal = {
  save: {
    payload: {
      _id: Joi.string().length(24),
      hoKhachThue: Joi.string().required().max(30),
      tenKhachThue: Joi.string().required().max(20),
      anhDaiDien: Joi.string().required(),
      ngaySinh: Joi.date().required(),
      gioiTinh: Joi.boolean().required(),
      soCMND: Joi.string().required().max(11),
      soDienThoai: Joi.string().required().max(11),
      hoTenNguoiThan: Joi.string().required().max(50),
      diaChi: Joi.string().required().max(80),
      loaiKhachThueID: Joi.ObjectId(),
      email: Joi.string().email()
    },
    options: {
      allowUnknown: true
    }
  },
  get: {
    params: {
      id: Joi.ObjectId()
    }
  },
  delete: {
    params: {
      id: Joi.ObjectId()
    }
  }
}

export default {
  ...khachThueVal
}