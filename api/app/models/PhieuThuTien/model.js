import Mongoose, {Schema} from 'mongoose'
import {schema, options} from './schema'

const PhieuThuTienSchema = new Schema(schema, options)

export default Mongoose.model('PhieuThuTien', PhieuThuTienSchema)