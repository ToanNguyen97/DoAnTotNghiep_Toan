const Joi = require('joi')
Joi.ObjectId = require('joi-objectid') (Joi)

const phieuThuTienVal = {
  save: {
    payload: {
      _id: Joi.string(),
      phongID: Joi.ObjectId(),
      ngayLap: Joi.date().required(),
      ngayHetHan: Joi.date().required(),
      moTa: Joi.string(),
      tinhTrangPhieuThu: Joi.string()
    },
    options: {
      allowUnknown: true
    }
  },
  sendmail: {
    params: {
      id: Joi.string()
    }
  },
  thanhtoan: {
    payload: {
      phieuthuInfo: Joi.object().required()
    }
  },
  thongKePT: {
    payload: {
      ngayThongKe: Joi.array().required(),
      tieuChi: Joi.string().required()
    }
  },
  BaoHetHanPT: {
    payload: {
      dsPT: Joi.array().required()
    }
  }
}

export default {...phieuThuTienVal}