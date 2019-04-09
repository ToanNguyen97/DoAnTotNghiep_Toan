import PhieuThuTienController from '../controller/index'
import PhieuThuTienVal from '../validate/index'
import checkRoles from '../../../lib/services/checkQuyen'
export default [
  {
    method: 'GET',
    path: '/phieuthutien',
    handler: PhieuThuTienController.getAll,
    config: {
      pre: [{
        method: checkRoles.isRoles,
        assign: 'isRoles'
      }],
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
    method: 'GET',
    path: '/hoan-tat-thanh-toan-paypal',
    handler: PhieuThuTienController.hoanTatPayPal,
    config: {
      tags: ['api'],
      auth:false,
      description: "hoàn tất giao dịch",
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
  },
  {
    method: 'POST',
    path: '/phieuthutien-thanhtoan',
    handler: PhieuThuTienController.thanhToanPayPal,
    config: {
      tags: ['api'],
      description: 'thanh toan paypal',
      validate: PhieuThuTienVal.thanhtoan,
      plugins: {
        'hapi-swagger': {
          responses: {'400': {'description': 'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  }
]