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