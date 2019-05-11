import bookingController from '../controller/index.js'
import bookingVal from '../validate/index.js'

export default [
  {
    method: 'GET',
    path:'/booking',
    handler: bookingController.get,
    config: {
      tags: ['api'],
      auth:false,
      description: 'lay danh sach cac khoan thu',
      plugins: {
        'hapi-swagger': {
          responses: {'400': {'description': 'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  },
  {
    method: 'POST',
    path:'/book-phong',
    handler: bookingController.book,
    config: {
      tags: ['api'],
      auth: false,
      validate: bookingVal.book,
      description: 'dat phong',
      plugins: {
        'hapi-swagger': {
          responses: {'400': {'description': 'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  }
]