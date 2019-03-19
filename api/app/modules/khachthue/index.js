'use strict'

import KhachThueRoutes from './routes/index'

exports.register = async (server, options) => {
  server.route(KhachThueRoutes)
}

exports.name = 'khach-thue-admin'