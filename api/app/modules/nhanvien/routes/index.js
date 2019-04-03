'use strict'

import NhanVienController from '../controller/index'
import NhanVienVal from '../validate/index'
import checkRoles from '../../../lib/services/checkQuyen.js'

export default [
  {
    method: 'GET',
    path: '/nhanvien',
    handler: NhanVienController.getAll,
    config: {
      pre: [{
        method: checkRoles.isRolesAdmin,
        assign: 'isRoles'
      }],
      tags: ['api'],
      description: 'lay danh sach nhan vien',
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
    path: '/nhanvien',
    handler: NhanVienController.save,
    config: {
      pre: [{
        method: checkRoles.isRolesAdmin,
        assign: 'isRoles'
      }],
      description: 'them va sua nhan vien',
      tags: ['api'],
      validate: NhanVienVal.save,
      plugins: {
        'hapi-swagger': {
          responses: {'400': {'description': 'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  }
]