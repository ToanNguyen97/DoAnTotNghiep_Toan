'use strict'

let config = {}
const Pack = require('./../../package')

config.web = {
  name: Pack.name,
  connection: {
    host: 'localhost',
    port: 3002,
    router: {
      isCaseSensitive: false,
      stripTrailingSlash: true
    },
    routes: {
      cors: {
        origin: ['*'],
        credentials: true
      }
    }
  },
  db: {
    uri: 'mongodb://localhost/QuanLyPhongTro_57130724'
  },
  redisOptions: {
    host: '127.0.0.1', // 13.228.4.248
    port: 6379,
    detect_buffers: true,
    prefix: Pack.name + ':'
  },
  jwt: {
    secret: 'BbZJjyoXAdr8BUZUiKKARWimKfrSmQ6fv8kZ8OFfc'
  }
}

module.exports = config
