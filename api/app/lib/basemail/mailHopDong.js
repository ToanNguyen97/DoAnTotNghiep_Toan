'use strict'
const fs = require('fs')
const moment = require('moment')
const path = require('path')
const mailHopDong = function (data) {
  let content = fs.readFileSync(path.join(__dirname, 'app', 'lib', 'basemail', 'templateHopDong.html'))
  content = String(content)
  content = content.replace('{{soHD}}', `${data._id}`)
  content = content.replace('{{TenKhachHang}}', `${data.khachThueID.hoKhachThue} ${data.khachThueID.tenKhachThue}`)
  content = content.replace('{{hoTenKhachThue}}', `${data.khachThueID.hoKhachThue} ${data.khachThueID.tenKhachThue}`)
  content = content.replace('{{tenPhong}}', `${data.phongID.tenPhong}`)
  content = content.replace('{{giaPhong}}', `${data.phongID.giaPhong} VNĐ`)
  content = content.replace('{{ngayThue}}', `${moment(data.ngayLap).format('DD/MM/YYYY')} `)
  content = content.replace('{{ngayTra}}', `${moment(data.ngayKetThuc).format('DD/MM/YYYY')}`)
 
return content
}
export default {
  mailHopDong
}