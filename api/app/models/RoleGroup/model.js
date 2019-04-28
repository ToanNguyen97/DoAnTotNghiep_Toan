import Mongoose, {Schema} from 'mongoose'
import {schema, options} from './schema.js'

const RoleGroupSchema = new Schema(schema,options)

export default Mongoose.model('RoleGroup',RoleGroupSchema)