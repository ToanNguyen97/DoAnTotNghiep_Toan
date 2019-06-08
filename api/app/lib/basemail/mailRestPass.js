'use strict'
const fs = require('fs')
const path = require('path')
const mailDoiPass = function (data) {
  let content = fs.readFileSync(path.join(__dirname, 'app', 'lib', 'basemail', 'teamplateResetPass.html'))
  content = String(content)
  console.log('vao day',data)
  if(data.khachThueID) 
  {
    content = content.replace('{{hoTenKhachThue}}', `${data.khachThueID.hoKhachThue} ${data.khachThueID.tenKhachThue}`)
  } else {
    content = content.replace('{{hoTenKhachThue}}', `${data.nhanVienID.hoNhanVien} ${data.nhanVienID.tenNhanVien}`)
  }
  content = content.replace('{{maAccount}}', `${data.session.id}`)
return content
}
export default {
  mailDoiPass
}