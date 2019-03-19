import Mongoose, {Schema} from 'mongoose'
import {schema, options} from './schema'

const phongSchema = new Schema(schema,options)

export default Mongoose.model('KhachThue', phongSchema)