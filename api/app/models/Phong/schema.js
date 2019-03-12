import Mongoose, {Schema} from 'mongoose'
const schema = {
  tenPhong: {
    type: String,
    trim: true,
    max: 20,
    required: true
  },
  anhChinh: {
    type: String,
    required: true
  },
  anhChiTiet: {
    type: Array
  },
  moTa: {
    type: String
  },
  soDien: {
    type: Number,
    required: true,
    default: 0
  },
  soNuoc: {
    type: Number,
    required: true,
    default: 0
  },
  giaPhong: {
    type: Number,
    required: true
  },
  dKMang: {
    type: Boolean,
    default: false
  },
  status: Boolean,
  homeFlag: Boolean,
  hotFlag: Boolean,
  tinhTrangPhongID: {
    type: Schema.Types.ObjectId,
    ref: 'TinhTrangPhong'
  },
  khuPhongID: {
    type: Schema.Types.ObjectId,
    ref: 'KhuPhong'
  },
  loaiPhongID: {
    type: Schema.Types.ObjectId,
    ref: 'LoaiPhong'
  }
}

const options = {
  collection: 'phongs',
  timestamps: true
}

export {schema, options}