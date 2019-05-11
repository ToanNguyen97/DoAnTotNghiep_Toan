import Boom from 'boom'
import Mongoose from 'mongoose'
const Booking = Mongoose.model('Booking')
const get = async (request, h) => {
  try {
    return Booking.find()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const book = async (request, h) => {
  try {
    let data = request.payload
    return await Booking.create(data)
  } catch (err) {
    return Boom.forbidden(err)
  }
}

export default {
  get,
  book
}