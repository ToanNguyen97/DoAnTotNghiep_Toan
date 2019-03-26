'use strict'
import { Schema } from "mongoose";

const schema = {
  STT: {
    type: Number,
    required: true
  },
  phieuThuID: {
    type: String,
    ref: 'PhieuThuTien'
  },
  chiSoCu: {
    type: Number
  },
  chiSoMoi: {
    type: Number
  },
  cacKhoanThuID: {
    type: Schema.Types.ObjectId,
    ref: 'CacKhoanThu'
  }
}

const options = {
  collection: 'ctphieuthutiens'
}

export {schema, options}