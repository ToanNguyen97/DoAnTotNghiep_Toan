'use strict'
const nodemailer = require('nodemailer')
import Mail from './mailHopDong'


const SenMail = async (data, email) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'toan210597ntu@gmail.com',
      clientId: '529369342696-4u88ucm5d6rgudkl84alam67eht2h7rq.apps.googleusercontent.com',
      clientSecret: '10jxMEC_wXSxRlMxkPfU39pF',
      refreshToken:'1/aG6GoKDmPvwG2OQK3H_tUkzeu1RopMJV8_vBfirFQL0'  
    }
  })
  
  let mailOptions = {
    from: '<toan210597ntu@gmail.com>',
    to: email,
    subject: "Hợp Đồng Thuê Phòng Trọ",
    text: "Hợp Đồng Thuê Phòng Trọ",
    html: Mail.mailHopDong(data)
  }
  await transporter.sendMail(mailOptions, function (err, res) {
    if( err)
    {
      console.log('Lỗi', err)
    }
    else
    {
      console.log("Đã gửi mail");
      // Preview only available when sending through an Ethereal account
    }
  })
}

export default {
  SenMail
}