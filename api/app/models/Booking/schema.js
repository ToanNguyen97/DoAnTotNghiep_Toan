import {Schema} from 'mongoose'

const schema = {
  hoNguoiBook : {
    type: String,
    required: true,
    max: 30
  },
  tenNguoiBook : {
    type: String,
    required: true,
    max: 20
  },
  email: {
    type: String, 
    required: true,
    max: 50
  },
  soDienThoai: {
    type: String,
    required: true,
    max: 12
  },
  soCMND: {
    type: String,
    required: true,
    max: 11
  },
  diaChi: {
    type: String,
    required: true,
    max: 100
  },
  phongID: {
    type: Schema.Types.ObjectId,
    ref: 'Phong'
  },
  ngayBookPhong: {
    type: Date,
    default: Date.now()
  },
  ngayNhanPhong: {
    type: Date,
    required: true
  },
  status: {
    type: Boolean,
    default: false,
    required: true
  }
}

const options = {
  collection: 'booking'
}

export {schema, options}