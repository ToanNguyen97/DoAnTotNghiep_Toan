'use strict'

import Joi from 'joi'
Joi.ObjectId = require('joi-objectid') (Joi)

const phongVal = {
  create: {
    payload: {
      _id: Joi.string().length(24),
      tenPhong: Joi.string().required().max(20).trim(),
      anhChinh: Joi.object(),
      anhChiTiet: Joi.object(),
      moTa: Joi.string(),
      soDien: Joi.number().required(),
      soNuoc: Joi.number().required(),
      giaPhong: Joi.number().required(),
      dKMang: Joi.boolean(),
      status: Joi.boolean(),
      homeFlag: Joi.boolean(),
      hotFlag: Joi.boolean(),
      tinhTrangPhongID: Joi.ObjectId(),
      khuPhongID: Joi.ObjectId(),
      loaiPhongID: Joi.ObjectId()
    },
    options: {
      allowUnknown: true
    }
  },
  update: {
    params: {
      id: Joi.ObjectId()
    },
    payload: {
      tenPhong: Joi.string().required().max(20).trim(),
      anhChinh: Joi.object(),
      anhChiTiet: Joi.object(),
      moTa: Joi.string(),
      soDien: Joi.number().required(),
      soNuoc: Joi.number().required(),
      giaPhong: Joi.number().required(),
      dKMang: Joi.boolean(),
      status: Joi.boolean(),
      homeFlag: Joi.boolean(),
      hotFlag: Joi.boolean(),
      tinhTrangPhongID: Joi.ObjectId(),
      khuPhongID: Joi.ObjectId(),
      loaiPhongID: Joi.ObjectId()
    }
  },
  delete: {
    params: {
      id: Joi.ObjectId()
    }
  },
  get: {
    params: {
      id: Joi.ObjectId()
    }
  }
}

export default {
  ...phongVal
}