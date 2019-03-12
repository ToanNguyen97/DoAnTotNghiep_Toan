'use strict'

import { plugin } from 'mongoose';

const mongo = require('../lib/mongo.js')
const redis = require('../lib/redis.js')
const Inert = require('inert')
const Vision = require('vision')
const HapiSwagger = require('hapi-swagger')
const HapiAuth2 = require ('hapi-auth-jwt2')
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
    HapiAuth2
  ])
    .then(async (err) => {
      if (err) {
        console.log(err)
      }
     /* Load models */
     require('@models/')

     /* Load Modules */
     let modules = []
     modules.push(require('@modules/admin/test'))

     if (modules.length) {
       let options = {}
       options.routes = { prefix: '/api/v1' }
       await server.register(modules, options, (err) => {
         if (err) {
           console.log(err)
         }
       })
     }
    })
}
