import PhongController from '../controller/index.js'
import PhongVal from '../validate/index.js'

export default [
  {
    method: 'GET',
    path: '/phong',
    handler: PhongController.getAll,
    config: {
      description: 'lay danh sach phong',
      tags: ['api'],
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
    path:'/phong',
    handler: PhongController.create,
    config: {
      validate: PhongVal.create,
      description: 'tao phong moi',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {'400': {'description': 'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  }
]