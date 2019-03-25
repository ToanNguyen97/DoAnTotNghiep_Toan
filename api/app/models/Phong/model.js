import Mongoose, {Schema} from 'mongoose'
import { schema, options} from './schema'
import PhongDao from './dao'
const PhongSchema = new Schema(schema,options)
PhongSchema.virtual('dsPhieuThu',{
  ref: 'PhieuThuTien',
  localField: '_id',
  foreignField: 'phongID'
})


PhongSchema.plugin(PhongDao)

export default Mongoose.model('Phong', PhongSchema)