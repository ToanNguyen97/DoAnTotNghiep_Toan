'use strict'

import { plugin } from 'mongoose';

const mongo = require('../lib/mongo.js')
const redis = require('../lib/redis.js')
const Inert = require('inert')
const Vision = require('vision')
const HapiCors = require('hapi-cors')
const HapiSwagger = require('hapi-swagger')
const HapiAuth2 = require ('hapi-auth-jwt2')
const RouteImage = require('../lib/routeimage')
export const loader = async function (server) {
  const Pack = require('./../../package')
  const swaggerOptions = {
    info: {
      title: 'Test API',
      version: Pack.version
    }
  }
  await server.register([
    /* Plugin lib */
    mongo,
    redis,
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    },
    HapiAuth2,
    RouteImage,
    {
      plugin: HapiCors,
      options: {
          origins: ['*'],        
          methods: ['POST, GET, OPTIONS, PUT, DELETE']
      
      }
    }
  ])
    .then(async (err) => {
      if (err) {
        console.log(err)
      }
     /* Load models */
     require('../models/Phong/model')
     require('../models/KhuPhong/model')
     require('../models/LoaiPhong/model')
     require('../models/TinhTrangPhong/model')
     require('../models/KhachThue/model')
     require('../models/LoaiKhachThue/model')

     /* Load Modules */
     let modules = []
     modules.push(require('../modules/phong'))
     modules.push(require('../modules/khuphong'))
     modules.push(require('../modules/loaiphong'))
     modules.push(require('../modules/tinhtrangphong'))
     modules.push(require('../modules/khachthue'))
     modules.push(require('../modules/loaikhacthue'))
     
     if (modules.length) {
       let options = {}
       options.routes = { prefix: '/api' }
       await server.register(modules, options, (err) => {
         if (err) {
           console.log(err)
         }
       })
     }
    })
}
