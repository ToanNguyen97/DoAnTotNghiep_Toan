import bookingController from '../controller/index.js'
import bookingVal from '../validate/index.js'

export default [
  {
    method: 'GET',
    path:'/booking',
    handler: bookingController.get,
    config: {
      tags: ['api'],
      description: 'lay danh sach cac khoan thu',
      plugins: {
        'hapi-swagger': {
          responses: {'400': {'description': 'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  }
]