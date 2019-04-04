import Mongoose, {Schema} from 'mongoose'
const Bcrypt = require('bcrypt')
const Boom = require('boom')
const User = Mongoose.model('User')
const Jwt = require('jsonwebtoken')
const Aguid = require('aguid')
const cmd = require('node-cmd')
const moment = require('moment')
const SALT_LENGTH= 10
const signin = async (request, h) => {
  try {
    let data = request.payload

    let listUsers = await User.find()
    let userNotDuplicate = listUsers.filter(item => {
      item.userName = data.userName
    })
    if(userNotDuplicate && userNotDuplicate.length === 0) {
      let newpass = Bcrypt.hashSync(data.passWord,SALT_LENGTH)
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
const createAccountNV = async (data) => {
  try {
    // để phân biệt tài khoản của nhân viên hay khách thì nên lọc user kèm theo roles
    let listUsers = await User.find({roles: 'nhân viên'})
    let userNotDuplicate = listUsers.filter(item => {
      item.userName = data.userName
    })
    if(userNotDuplicate && userNotDuplicate.length === 0) {
      let newpass = Bcrypt.hashSync(data.passWord,SALT_LENGTH)
      let user = {userName: data.userName, passWord: newpass, email: data.email, status: data.status, roles: data.roles, nhanVienID:data.nhanVienID}
      let userRegisted = await User.create(user)
      return userRegisted
    }
    else {
      return Boom.badRequest('Lỗi lúc thêm rồi!')
    }
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const createAccountKT = async (data) => {
  try {
    // để phân biệt tài khoản của nhân viên hay khách thì nên lọc user kèm theo roles
    let listUsers = await User.find({roles: 'khách thuê'})
    let userNotDuplicate = listUsers.filter(item => {
      item.userName = data.userName
    })
    if(userNotDuplicate && userNotDuplicate.length === 0) {
      let newpass = Bcrypt.hashSync(data.passWord,SALT_LENGTH)
      let user = {userName: data.userName, passWord: newpass, email: data.email, status: data.status, roles: data.roles, khachThueID:data.khachThueID}
      let userRegisted = await User.create(user)
      return userRegisted
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

    // check xem tài khoản này của khach hay của nhan vien
    let userInfo = {}
    if(data && data.nhanVienID) {
      data = await User.findById({_id:data._id}).populate('nhanVienID')
      userInfo = data.nhanVienID
    }
    if(data && data.khachThueID) {
      data = await User.findById({_id:data._id}).populate('khachThueID')
      userInfo= data.khachThueID
    }
    if(data === null) {
      return {credentials: null, isValid: false}
    }
    else {
      let isValid = await Bcrypt.compare(request.payload.passWord, data.passWord)
      if(isValid) {
        const credentials = {userName: data.userName, email: data.email, roles: data.roles, status: data.status, userInfo}
        let session = {
          valid: true,
          id: Aguid(),
          expires: new Date().getTime() + 30 * 60 * 1000,
          credentials
        }
        request.server.redis.set(session.id, JSON.stringify(session))
        let token = Jwt.sign(session, global.CONFIG.get('web.jwt.secret'))
        const response = h.response({auth: true, token, credentials, isValid})
        response.header("Authorization", token)
        response.state("token", token, global.CONFIG.get('web.cookieOptions'))
       // console.log('response',response)
        return response
      }
      else {
        return {credentials: {userName: data.userName}, isValid: false}
      }
    }
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const getUser = async (request, h) => {
  try {
    let userInfo = request.auth.credentials.credentials
    return userInfo
  } catch (err) {
    return err
  }
}

// sao luu tesst sao luu
const backup = async (request, h) => {
  try {
    let filename = 'QuanLyPhongTro-'+request.payload.namefolder + '-' + moment(new Date()).format('DD-MM-YYYY')
    cmd.run(`mongodump --out F:/DoAnTotNghiep/${request.payload.namefolder}/${filename} --db QuanLyPhongTro_57130724`);
    return true
  } catch (err) {
    return err
  }
}

// phục hồi
const restore = async (request, h) => {
  try {
    cmd.run(`mongorestore --port 27017 F:/DoAnTotNghiep/Backup/${request.payload.namefolder}`)
    return true
  } catch (err) {
    return err
  }
}
export default {
  signin,
  login,
  getUser,
  createAccountNV,
  createAccountKT,
  backup,
  restore
}