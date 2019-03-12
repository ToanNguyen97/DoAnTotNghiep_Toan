'use strict'

import Routes from './routes/index.js'

exports.register = async (server, options) => {
  server.route(Routes)
}

exports.name = 'admin-khuphong'