'use strict'

import {Schema} from 'mongoose'

const schema = {
  _id: {
    type: String,
    required:true
  },
  khachThueID: {
    type: Schema.Types.ObjectId,
    ref: 'KhachThue'
  },
  phongID: {
    type: Schema.Types.ObjectId,
    ref: 'Phong'
  },
  ngayKetThuc: {
    type: Date
  }
}

const options = {
  collection: 'hopdongs',
  timestamps: {
    createAt: 'ngayLap'
  }
}

export {schema, options}