import Mongoose, {Schema} from 'mongoose'
import { request } from 'http';
const Bcrypt = require('bcrypt')
const Boom = require('boom')
const User = Mongoose.model('User')
const Jwt = require('jsonwebtoken')
const Aguid = require('aguid')
SALT_LENGTH= 10
const sigin = async (request, h) => {
  try {
    let data = request.payload
    let listUsers = await User.find()
    let userNotDuplicate = listUsers.filter(item => {
      item.userName = data.userName
    })
    if(userNotDuplicate && userNotDuplicate.length === 0) {
      let newpass = Bcrypt.hashSync(data.passWord,10)
      let user = {userName: data.userName, passWord: newpass, email: data.email, status: data.status, roles: data.roles}
      // tao token
      let token = Jwt.sign(user, global.CONFIG.get('web.jwt.secret'))
      let userRegisted = await User.create(user)
      return {auth: true, token: token, userRegisted}
    }
    else {
      return Boom.badRequest('Lỗi lúc thêm rồi!')
    }
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const login = async (request, h) => {
  try {
    let data = await User.findOne({userName: request.payload.userName})
    if(data === null) {
      return {credentials: null, isValid: false}
    }
    else {
      let isValid = await Bcrypt.compare(request.payload.passWord, data.passWord)
      if(isValid) {
        const credentials = {userName: data.userName, email: data.email, roles: data.roles, status: data.status}
        let session = {
          valid: true,
          id: aguid(),
          expires: new Date().getTime() + 30 * 60 * 1000
        }
        request.server.redis.set(session.id, JSON.stringify(session))
        let token = Jwt.sign(session, global.CONFIG.get('web.jwt.secret'))
        const response = h.response({auth: true, token, credentials, isValid})
        response.header("Authorization", token)
        return response
      }
      else {
        return {credentials: null, isValid: false}
      }
    }
  } catch (err) {
    return Boom.forbidden(err)
  }
}

export default {
  sigin,
  login
}