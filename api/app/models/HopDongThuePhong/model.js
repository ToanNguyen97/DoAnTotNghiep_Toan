'use strict'

import Mongoose, {Schema} from 'mongoose'
import {schema, options} from './schema'

const hopDongSchema = new Schema(schema, options)

export default Mongoose.model('HopDongThuePhong', hopDongSchema)