'use strict'
const Joi = require('joi')
Joi.ObjectId = require('joi-objectid')(Joi)

const khachThueVal = {
  save: {
    hoKhachThue: Joi.string().required().max(30),
    tenKhachThue: Joi.string().required().max(20),
    anhDaiDien: Joi.string().required(),
    ngaySinh: Joi.date().required(),
    gioiTinh: Joi.boolean().required(),
    hoKhachThue: Joi.string().required().max(30),
    hoKhachThue: Joi.string().required().max(30),
    hoKhachThue: Joi.string().required().max(30),
    hoKhachThue: Joi.string().required().max(30),
    hoKhachThue: Joi.string().required().max(30),
    hoKhachThue: Joi.string().required().max(30),
    hoKhachThue: Joi.string().required().max(30),
  }
}

export default {
  ...khachThueVal
}