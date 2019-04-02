import UserController from '../controller/index'
import UserVal from '../validate/index'

export default [
  {
    method: 'POST',
    path: '/login',
    handler: UserController.login,
    config: {
      auth: false,
      description: 'check login',
      validate: UserVal.login,
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {'400':{'description': 'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/get-current-user',
    handler: UserController.getUser,
    config: {
      description: 'lay thong tin user',
      validate: UserVal.getuser,
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {'400':{'description': 'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/sigin',
    handler: UserController.signin,
    config: {
      auth: false,
      description: 'sigin account',
      validate: UserVal.signin,
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {'400':{'description': 'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  }
]