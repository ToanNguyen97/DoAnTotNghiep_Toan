'use strict'
const Joi = require('joi')
Joi.ObjectId = require('joi-objectid') (Joi)

const userVal = {
  signin: {
    payload: {
      userName: Joi.string().required().max(30),
      passWord: Joi.string().required(),
      email: Joi.string().email(),
      status: Joi.boolean().default(true),
      roles: Joi.array().items(Joi.string().regex(/^(user|super-admin|staff)$/))
    }
  },
  login: {
    payload: {
      userName: Joi.string().required().max(30),
      passWord: Joi.string().required()
    }
  }
}

export default {...userVal}