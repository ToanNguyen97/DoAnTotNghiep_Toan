import {Schema} from 'mongoose'
const schema = {
  hoTenNguoiBook : {
    type: String,
    required: true,
    max: 50
  },
  email: {
    type: String, 
    required: true
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