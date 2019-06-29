'use strict'
const nodemailer = require('nodemailer')


const SenMail = async (options, email) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'toan210597ntu@gmail.com',
      clientId: '529369342696-4u88ucm5d6rgudkl84alam67eht2h7rq.apps.googleusercontent.com',
      clientSecret: '4ko6XsGq6bD4zwkB-yLxOb-w',
      refreshToken:'1/Y7VVAsAS3RTGHpPbYyFvnjgLANQX5kwbgJxONrqakqo'  
    }
  })
  
  let mailOptions = {
    from: '"Phòng Trọ Cô Mai" <toan210597ntu@gmail.com>',
    to: email,
    subject: options.subject,
    text: options.text,
    html: options.content
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