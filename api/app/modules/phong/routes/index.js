import PhongController from '../controller/index.js'
import PhongVal from '../validate/index.js'
import Boom from 'boom'
export default [
  {
    method: 'GET',
    path: '/phong',
    handler: PhongController.getAll,
    config: {
      pre: [{
        method: function check(request, h) {
          try {
            let roles = request.auth.credentials.credentials.roles
            console.log(roles)
            if(!roles.includes('super-admin')){
              return false
            }
            else {
              return true
            }
          } catch (err) {
            return Boom.forbidden(err)
          }          
        }
      }],
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
    path: '/timkiemphong/timchinhxac={isReal}',
    handler: PhongController.searchMultiple,
    config: {
      description: 'tim kiem nhieu tham so',
      validate: PhongVal.search,
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
    method: 'GET',
    path: '/phong/{id}',
    handler: PhongController.getById,
    config: {
      validate: PhongVal.get,
      description: 'xem thong tin phong',
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
    handler: PhongController.save,
    config: {
      validate: PhongVal.create,
      description: 'vua them sua phong',
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
    method: 'PUT',
    path:'/phong/{id}',
    handler: PhongController.update,
    config: {
      validate: PhongVal.update,
      description: 'cập nhật thông tin phòng',
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
    method: 'DELETE',
    path: '/phong/{id}',
    handler: PhongController.deletePhong,
    config: {
      validate: PhongVal.delete,
      description: 'Xoa phong',
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