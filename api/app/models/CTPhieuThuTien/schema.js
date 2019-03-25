'use strict'
import { Schema } from "mongoose";

const schema = {
  STT: {
    type: Number,
    required: true,
    unique: true
  },
  phieuThuID: {
    type: Schema.Types.ObjectId,
    required: true
  },
  chiSoMoi: {
    type: Number,
    required: true
  },
  giaKhoanThu: {
    type: Number,
    required: true
  },
  cacKhoanaThuID: {
    type: Schema.Types.ObjectId,
    required: true
  }
}

const options = {
  collection: 'ctphieuthutiens'
}

export {schema, options}