'use strict'

import KhachThueController from '../controller/index'
import KhachThueVal from '../validate/index'

export default [
  {
    method: 'GET',
    path: '/khachthue',
    handler: KhachThueController.getAll,
    config: {
      tags: ['api'],
      description: 'lay danh sach khach thue',
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
    path: '/khachthue',
    handler: KhachThueController.save,
    config: {
      description: 'them va sua khach thue',
      tags: ['api'],
      validate: KhachThueVal.save,
      plugins: {
        'hapi-swagger': {
          responses: {'400': {'description': 'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  }
]