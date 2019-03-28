import PhieuThuTienController from '../controller/index'
import PhieuThuTienVal from '../validate/index'

export default [
  {
    method: 'GET',
    path: '/phieuthutien',
    handler: PhieuThuTienController.getAll,
    config: {
      tags: ['api'],
      description: "lay danh sach phieu thu",
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
    path: '/sendmailphieuthutien/{id}',
    handler: PhieuThuTienController.sendMail,
    config: {
      tags: ['api'],
      validate: PhieuThuTienVal.sendmail,
      description: "gửi mail hóa đơn",
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
    path: '/phieuthutien',
    handler: PhieuThuTienController.save,
    config: {
      tags: ['api'],
      description: 'them hoac sua phieu thu',
      validate: PhieuThuTienVal.save,
      plugins: {
        'hapi-swagger': {
          responses: {'400': {'description': 'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  }
]