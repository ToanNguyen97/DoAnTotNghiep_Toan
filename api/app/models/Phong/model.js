import Mongoose, {Schema} from 'mongoose'
import { schema, options} from './schema'

const PhongSchema = new Schema(schema,options)


export default Mongoose.model('Phong', PhongSchema)