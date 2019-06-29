import Hapi from 'hapi'
import Path from 'path'
import _ from 'lodash'
import cron from 'node-cron'
import moment from 'moment'
import cmd from 'node-cmd'
process.env.NODE_CONFIG_DIR = Path.join(__dirname, '/app/config') // chỗ này dùng làm gì
global.CONFIG = require('config')
import {loader} from './app/bootstrap/bootstrap.js'
var options = _.cloneDeep(global.CONFIG.get('web.connection'))
const server = Hapi.Server(options)
server.liftOff =  async () => {
  try{
    await loader(server)
    await server.start();
    const task = cron.schedule('17 8 * * *', () =>  {
      let filename = 'QuanLyPhongTro-Auto-' + moment(new Date()).format('DD-MM-YYYY')
      cmd.run(`mongodump --out F:/DoAnTotNghiep/Backup/${filename} --db QuanLyPhongTro_57130724`);
      console.log('Da sao luu')
    }, {
      scheduled: false
    });
    task.start();
    console.log('Server running at ' + server.info.uri);
  } catch(err) {
    console.log(err);
    process.exit(1)
  } 
};
server.liftOff()