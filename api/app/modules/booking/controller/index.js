import Boom from 'boom'
import Mongoose from 'mongoose'
import SendMail from '../../../lib/basemail/sendMail.js'
import MailBooking from '../../../lib/basemail/mailBooking.js'
import sendMail from '../../../lib/basemail/sendMail.js';
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
    let booking = await Booking.create(data)
    let options = {
      subject: 'Kích hoạt đơn đặt phòng',
      text: 'Kích hoạt đơn đặt phòng',
      content: MailBooking.mailBooking(booking)
    }
    await sendMail.SenMail(options, booking.email)
    return booking
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const activeBooking = async (request, h) => {
  try {
    let booking = await Booking.findById(request.params.id)
    booking.status = true
    await booking.save()
    let activeBooking = await Booking.findById(booking._id).populate([{path:'phongID', populate:['khuPhongID','loaiPhongID']}])
    return activeBooking
  } catch (err) {
    return Boom.forbidden(err)
  }
}

export default {
  get,
  book,
  activeBooking
}