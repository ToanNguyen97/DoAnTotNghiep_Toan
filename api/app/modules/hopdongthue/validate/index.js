'use strict'

import Joi from 'joi'
Joi.ObjectId = require('joi-objectid')(Joi)

const hopDongThueVal = {
  save: {
    payload: {
      _id: Joi.string(),
      khachThueID: Joi.ObjectId(),
      phongID: Joi.ObjectId(),
      ngayKetThuc: Joi.date()
    },
    options: {
      allowUnknown: true
    }
  },
  get: {
    params: {
      id: Joi.string().required()
    }
  },
  delete: {
    params: {
      id: Joi.string().required()
    }
  }
}


export default {
  ...hopDongThueVal
}