import  Joi from 'joi'
Joi.ObjectId = require('joi-objectid')(Joi)

const cacKhoanThuVal = {
  save: {
    payload: {
      tenKhoanThu: Joi.string().required().max(30),
      giaKhoanThu: Joi.number().required(),
      donViTinh: Joi.string().required().max(30)
    }
  }
}

export default {...cacKhoanThuVal}