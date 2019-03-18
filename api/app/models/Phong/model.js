import Mongoose, {Schema} from 'mongoose'
import { schema, options} from './schema'
import PhongDao from './dao'
const PhongSchema = new Schema(schema,options)

PhongSchema.plugin(PhongDao)

export default Mongoose.model('Phong', PhongSchema)