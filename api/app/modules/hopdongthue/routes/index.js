'use strict'

import HopDongThueController from '../controller'
import HopDongThueVal from '../validate'

export default [
  {
    method: 'GET',
    path: '/hopdongthuephong',
    handler: HopDongThueController.getAll,
    config: {
      tags: ['api'],
      description: 'xem danh sach hop dong',
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
    path: '/hopdongthuephong',
    handler: HopDongThueController.save,
    config: {
      tags: ['api'],
      description: 'them va sua thong tin hop dong',
      validate: HopDongThueVal.save,
      plugins: {
        'hapi-swagger': {
          responses: {'400': {'description': 'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/hopdongthuephong/{id}',
    handler: HopDongThueController.getById,
    config: {
      tags: ['api'],
      description: 'xem thong tin 1 hop dong',
      validate: HopDongThueVal.getById,
      plugins: {
        'hapi-swagger': {
          responses: {'400': {'description': 'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  }
]