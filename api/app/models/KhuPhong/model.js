'use strict'

import Mongoose, { Schema } from 'mongoose'
import { schema, options } from './schema'

const KhuPhongSchema = new Schema(schema, options)

export default Mongoose.model('KhuPhong', KhuPhongSchema)