import Boom from 'boom'

const get = async (request, h) => {
  try {
    return true
  } catch (err) {
    return Boom.forbidden(err)
  }
}

export default {
  get
}