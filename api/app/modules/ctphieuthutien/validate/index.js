'use strict'

const Joi = require('joi')
Joi.ObjectId = require('joi-objectid')(Joi)

const CTPhieuThuTienVal = {
  save: {
    payload: {
      _id: Joi.string(),
      phieuThuID: Joi.string(),
      chiSoCu: Joi.number(),
      chiSoMoi: Joi.number(),
      cacKhoanThuID: Joi.ObjectId()
    },
    options: {
      allowUnknown: true
    }
  },
  getById: {
    params: {
      id: Joi.string()
    }
  }
}

export default {...CTPhieuThuTienVal}