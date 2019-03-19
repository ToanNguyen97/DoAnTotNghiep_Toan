'use strict'

import LoaiKhachThueRoutes from './routes'

exports.register = async (server, options) => {
  server.route(LoaiKhachThueRoutes)
}

exports.name = 'loai-khach-thue-admin'