module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hapi = __webpack_require__(/*! hapi */ "hapi");

var _hapi2 = _interopRequireDefault(_hapi);

var _path = __webpack_require__(/*! path */ "path");

var _path2 = _interopRequireDefault(_path);

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _bootstrap = __webpack_require__(/*! ./app/bootstrap/bootstrap.js */ "./app/bootstrap/bootstrap.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_CONFIG_DIR = _path2.default.join(__dirname, '/app/config'); // chỗ này dùng làm gì

global.CONFIG = __webpack_require__(/*! config */ "config");

var options = _lodash2.default.cloneDeep(global.CONFIG.get('web.connection'));

const server = _hapi2.default.Server(options);

server.liftOff = async () => {
  try {
    await (0, _bootstrap.loader)(server);
    await server.start();
    console.log('Server running at ' + server.info.uri);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

server.liftOff();

/***/ }),

/***/ "./app/bootstrap/bootstrap.js":
/*!************************************!*\
  !*** ./app/bootstrap/bootstrap.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loader = undefined;

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const mongo = __webpack_require__(/*! ../lib/mongo.js */ "./app/lib/mongo.js");

const redis = __webpack_require__(/*! ../lib/redis.js */ "./app/lib/redis.js");

const Inert = __webpack_require__(/*! inert */ "inert");

const Vision = __webpack_require__(/*! vision */ "vision");

const HapiCors = __webpack_require__(/*! hapi-cors */ "hapi-cors");

const HapiSwagger = __webpack_require__(/*! hapi-swagger */ "hapi-swagger");

const HapiAuth2 = __webpack_require__(/*! hapi-auth-jwt2 */ "hapi-auth-jwt2");

const RouteImage = __webpack_require__(/*! ../lib/routeimage */ "./app/lib/routeimage.js");

const loader = exports.loader = async function (server) {
  const Pack = __webpack_require__(/*! ./../../package */ "./package.json");

  const swaggerOptions = {
    info: {
      title: 'Test API',
      version: Pack.version
    }
  };
  await server.register([
  /* Plugin lib */
  mongo, redis, Inert, Vision, {
    plugin: HapiSwagger,
    options: swaggerOptions
  }, HapiAuth2, RouteImage, {
    plugin: HapiCors,
    options: {
      origins: ['*'],
      methods: ['POST, GET, OPTIONS, PUT, DELETE']
    }
  }]).then(async err => {
    if (err) {
      console.log(err);
    }
    /* Load models */


    __webpack_require__(/*! ../models/Phong/model */ "./app/models/Phong/model.js");

    __webpack_require__(/*! ../models/KhuPhong/model */ "./app/models/KhuPhong/model.js");

    __webpack_require__(/*! ../models/LoaiPhong/model */ "./app/models/LoaiPhong/model.js");

    __webpack_require__(/*! ../models/TinhTrangPhong/model */ "./app/models/TinhTrangPhong/model.js");

    __webpack_require__(/*! ../models/KhachThue/model */ "./app/models/KhachThue/model.js");

    __webpack_require__(/*! ../models/LoaiKhachThue/model */ "./app/models/LoaiKhachThue/model.js");

    __webpack_require__(/*! ../models/HopDongThuePhong/model */ "./app/models/HopDongThuePhong/model.js");

    __webpack_require__(/*! ../models/PhieuThuTien/model */ "./app/models/PhieuThuTien/model.js");

    __webpack_require__(/*! ../models/CTPhieuThuTien/model */ "./app/models/CTPhieuThuTien/model.js");

    __webpack_require__(/*! ../models/CacKhoanThu/model */ "./app/models/CacKhoanThu/model.js");
    /* Load Modules */


    let modules = [];
    modules.push(__webpack_require__(/*! ../modules/phong */ "./app/modules/phong/index.js"));
    modules.push(__webpack_require__(/*! ../modules/khuphong */ "./app/modules/khuphong/index.js"));
    modules.push(__webpack_require__(/*! ../modules/loaiphong */ "./app/modules/loaiphong/index.js"));
    modules.push(__webpack_require__(/*! ../modules/tinhtrangphong */ "./app/modules/tinhtrangphong/index.js"));
    modules.push(__webpack_require__(/*! ../modules/khachthue */ "./app/modules/khachthue/index.js"));
    modules.push(__webpack_require__(/*! ../modules/loaikhacthue */ "./app/modules/loaikhacthue/index.js"));
    modules.push(__webpack_require__(/*! ../modules/hopdongthue */ "./app/modules/hopdongthue/index.js"));
    modules.push(__webpack_require__(/*! ../modules/cackhoanthu */ "./app/modules/cackhoanthu/index.js"));
    modules.push(__webpack_require__(/*! ../modules/phieuthutien */ "./app/modules/phieuthutien/index.js"));

    if (modules.length) {
      let options = {};
      options.routes = {
        prefix: '/api'
      };
      await server.register(modules, options, err => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
};

/***/ }),

/***/ "./app/lib/basemail/mailHopDong.js":
/*!*****************************************!*\
  !*** ./app/lib/basemail/mailHopDong.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const fs = __webpack_require__(/*! fs */ "fs");

const moment = __webpack_require__(/*! moment */ "moment");

const path = __webpack_require__(/*! path */ "path");

const mailHopDong = function (data) {
  let content = fs.readFileSync(path.join(__dirname, 'app', 'lib', 'basemail', 'templateHopDong.html'));
  content = String(content);
  content = content.replace('{{soHD}}', `${data._id}`);
  content = content.replace('{{hoTenKhachThue}}', `${data.khachThueID.hoKhachThue} ${data.khachThueID.tenKhachThue}`);
  content = content.replace('{{hoTenKhachThue}}', `${data.khachThueID.hoKhachThue} ${data.khachThueID.tenKhachThue}`);
  content = content.replace('{{hoTenKhachThue}}', `${data.khachThueID.hoKhachThue} ${data.khachThueID.tenKhachThue}`);
  content = content.replace('{{ngaySinh}}', `${moment(data.khachThueID.ngaySinh).format('DD/MM/YYYY')}`);
  content = content.replace('{{CMND}}', `${data.khachThueID.soCMND}`);
  content = content.replace('{{diaChi}}', `${data.khachThueID.diaChi}`);
  content = content.replace('{{tenPhong}}', `${data.phongID.tenPhong}`);
  content = content.replace('{{tenKhuPhong}}', `${data.phongID.khuPhongID.tenKhuPhong}`);
  content = content.replace('{{loaiPhong}}', `${data.phongID.loaiPhongID.tenLoaiPhong}`);
  content = content.replace('{{giaPhong}}', `${data.phongID.giaPhong.toLocaleString()}`);
  content = content.replace('{{ngayThue}}', `${moment(data.ngayLap).format('DD/MM/YYYY')} `);
  content = content.replace('{{ngayTra}}', `${moment(data.ngayKetThuc).format('DD/MM/YYYY')}`);
  content = content.replace('{{ngayKy}}', `${moment(Date.now()).format(`DD/MM/YYYY`)}`);
  return content;
};

exports.default = {
  mailHopDong
};

/***/ }),

/***/ "./app/lib/basemail/sendMail.js":
/*!**************************************!*\
  !*** ./app/lib/basemail/sendMail.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mailHopDong = __webpack_require__(/*! ./mailHopDong */ "./app/lib/basemail/mailHopDong.js");

var _mailHopDong2 = _interopRequireDefault(_mailHopDong);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const nodemailer = __webpack_require__(/*! nodemailer */ "nodemailer");

const SenMail = async data => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'toan210597ntu@gmail.com',
      clientId: '529369342696-4u88ucm5d6rgudkl84alam67eht2h7rq.apps.googleusercontent.com',
      clientSecret: '10jxMEC_wXSxRlMxkPfU39pF',
      refreshToken: '1/aG6GoKDmPvwG2OQK3H_tUkzeu1RopMJV8_vBfirFQL0'
    }
  });
  let mailOptions = {
    from: '<toan210597ntu@gmail.com>',
    to: "BeachCrestNhaTrang@gmail.com",
    subject: "Hợp Đồng Thuê Phòng Trọ",
    text: "Hợp Đồng Thuê Phòng Trọ",
    html: _mailHopDong2.default.mailHopDong(data)
  };
  await transporter.sendMail(mailOptions, function (err, res) {
    if (err) {
      console.log('Lỗi', err);
    } else {
      console.log("Đã gửi mail"); // Preview only available when sending through an Ethereal account
    }
  });
};

exports.default = {
  SenMail
};

/***/ }),

/***/ "./app/lib/mongo.js":
/*!**************************!*\
  !*** ./app/lib/mongo.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(/*! mongoose-paginate */ "mongoose-paginate");

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = async function (server, options) {
  await _mongoose2.default.connect(global.CONFIG.get('web.db.uri'), {
    useNewUrlParser: true
  });

  _mongoose2.default.set('useCreateIndex', true);

  _mongoose2.default.set('useFindAndModify', false);

  _mongoose2.default.plugin(_mongoosePaginate2.default);

  console.log('Register Mongo:', global.CONFIG.get('web.db.uri'));
};

exports.name = 'app-mongo';

/***/ }),

/***/ "./app/lib/redis.js":
/*!**************************!*\
  !*** ./app/lib/redis.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const bluebird = __webpack_require__(/*! bluebird */ "bluebird");

const redis = __webpack_require__(/*! redis */ "redis");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

exports.register = async function (server, options) {
  let settings = global.CONFIG.get('web.redisOptions');
  global.client = redis.createClient(settings);
  server.decorate('server', 'redis', global.client);
  server.expose('client', global.client);
};

exports.name = 'app-redis';
exports.dependencies = 'app-mongo';

/***/ }),

/***/ "./app/lib/routeimage.js":
/*!*******************************!*\
  !*** ./app/lib/routeimage.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.register = async (server, options) => {
  server.route({
    method: 'GET',
    path: '/image/{file*}',
    handler: (request, h) => {
      try {
        return h.file('app/lib/images/' + request.params.file);
      } catch (err) {
        return err;
      }
    }
  });
};

exports.name = 'route-image';

/***/ }),

/***/ "./app/models/CTPhieuThuTien/model.js":
/*!********************************************!*\
  !*** ./app/models/CTPhieuThuTien/model.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/CTPhieuThuTien/schema.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cTPhieuThuTienSchema = new _mongoose.Schema(_schema.schema, _schema.options);
exports.default = _mongoose2.default.model('CTPhieuThuTien', cTPhieuThuTienSchema);

/***/ }),

/***/ "./app/models/CTPhieuThuTien/schema.js":
/*!*********************************************!*\
  !*** ./app/models/CTPhieuThuTien/schema.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = exports.schema = undefined;

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const schema = {
  STT: {
    type: Number,
    required: true,
    unique: true
  },
  phieuThuID: {
    type: _mongoose.Schema.Types.ObjectId,
    required: true
  },
  chiSoMoi: {
    type: Number,
    required: true
  },
  giaKhoanThu: {
    type: Number,
    required: true
  },
  cacKhoanaThuID: {
    type: _mongoose.Schema.Types.ObjectId,
    required: true
  }
};
const options = {
  collection: 'ctphieuthutiens'
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/CacKhoanThu/model.js":
/*!*****************************************!*\
  !*** ./app/models/CacKhoanThu/model.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/CacKhoanThu/schema.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cacKhoanThuSchema = new _mongoose.Schema(_schema.schema, _schema.options);
exports.default = _mongoose2.default.model('CacKhoanThu', cacKhoanThuSchema);

/***/ }),

/***/ "./app/models/CacKhoanThu/schema.js":
/*!******************************************!*\
  !*** ./app/models/CacKhoanThu/schema.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const schema = {
  tenKhoanThu: {
    type: String,
    required: true,
    max: 30
  },
  giaKhoanThu: {
    type: Number,
    required: true
  },
  donViTinh: {
    type: String,
    required: true,
    max: 30
  }
};
const options = {
  collection: 'cackhoanthus'
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/HopDongThuePhong/model.js":
/*!**********************************************!*\
  !*** ./app/models/HopDongThuePhong/model.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/HopDongThuePhong/schema.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const hopDongSchema = new _mongoose.Schema(_schema.schema, _schema.options);
exports.default = _mongoose2.default.model('HopDongThuePhong', hopDongSchema);

/***/ }),

/***/ "./app/models/HopDongThuePhong/schema.js":
/*!***********************************************!*\
  !*** ./app/models/HopDongThuePhong/schema.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = exports.schema = undefined;

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const schema = {
  _id: {
    type: String,
    required: true
  },
  khachThueID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'KhachThue'
  },
  phongID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Phong'
  },
  ngayLap: {
    type: Date
  },
  ngayKetThuc: {
    type: Date
  }
};
const options = {
  collection: 'hopdongs'
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/KhachThue/dao.js":
/*!*************************************!*\
  !*** ./app/models/KhachThue/dao.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (schema, options) {
  schema.statics.searchMultiple = async function (payload) {
    let Model = this;
    let queryString = {};

    if (payload.hoKhachThue) {
      queryString.hoKhachThue = {
        $regex: '.*' + payload.hoKhachThue + '.*'
      };
    }

    if (payload.tenKhachThue) {
      queryString.tenKhachThue = {
        $regex: '.*' + payload.tenKhachThue + '.*'
      };
    }

    if (payload.hoTenNguoiThan) {
      queryString.hoTenNguoiThan = {
        $regex: '.*' + payload.hoTenNguoiThan + '.*'
      };
    }

    if (payload.diaChi) {
      queryString.diaChi = {
        $regex: '.*' + payload.diaChi + '.*'
      };
    }

    if (payload.email) {
      queryString.email = {
        $regex: '.*' + payload.email + '.*'
      };
    }

    if (payload.loaiKhachThueID) {
      queryString.loaiKhachThueID = payload.loaiKhachThueID;
    }

    if (payload.tinhTrangKhachThue) {
      queryString.tinhTrangKhachThue = payload.tinhTrangKhachThue;
    }

    if (payload.soDienThoai) {
      queryString.soDienThoai = {
        $regex: '.*' + payload.soDienThoai + '.*'
      };
    }

    if (payload.soCMND) {
      queryString.soCMND = {
        $regex: '.*' + payload.soCMND + '.*'
      };
    }

    if (payload.gioiTinh) {
      queryString.gioiTinh = payload.gioiTinh;
    }

    if (payload.ngaySinh) {
      queryString.ngaySinh = payload.ngaySinh;
    }

    let data = await Model.find(queryString).lean().populate('loaiKhachThueID');
    return data;
  };
};

/***/ }),

/***/ "./app/models/KhachThue/model.js":
/*!***************************************!*\
  !*** ./app/models/KhachThue/model.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/KhachThue/schema.js");

var _dao = __webpack_require__(/*! ./dao.js */ "./app/models/KhachThue/dao.js");

var _dao2 = _interopRequireDefault(_dao);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const phongSchema = new _mongoose.Schema(_schema.schema, _schema.options);
phongSchema.plugin(_dao2.default);
exports.default = _mongoose2.default.model('KhachThue', phongSchema);

/***/ }),

/***/ "./app/models/KhachThue/schema.js":
/*!****************************************!*\
  !*** ./app/models/KhachThue/schema.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = exports.schema = undefined;

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const schema = {
  hoKhachThue: {
    type: String,
    required: true,
    max: 30
  },
  tenKhachThue: {
    type: String,
    required: true,
    max: 20
  },
  anhDaiDien: {
    type: String,
    required: true
  },
  ngaySinh: {
    type: Date,
    required: true
  },
  gioiTinh: {
    type: Boolean,
    required: true,
    default: false
  },
  soCMND: {
    type: String,
    required: true,
    max: 11
  },
  soDienThoai: {
    type: String,
    max: 11
  },
  hoTenNguoiThan: {
    type: String,
    max: 50
  },
  diaChi: {
    type: String,
    required: true,
    max: 80
  },
  loaiKhachThueID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'LoaiKhachThue'
  },
  tinhTrangKhachThue: {
    type: String,
    required: true
  },
  phongs: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Phong'
  }],
  email: String
};
const options = {
  collection: 'khacthues'
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/KhuPhong/model.js":
/*!**************************************!*\
  !*** ./app/models/KhuPhong/model.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/KhuPhong/schema.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const KhuPhongSchema = new _mongoose.Schema(_schema.schema, _schema.options);
KhuPhongSchema.virtual('dsPhong', {
  ref: 'Phong',
  localField: '_id',
  foreignField: 'khuPhongID'
});
exports.default = _mongoose2.default.model('KhuPhong', KhuPhongSchema);

/***/ }),

/***/ "./app/models/KhuPhong/schema.js":
/*!***************************************!*\
  !*** ./app/models/KhuPhong/schema.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const schema = {
  tenKhuPhong: {
    type: String,
    required: true,
    max: 20
  },
  anhKhuPhong: {
    type: String
  },
  moTa: String
};
const options = {
  collection: 'khuphongs',
  timestamps: true,
  virtuals: true
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/LoaiKhachThue/model.js":
/*!*******************************************!*\
  !*** ./app/models/LoaiKhachThue/model.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/LoaiKhachThue/schema.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const loaiKhachThueSchema = new _mongoose.Schema(_schema.schema, _schema.options);
exports.default = _mongoose2.default.model('LoaiKhachThue', loaiKhachThueSchema);

/***/ }),

/***/ "./app/models/LoaiKhachThue/schema.js":
/*!********************************************!*\
  !*** ./app/models/LoaiKhachThue/schema.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const schema = {
  tenLoaiKhachThue: {
    type: String,
    required: true,
    max: 30
  }
};
const options = {
  collection: 'loaikhachthues'
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/LoaiPhong/model.js":
/*!***************************************!*\
  !*** ./app/models/LoaiPhong/model.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/LoaiPhong/schema.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LoaiPhongSchema = new _mongoose.Schema(_schema.schema, _schema.options);
exports.default = _mongoose2.default.model('LoaiPhong', LoaiPhongSchema);

/***/ }),

/***/ "./app/models/LoaiPhong/schema.js":
/*!****************************************!*\
  !*** ./app/models/LoaiPhong/schema.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const schema = {
  tenLoaiPhong: {
    type: String,
    required: true,
    max: 30
  },
  giaPhong: {
    type: Number,
    required: true
  }
};
const options = {
  collections: 'loaiphongs'
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/PhieuThuTien/model.js":
/*!******************************************!*\
  !*** ./app/models/PhieuThuTien/model.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/PhieuThuTien/schema.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PhieuThuTienSchema = new _mongoose.Schema(_schema.schema, _schema.options);
exports.default = _mongoose2.default.model('PhieuThuTien', PhieuThuTienSchema);

/***/ }),

/***/ "./app/models/PhieuThuTien/schema.js":
/*!*******************************************!*\
  !*** ./app/models/PhieuThuTien/schema.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = exports.schema = undefined;

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const schema = {
  _id: {
    type: String,
    required: true,
    length: 16
  },
  phongID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Phong'
  },
  ngayLap: {
    type: Date,
    required: true,
    default: Date.now()
  },
  ngayHetHan: {
    type: Date,
    required: true
  },
  moTa: {
    type: String
  },
  tinhTrangPhieuThu: {
    type: String,
    required: true,
    enum: ['chưa đóng', 'đã đóng', 'quá hạn']
  }
};
const options = {
  collection: 'phieuthutiens'
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/Phong/dao.js":
/*!*********************************!*\
  !*** ./app/models/Phong/dao.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (schema, options) {
  schema.statics.SearchMultiple = async function (payload) {
    let Model = this;
    let queryString = {};

    if (payload.tenPhong) {
      queryString.tenPhong = {
        $regex: '.*' + payload.tenPhong + '.*'
      };
    }

    if (payload.khuPhongID) {
      queryString.khuPhongID = payload.khuPhongID;
    }

    if (payload.loaiPhongID) {
      queryString.loaiPhongID = payload.loaiPhongID;
    }

    if (payload.moTa) {
      queryString.moTa = {
        $regex: `.*${payload.moTa}.*`
      };
    }

    if (payload.soDien) {
      queryString.soDien = payload.soDien;
    }

    if (payload.soNuoc) {
      queryString.soNuoc = payload.soNuoc;
    }

    if (payload.dKMang) {
      queryString.dKMang = payload.dKMang;
    }

    if (payload.homeFlag) {
      queryString.homeFlag = payload.homeFlag;
    }

    if (payload.hotFlag) {
      queryString.hotFlag = payload.hotFlag;
    }

    if (payload.status) {
      queryString.status = payload.status;
    }

    console.log(queryString);
    let data = await Model.find(queryString).lean().populate('loaiPhongID').populate('khuPhongID').populate('tinhTrangPhongID');
    return data;
  };
};

/***/ }),

/***/ "./app/models/Phong/model.js":
/*!***********************************!*\
  !*** ./app/models/Phong/model.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/Phong/schema.js");

var _dao = __webpack_require__(/*! ./dao */ "./app/models/Phong/dao.js");

var _dao2 = _interopRequireDefault(_dao);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PhongSchema = new _mongoose.Schema(_schema.schema, _schema.options);
PhongSchema.virtual('dsPhieuThu', {
  ref: 'PhieuThuTien',
  localField: '_id',
  foreignField: 'phongID'
});
PhongSchema.plugin(_dao2.default);
exports.default = _mongoose2.default.model('Phong', PhongSchema);

/***/ }),

/***/ "./app/models/Phong/schema.js":
/*!************************************!*\
  !*** ./app/models/Phong/schema.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = exports.schema = undefined;

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schema = {
  tenPhong: {
    type: String,
    trim: true,
    max: 20,
    required: true
  },
  anhChinh: {
    type: String,
    required: true
  },
  anhChiTiet: {
    type: Array
  },
  moTa: {
    type: String
  },
  soDien: {
    type: Number,
    required: true
  },
  soNuoc: {
    type: Number,
    required: true
  },
  giaPhong: {
    type: Number,
    required: true
  },
  dKMang: {
    type: Boolean
  },
  status: Boolean,
  homeFlag: Boolean,
  hotFlag: Boolean,
  tinhTrangPhongID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'TinhTrangPhong'
  },
  khuPhongID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'KhuPhong'
  },
  loaiPhongID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'LoaiPhong'
  }
};
const options = {
  collection: 'phongs',
  virtuals: true
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/TinhTrangPhong/model.js":
/*!********************************************!*\
  !*** ./app/models/TinhTrangPhong/model.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/TinhTrangPhong/schema.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TinhTrangPhongSchema = new _mongoose.Schema(_schema.schema, _schema.options);
exports.default = _mongoose2.default.model('TinhTrangPhong', TinhTrangPhongSchema);

/***/ }),

/***/ "./app/models/TinhTrangPhong/schema.js":
/*!*********************************************!*\
  !*** ./app/models/TinhTrangPhong/schema.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const schema = {
  tenTinhTrangPhong: {
    type: String,
    required: true,
    max: 20
  }
};
const options = {
  collection: 'tinhtrangphongs'
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/modules/cackhoanthu/controller/index.js":
/*!*****************************************************!*\
  !*** ./app/modules/cackhoanthu/controller/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const Mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const CacKhoanThu = Mongoose.model('CacKhoanThu');

const Boom = __webpack_require__(/*! boom */ "boom");

const save = async (request, h) => {
  try {
    let data = request.payload;
    let item = {};

    if (!data.id) {
      item = new CacKhoanThu(data);
    } else {
      item = await CacKhoanThu.findById({
        _id: data.id
      });
      item = Object.assign(item, data);
    }

    return await item.save();
  } catch (err) {
    return Boom.forbidden(err);
  }
};

const getAll = async (request, h) => {
  try {
    return await CacKhoanThu.find();
  } catch (err) {
    return Boom.forbidden(err);
  }
};

exports.default = {
  save,
  getAll
};

/***/ }),

/***/ "./app/modules/cackhoanthu/index.js":
/*!******************************************!*\
  !*** ./app/modules/cackhoanthu/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./routes/index */ "./app/modules/cackhoanthu/routes/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = (server, options) => {
  server.route(_index2.default);
};

exports.name = 'cac-khoan-thu-admin';

/***/ }),

/***/ "./app/modules/cackhoanthu/routes/index.js":
/*!*************************************************!*\
  !*** ./app/modules/cackhoanthu/routes/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../controller/index */ "./app/modules/cackhoanthu/controller/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../validate/index */ "./app/modules/cackhoanthu/validate/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'GET',
  path: '/cackhoanthu',
  handler: _index2.default.getAll,
  config: {
    tags: ['api'],
    description: 'lay danh sach cac khoan thu',
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/cackhoanthu',
  handler: _index2.default.save,
  config: {
    tags: ['api'],
    description: 'them hoac sua cac khoan thu',
    validate: _index4.default.save,
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/cackhoanthu/validate/index.js":
/*!***************************************************!*\
  !*** ./app/modules/cackhoanthu/validate/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(/*! joi */ "joi");

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_joi2.default.ObjectId = __webpack_require__(/*! joi-objectid */ "joi-objectid")(_joi2.default);
const cacKhoanThuVal = {
  save: {
    payload: {
      tenKhoanThu: _joi2.default.string().required().max(30),
      giaKhoanThu: _joi2.default.number().required(),
      donViTinh: _joi2.default.string().required().max(30)
    }
  }
};
exports.default = { ...cacKhoanThuVal
};

/***/ }),

/***/ "./app/modules/hopdongthue/controller/index.js":
/*!*****************************************************!*\
  !*** ./app/modules/hopdongthue/controller/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _boom = __webpack_require__(/*! boom */ "boom");

var _boom2 = _interopRequireDefault(_boom);

var _sendMail = __webpack_require__(/*! ../../../lib/basemail/sendMail.js */ "./app/lib/basemail/sendMail.js");

var _sendMail2 = _interopRequireDefault(_sendMail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const HopDongThuePhong = _mongoose2.default.model('HopDongThuePhong');

const KhachThue = _mongoose2.default.model('KhachThue'); //import translateCharacter from '../../../lib/services/translateCharacter.js'


const save = async (request, h) => {
  try {
    let data = request.payload;
    console.log('data', data);
    let item = await HopDongThuePhong.findById(data._id);

    if (item) {
      item = Object.assign(item, data);
    } else {
      item = new HopDongThuePhong(data); // sau khi lập hợp đồng thì thêm phòng đó vào khách thuê

      let khachThue = await KhachThue.findById({
        _id: item.khachThueID
      });

      if (khachThue && !khachThue.phongs) {
        khachThue.phongs = [];
      }

      khachThue.phongs = khachThue.phongs.filter(key => key != item.phongID);
      khachThue.phongs = [...khachThue.phongs, ...[item.phongID]];
      khachThue.save();
    }

    await item.save();
    let hopdong = await HopDongThuePhong.findById(item._id).populate([{
      path: 'khachThueID'
    }, {
      path: 'phongID',
      populate: ['khuPhongID', 'tinhTrangPhongID', 'loaiPhongID']
    }]);

    _sendMail2.default.SenMail(hopdong);

    return hopdong;
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const getAll = async (request, h) => {
  try {
    return await HopDongThuePhong.find().populate('khachThueID').populate('phongID');
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const getById = async (request, h) => {
  try {
    return (await HopDongThuePhong.find({
      _id: request.params.id
    }).populate('khachThueID').populate('phongID')) || _boom2.default.notFound();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

exports.default = {
  getAll,
  getById,
  save
};

/***/ }),

/***/ "./app/modules/hopdongthue/index.js":
/*!******************************************!*\
  !*** ./app/modules/hopdongthue/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _routes = __webpack_require__(/*! ./routes */ "./app/modules/hopdongthue/routes/index.js");

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = (server, options) => {
  server.route(_routes2.default);
};

exports.name = 'hop-dong-thue-phong-admin';

/***/ }),

/***/ "./app/modules/hopdongthue/routes/index.js":
/*!*************************************************!*\
  !*** ./app/modules/hopdongthue/routes/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controller = __webpack_require__(/*! ../controller */ "./app/modules/hopdongthue/controller/index.js");

var _controller2 = _interopRequireDefault(_controller);

var _validate = __webpack_require__(/*! ../validate */ "./app/modules/hopdongthue/validate/index.js");

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'GET',
  path: '/hopdongthuephong',
  handler: _controller2.default.getAll,
  config: {
    tags: ['api'],
    description: 'xem danh sach hop dong',
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/hopdongthuephong',
  handler: _controller2.default.save,
  config: {
    tags: ['api'],
    description: 'them va sua thong tin hop dong',
    validate: _validate2.default.save,
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/hopdongthuephong/{id}',
  handler: _controller2.default.getById,
  config: {
    tags: ['api'],
    description: 'xem thong tin 1 hop dong',
    validate: _validate2.default.getById,
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/hopdongthue/validate/index.js":
/*!***************************************************!*\
  !*** ./app/modules/hopdongthue/validate/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(/*! joi */ "joi");

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_joi2.default.ObjectId = __webpack_require__(/*! joi-objectid */ "joi-objectid")(_joi2.default);
const hopDongThueVal = {
  save: {
    payload: {
      _id: _joi2.default.string(),
      khachThueID: _joi2.default.ObjectId(),
      phongID: _joi2.default.ObjectId(),
      ngayKetThuc: _joi2.default.date(),
      ngayLap: _joi2.default.date()
    },
    options: {
      allowUnknown: true
    }
  },
  get: {
    params: {
      id: _joi2.default.string().required()
    }
  },
  delete: {
    params: {
      id: _joi2.default.string().required()
    }
  }
};
exports.default = { ...hopDongThueVal
};

/***/ }),

/***/ "./app/modules/khachthue/controller/index.js":
/*!***************************************************!*\
  !*** ./app/modules/khachthue/controller/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _boom = __webpack_require__(/*! boom */ "boom");

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fs = __webpack_require__(/*! fs */ "fs");

const KhachThue = _mongoose2.default.model('KhachThue');

const save = async (request, h) => {
  try {
    let data = request.payload;
    let item = {};

    if (!data._id) {
      let anhDaiDien64 = data.anhDaiDien.file64.replace(/^data(.*?)base64,/, "");
      fs.writeFile(`app/lib/images/${data.anhDaiDien.name}`, anhDaiDien64, 'base64', function (err) {
        return err;
      });
      data.anhDaiDien = data.anhDaiDien.name;
      item = new KhachThue(data);
    } else {
      if (data.anhDaiDien.name === null || data.anhDaiDien.name === "" || data.anhDaiDien.name === undefined) {
        item = await KhachThue.findById({
          _id: data._id
        });
        data.anhDaiDien = item.anhDaiDien;
        item = Object.assign(item, data);
      } else {
        let anhDaiDien64 = data.anhDaiDien.file64.replace(/^data(.*?)base64,/, "");
        fs.writeFile(`app/lib/images/${data.anhDaiDien.name}`, anhDaiDien64, 'base64', function (err) {
          return err;
        });
        data.anhDaiDien = data.anhDaiDien.name;
        item = await KhachThue.findById({
          _id: data._id
        });
        item = Object.assign(item, data);
      }
    }

    await item.save();

    let khachThue = (await KhachThue.findById({
      _id: item._id
    }).populate('loaiKhachThueID')) || _boom2.default.notFound();

    return khachThue;
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const getAll = async (request, h) => {
  try {
    return (await KhachThue.find().populate('loaiKhachThueID')) || _boom2.default.notFound();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const deleteKhachThue = async (request, h) => {
  try {
    return (await KhachThue.findOneAndDelete({
      _id: request.params.id
    })) || _boom2.default.notFound();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const search = async (request, h) => {
  try {
    let data = request.payload;

    if (request.params.isReal === true) {
      let items = await KhachThue.find(data).populate('loaiKhachThueID');
      return items;
    } else {
      let items = await KhachThue.searchMultiple(data);
      return items;
    }
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const getByDT = async (request, h) => {
  try {
    console.log('vao roi');
    return (await KhachThue.find({
      soDienThoai: request.params.sdt
    }).populate('loaiKhachThueID')) || _boom2.default.notFound();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

exports.default = {
  save,
  getAll,
  deleteKhachThue,
  search,
  getByDT
};

/***/ }),

/***/ "./app/modules/khachthue/index.js":
/*!****************************************!*\
  !*** ./app/modules/khachthue/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./routes/index */ "./app/modules/khachthue/routes/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = (server, options) => {
  server.route(_index2.default);
};

exports.name = 'khach-thue-admin';

/***/ }),

/***/ "./app/modules/khachthue/routes/index.js":
/*!***********************************************!*\
  !*** ./app/modules/khachthue/routes/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../controller/index */ "./app/modules/khachthue/controller/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../validate/index */ "./app/modules/khachthue/validate/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'GET',
  path: '/khachthue',
  handler: _index2.default.getAll,
  config: {
    tags: ['api'],
    description: 'lay danh sach khach thue',
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/khachthue/sdt={sdt}',
  handler: _index2.default.getByDT,
  config: {
    tags: ['api'],
    validate: _index4.default.getByDT,
    description: 'lay thong tin khach by so dien thoai',
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/khachthue',
  handler: _index2.default.save,
  config: {
    description: 'them va sua khach thue',
    tags: ['api'],
    validate: _index4.default.save,
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/khachthuetimkiem/chinhxac={isReal}',
  handler: _index2.default.search,
  config: {
    description: 'im kiem khach thue',
    tags: ['api'],
    validate: _index4.default.search,
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'DELETE',
  path: '/khachthue/{id}',
  handler: _index2.default.deleteKhachThue,
  config: {
    tags: ['api'],
    description: 'xoa thong tin khach thue',
    validate: _index4.default.delete,
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/khachthue/validate/index.js":
/*!*************************************************!*\
  !*** ./app/modules/khachthue/validate/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const Joi = __webpack_require__(/*! joi */ "joi");

Joi.ObjectId = __webpack_require__(/*! joi-objectid */ "joi-objectid")(Joi);
const khachThueVal = {
  save: {
    payload: {
      _id: Joi.string().length(24),
      hoKhachThue: Joi.string().required().max(30),
      tenKhachThue: Joi.string().required().max(20),
      anhDaiDien: Joi.object(),
      ngaySinh: Joi.date().required(),
      gioiTinh: Joi.boolean().required(),
      soCMND: Joi.string().required().max(11),
      soDienThoai: Joi.string().required().max(11),
      hoTenNguoiThan: Joi.string().required().max(50),
      diaChi: Joi.string().required().max(80),
      loaiKhachThueID: Joi.ObjectId(),
      tinhTrangKhachThue: Joi.string().required(),
      email: Joi.string().email()
    },
    options: {
      allowUnknown: true
    }
  },
  search: {
    params: {
      isReal: Joi.boolean()
    },
    payload: {
      hoKhachThue: Joi.string(),
      tenKhachThue: Joi.string(),
      ngaySinh: Joi.date(),
      gioiTinh: Joi.boolean(),
      soCMND: Joi.string(),
      soDienThoai: Joi.string(),
      hoTenNguoiThan: Joi.string(),
      diaChi: Joi.string(),
      loaiKhachThueID: Joi.ObjectId(),
      tinhTrangKhachThue: Joi.string(),
      email: Joi.string()
    }
  },
  get: {
    params: {
      id: Joi.ObjectId()
    }
  },
  delete: {
    params: {
      id: Joi.ObjectId()
    }
  },
  getByDT: {
    params: {
      sdt: Joi.string().required()
    }
  }
};
exports.default = { ...khachThueVal
};

/***/ }),

/***/ "./app/modules/khuphong/controller/index.js":
/*!**************************************************!*\
  !*** ./app/modules/khuphong/controller/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const Boom = __webpack_require__(/*! boom */ "boom");

const KhuPhong = Mongoose.model('KhuPhong');

exports.getAll = async (request, h) => {
  try {
    return await KhuPhong.find().populate([{
      path: 'dsPhong',
      populate: ['dsPhieuThu']
    }]).lean();
  } catch (err) {
    return Boom.forbidden(err);
  }
};

exports.getById = async (request, h) => {
  try {
    return (await KhuPhong.findById({
      _id: request.params.id
    })) || Boom.notFound();
  } catch (err) {
    return Boom.forbidden(err);
  }
};

exports.create = async (request, h) => {
  try {
    return await KhuPhong.create(request.payload);
  } catch (err) {
    return Boom.forbidden(err);
  }
};

exports.update = async (request, h) => {
  try {
    let {
      tenKhuPhong,
      anhKhuPhong,
      moTa
    } = request.payload;
    const item = await KhuPhong.findOneAndUpdate({
      _id: request.params.id
    }, {
      tenKhuPhong,
      anhKhuPhong,
      moTa
    });
    return item || Boom.notFound();
  } catch (err) {
    return Boom.forbidden(err);
  }
};

exports.delete = async (request, h) => {
  try {
    return (await KhuPhong.findOneAndRemove({
      _id: request.params.id
    })) || Boom.notFound();
  } catch (err) {
    return Boom.forbidden(err);
  }
};

/***/ }),

/***/ "./app/modules/khuphong/index.js":
/*!***************************************!*\
  !*** ./app/modules/khuphong/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./routes/index.js */ "./app/modules/khuphong/routes/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = (server, options) => {
  server.route(_index2.default);
};

exports.name = 'admin-khuphong';

/***/ }),

/***/ "./app/modules/khuphong/routes/index.js":
/*!**********************************************!*\
  !*** ./app/modules/khuphong/routes/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../controller/index */ "./app/modules/khuphong/controller/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../validate/index */ "./app/modules/khuphong/validate/index.js");

var _index4 = _interopRequireDefault(_index3);

var _https = __webpack_require__(/*! https */ "https");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'GET',
  path: '/khuphong',
  handler: _index2.default.getAll,
  config: {
    description: 'danh sach khu phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/khuphong/{id}',
  handler: _index2.default.getById,
  config: {
    validate: _index4.default.get,
    description: 'xem thong tin phong by id',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/khuphong',
  handler: _index2.default.create,
  config: {
    validate: _index4.default.create,
    description: 'tao moi khu phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'PUT',
  path: '/khuphong/{id}',
  handler: _index2.default.update,
  config: {
    validate: _index4.default.update,
    description: 'cap nhat khu phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'DELETE',
  path: '/khuphong/{id}',
  handler: _index2.default.delete,
  config: {
    validate: _index4.default.delete,
    description: 'xoa khu phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/khuphong/validate/index.js":
/*!************************************************!*\
  !*** ./app/modules/khuphong/validate/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const Joi = __webpack_require__(/*! joi */ "joi");

Joi.ObjectId = __webpack_require__(/*! joi-objectid */ "joi-objectid")(Joi);
const khuPhongVal = {
  create: {
    payload: {
      tenKhuPhong: Joi.string().required().max(20),
      anhKhuPhong: Joi.string(),
      moTa: Joi.string()
    }
  },
  update: {
    params: {
      id: Joi.ObjectId()
    },
    payload: {
      tenKhuPhong: Joi.string().required().max(20),
      anhKhuPhong: Joi.string(),
      moTa: Joi.string()
    }
  },
  delete: {
    params: {
      id: Joi.ObjectId()
    }
  },
  get: {
    params: {
      id: Joi.ObjectId()
    }
  }
};
exports.default = { ...khuPhongVal
};

/***/ }),

/***/ "./app/modules/loaikhacthue/controller/index.js":
/*!******************************************************!*\
  !*** ./app/modules/loaikhacthue/controller/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _boom = __webpack_require__(/*! boom */ "boom");

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LoaiKhachThue = _mongoose2.default.model('LoaiKhachThue');

const getAll = async (request, h) => {
  try {
    return (await LoaiKhachThue.find()) || _boom2.default.notFound();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const save = async (request, h) => {
  try {
    let data = request.payload;
    let item = {};

    if (!data._id) {
      item = new LoaiKhachThue(data);
    } else {
      item = await LoaiKhachThue.findById(data._id);
      item = Object.assign(item, data);
    }

    await item.save();
    return item;
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

exports.default = {
  getAll,
  save
};

/***/ }),

/***/ "./app/modules/loaikhacthue/index.js":
/*!*******************************************!*\
  !*** ./app/modules/loaikhacthue/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _routes = __webpack_require__(/*! ./routes */ "./app/modules/loaikhacthue/routes/index.js");

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = (server, options) => {
  server.route(_routes2.default);
};

exports.name = 'loai-khach-thue-admin';

/***/ }),

/***/ "./app/modules/loaikhacthue/routes/index.js":
/*!**************************************************!*\
  !*** ./app/modules/loaikhacthue/routes/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controller = __webpack_require__(/*! ../controller */ "./app/modules/loaikhacthue/controller/index.js");

var _controller2 = _interopRequireDefault(_controller);

var _validate = __webpack_require__(/*! ../validate */ "./app/modules/loaikhacthue/validate/index.js");

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'GET',
  path: '/loaikhachthue',
  handler: _controller2.default.getAll,
  config: {
    description: 'lay danh sach loai khach thue',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/loaikhachthue',
  handler: _controller2.default.save,
  config: {
    description: 'them va sua loai khach thue',
    tags: ['api'],
    validate: _validate2.default.save,
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/loaikhacthue/validate/index.js":
/*!****************************************************!*\
  !*** ./app/modules/loaikhacthue/validate/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(/*! joi */ "joi");

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_joi2.default.ObjectId = __webpack_require__(/*! joi-objectid */ "joi-objectid")(_joi2.default);
const loaiKhachThueVal = {
  get: {
    params: {
      id: _joi2.default.ObjectId()
    }
  },
  save: {
    payload: {
      _id: _joi2.default.string(),
      tenLoaiKhachThue: _joi2.default.string().required().max(30)
    }
  }
};
exports.default = { ...loaiKhachThueVal
};

/***/ }),

/***/ "./app/modules/loaiphong/controller/index.js":
/*!***************************************************!*\
  !*** ./app/modules/loaiphong/controller/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const Mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const LoaiPhong = Mongoose.model('LoaiPhong');

const Boom = __webpack_require__(/*! boom */ "boom");

const getAll = async (request, h) => {
  try {
    return await LoaiPhong.find();
  } catch (err) {
    return Boom.forbidden(err);
  }
};

const getById = async (request, h) => {
  try {
    return (await LoaiPhong.findById({
      _id: request.params.id
    })) || Boom.notFound();
  } catch (err) {
    return Boom.forbidden(err);
  }
};

const create = async (request, h) => {
  try {
    return await LoaiPhong.create(request.payload);
  } catch (err) {
    return Boom.forbidden(err);
  }
};

const update = async (request, h) => {
  try {
    let {
      tenLoaiPhong,
      giaPhong
    } = request.payload;
    const item = await LoaiPhong.findOneAndUpdate({
      _id: request.params.id
    }, {
      tenLoaiPhong,
      giaPhong
    });
    return item || Boom.notFound();
  } catch (err) {
    return Boom.forbidden(err);
  }
};

const deleteLoaiPhong = async (request, h) => {
  try {
    return (await LoaiPhong.findOneAndRemove({
      _id: request.params.id
    })) || Boom.notFound();
  } catch (err) {
    return Boom.forbidden(err);
  }
};

exports.default = {
  getAll,
  getById,
  create,
  update,
  deleteLoaiPhong
};

/***/ }),

/***/ "./app/modules/loaiphong/index.js":
/*!****************************************!*\
  !*** ./app/modules/loaiphong/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./routes/index */ "./app/modules/loaiphong/routes/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = (server, options) => {
  server.route(_index2.default);
};

exports.name = 'admin-loaiphong';

/***/ }),

/***/ "./app/modules/loaiphong/routes/index.js":
/*!***********************************************!*\
  !*** ./app/modules/loaiphong/routes/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../controller/index */ "./app/modules/loaiphong/controller/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../validate/index */ "./app/modules/loaiphong/validate/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'GET',
  path: '/loaiphong',
  handler: _index2.default.getAll,
  config: {
    description: 'xem danh sach loai phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/loaiphong/{id}',
  handler: _index2.default.getById,
  config: {
    validate: _index4.default.get,
    description: 'xem thong tin loai phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/loaiphong',
  handler: _index2.default.create,
  config: {
    validate: _index4.default.create,
    description: 'them loai phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'PUT',
  path: '/loaiphong/{id}',
  handler: _index2.default.update,
  config: {
    validate: _index4.default.update,
    description: 'cap nhat thong tin loai phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'DELETE',
  path: '/loaiphong/{id}',
  handler: _index2.default.deleteLoaiPhong,
  config: {
    validate: _index4.default.delete,
    description: 'xoa loai phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/loaiphong/validate/index.js":
/*!*************************************************!*\
  !*** ./app/modules/loaiphong/validate/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const Joi = __webpack_require__(/*! joi */ "joi");

Joi.ObjectId = __webpack_require__(/*! joi-objectid */ "joi-objectid")(Joi);
const LoaiPhongVal = {
  create: {
    payload: {
      tenLoaiPhong: Joi.string().required().max(30),
      giaPhong: Joi.number().required()
    }
  },
  update: {
    params: {
      id: Joi.ObjectId()
    },
    payload: {
      tenLoaiPhong: Joi.string().required().max(30),
      giaPhong: Joi.number().required()
    }
  },
  get: {
    params: {
      id: Joi.ObjectId()
    }
  },
  delete: {
    params: {
      id: Joi.ObjectId()
    }
  }
};
exports.default = { ...LoaiPhongVal
};

/***/ }),

/***/ "./app/modules/phieuthutien/controller/index.js":
/*!******************************************************!*\
  !*** ./app/modules/phieuthutien/controller/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _boom = __webpack_require__(/*! boom */ "boom");

var _boom2 = _interopRequireDefault(_boom);

var _moment = __webpack_require__(/*! moment */ "moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PhieuThuTien = _mongoose2.default.model('PhieuThuTien');

const Phong = _mongoose2.default.model('Phong');

const getAll = async (request, h) => {
  try {
    return await PhieuThuTien.find().populate('phongID');
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const save = async (request, h) => {
  try {
    let data = request.payload;
    let item = {};

    if (!data._id) {
      let phong = await Phong.findById({
        _id: data.phongID
      }).populate('khuPhongID');
      let soKhuPhong = phong.khuPhongID.tenKhuPhong.split(' ');
      let soPhong = phong.tenPhong.split(' ');
      let ngayLap = new Date(data.ngayLap);
      console.log(ngayLap);
      let getThangNam = (0, _moment2.default)(ngayLap).format('MMYYYY'); // ngày hết hạn là ngày 10 của tháng tiếp theo

      data.ngayHetHan = new Date(`${ngayLap.getFullYear()}-${ngayLap.getMonth() + 2}-11`); // mã phiểu thu gồm: PT + số phòng + số khu phòng + tháng và năm tạo

      data._id = `PTP${soPhong[1]}KV${soKhuPhong[2]}${getThangNam}`;
      data.tinhTrangPhieuThu = 'chưa đóng';
      phong.soDien = data.soDienMoi;
      phong.soNuoc = data.soNuocMoi;
      await phong.save();
      item = new PhieuThuTien(data);
    } else {
      item = await PhieuThuTien.findById({
        _id: data._id
      });
      item = Object.assign(item, data);
    }

    return await item.save();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

exports.default = {
  getAll,
  save
};

/***/ }),

/***/ "./app/modules/phieuthutien/index.js":
/*!*******************************************!*\
  !*** ./app/modules/phieuthutien/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./routes/index */ "./app/modules/phieuthutien/routes/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = (server, options) => {
  server.route(_index2.default);
};

exports.name = 'phieu-thu-tien-admin';

/***/ }),

/***/ "./app/modules/phieuthutien/routes/index.js":
/*!**************************************************!*\
  !*** ./app/modules/phieuthutien/routes/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../controller/index */ "./app/modules/phieuthutien/controller/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../validate/index */ "./app/modules/phieuthutien/validate/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'GET',
  path: '/phieuthutien',
  handler: _index2.default.getAll,
  config: {
    tags: ['api'],
    description: "lay danh sach phieu thu",
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/phieuthutien',
  handler: _index2.default.save,
  config: {
    tags: ['api'],
    description: 'them hoac sua phieu thu',
    validate: _index4.default.save,
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/phieuthutien/validate/index.js":
/*!****************************************************!*\
  !*** ./app/modules/phieuthutien/validate/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const Joi = __webpack_require__(/*! joi */ "joi");

Joi.ObjectId = __webpack_require__(/*! joi-objectid */ "joi-objectid")(Joi);
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
  }
};
exports.default = { ...phieuThuTienVal
};

/***/ }),

/***/ "./app/modules/phong/controller/index.js":
/*!***********************************************!*\
  !*** ./app/modules/phong/controller/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _boom = __webpack_require__(/*! boom */ "boom");

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Phong = _mongoose2.default.model('Phong');

const fs = __webpack_require__(/*! fs */ "fs");

const save = async (request, h) => {
  try {
    let data = request.payload;
    let phong = {};
    let item = {};
    let anhChinhName;
    let anhChiTietName;

    if (data._id) {
      if (data.anhChinh.name === null || data.anhChinh.name.length === 0 || data.anhChinh.name === undefined) {
        let entity = await Phong.findById({
          _id: data._id
        });
        anhChinhName = entity.anhChinh;
      } else {
        anhChinhName = data.anhChinh.name;
        let anhChinh64 = data.anhChinh.file64.replace(/^data(.*?)base64,/, "");
        fs.writeFile(`app/lib/images/${anhChinhName}`, anhChinh64, 'base64', function (err) {
          return err;
        });
      }

      if (data.anhChiTiet.name.length != 0) {
        anhChiTietName = data.anhChiTiet.name;
        let anhChiTiet64 = [];

        for (let item of data.anhChiTiet.file64) {
          let anh = item.replace(/^data(.*?)base64,/, "");
          anhChiTiet64.push(anh);
        }

        for (let i = 0; i < data.anhChiTiet.name.length; i++) {
          fs.writeFile(`app/lib/images/${data.anhChiTiet.name[i]}`, anhChiTiet64[i], 'base64', function (err) {
            return err;
          });
        }
      } else {
        let entity = await Phong.findById({
          _id: data._id
        });
        anhChiTietName = entity.anhChiTiet;
      }

      let payload = {
        tenPhong: data.tenPhong,
        anhChinh: anhChinhName,
        anhChiTiet: anhChiTietName,
        moTa: data.moTa,
        soDien: data.soDien,
        soNuoc: data.soNuoc,
        giaPhong: data.giaPhong,
        dKMang: data.dKMang,
        status: data.status,
        homeFlag: data.homeFlag,
        hotFlag: data.hotFlag,
        tinhTrangPhongID: data.tinhTrangPhongID,
        khuPhongID: data.khuPhongID,
        loaiPhongID: data.loaiPhongID
      };
      item = (await Phong.findOneAndUpdate({
        _id: data._id
      }, payload)) || _boom2.default.notFound();
      phong = await Phong.findById({
        _id: item._id
      }).populate('loaiPhongID').populate('khuPhongID');
    } else {
      anhChinhName = data.anhChinh.name;
      let anhChinh64 = data.anhChinh.file64.replace(/^data(.*?)base64,/, "");
      fs.writeFile(`app/lib/images/${anhChinhName}`, anhChinh64, 'base64', function (err) {
        return err;
      });
      anhChiTietName = data.anhChiTiet.name;
      let anhChiTiet64 = [];

      for (let item of data.anhChiTiet.file64) {
        let anh = item.replace(/^data(.*?)base64,/, "");
        anhChiTiet64.push(anh);
      }

      for (let i = 0; i < data.anhChiTiet.name.length; i++) {
        fs.writeFile(`app/lib/images/${data.anhChiTiet.name[i]}`, anhChiTiet64[i], 'base64', function (err) {
          return err;
        });
      }

      let payload = {
        tenPhong: data.tenPhong,
        anhChinh: anhChinhName,
        anhChiTiet: anhChiTietName,
        moTa: data.moTa,
        soDien: data.soDien,
        soNuoc: data.soNuoc,
        giaPhong: data.giaPhong,
        dKMang: data.dKMang,
        status: data.status,
        homeFlag: data.homeFlag,
        hotFlag: data.hotFlag,
        tinhTrangPhongID: data.tinhTrangPhongID,
        khuPhongID: data.khuPhongID,
        loaiPhongID: data.loaiPhongID
      };
      item = await Phong.create(payload);
      phong = await Phong.findById({
        _id: item._id
      }).populate('loaiPhongID').populate('khuPhongID');
    }

    return phong;
  } catch (err) {
    console.log(err);
    return _boom2.default.forbidden(err);
  }
};

const getAll = async (request, h) => {
  try {
    return await Phong.find().populate('loaiPhongID').populate('khuPhongID').populate('tinhTrangPhongID').populate('dsPhieuThu').lean();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const update = async (request, h) => {
  try {
    let anhChinh = request.payload.anhChinh;
    let anhChinhName = anhChinh.name;
    let anhChinh64 = anhChinh.file64.replace(/^data(.*?)base64,/, "");
    fs.writeFile(`app/lib/images/${anhChinhName}`, anhChinh64, 'base64', function (err) {
      return err;
    });
    let anhChiTiet = request.payload.anhChiTiet;
    let anhChiTiet64 = [];

    for (let item of anhChiTiet.file64) {
      let anh = item.replace(/^data(.*?)base64,/, "");
      anhChiTiet64.push(anh);
    }

    console.log(anhChiTiet.name);

    for (let i = 0; i < anhChiTiet.name.length; i++) {
      fs.writeFile(`app/lib/images/${anhChiTiet.name[i]}`, anhChiTiet64[i], 'base64', function (err) {
        return err;
      });
    }

    let payload = {
      tenPhong: request.payload.tenPhong,
      anhChinh: anhChinhName,
      anhChiTiet: anhChiTiet.name,
      moTa: request.payload.moTa,
      soDien: request.payload.soDien,
      soNuoc: request.payload.soNuoc,
      giaPhong: request.payload.giaPhong,
      dKMang: request.payload.dKMang,
      status: request.payload.status,
      homeFlag: request.payload.homeFlag,
      tinhTrangPhongID: request.payload.tinhTrangPhongID,
      khuPhongID: request.payload.khuPhongID,
      loaiPhongID: request.payload.loaiPhongID
    };
    let data = await Phong.findOneAndUpdate({
      _id: request.params.id
    }, payload);
    let phong = await Phong.findById({
      _id: data._id
    }).populate('loaiPhongID').populate('khuPhongID');
    return phong || _boom2.default.notFound();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const deletePhong = async (request, h) => {
  try {
    return (await Phong.findOneAndRemove({
      _id: request.params.id
    })) || _boom2.default.notFound();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const getById = async (request, h) => {
  try {
    return await Phong.findById({
      _id: request.params.id
    }).populate('loaiPhongID').populate('khuPhongID').populate('tinhTrangPhongID');
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const searchMultiple = async (request, h) => {
  try {
    let data = request.payload;

    if (request.params.isReal === true) {
      let items = await Phong.find(data).populate('loaiPhongID').populate('khuPhongID').populate('tinhTrangPhongID');
      return items;
    } else {
      let items = await Phong.SearchMultiple(request.payload);
      return items;
    }
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

exports.default = {
  save,
  getById,
  getAll,
  update,
  deletePhong,
  searchMultiple
};

/***/ }),

/***/ "./app/modules/phong/index.js":
/*!************************************!*\
  !*** ./app/modules/phong/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./routes/index.js */ "./app/modules/phong/routes/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = (server, options) => {
  server.route(_index2.default);
};

exports.name = 'admin-phong';

/***/ }),

/***/ "./app/modules/phong/routes/index.js":
/*!*******************************************!*\
  !*** ./app/modules/phong/routes/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../controller/index.js */ "./app/modules/phong/controller/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../validate/index.js */ "./app/modules/phong/validate/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'GET',
  path: '/phong',
  handler: _index2.default.getAll,
  config: {
    description: 'lay danh sach phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/timkiemphong/timchinhxac={isReal}',
  handler: _index2.default.searchMultiple,
  config: {
    description: 'tim kiem nhieu tham so',
    validate: _index4.default.search,
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/phong/{id}',
  handler: _index2.default.getById,
  config: {
    validate: _index4.default.get,
    description: 'xem thong tin phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/phong',
  handler: _index2.default.save,
  config: {
    validate: _index4.default.create,
    description: 'vua them sua phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'PUT',
  path: '/phong/{id}',
  handler: _index2.default.update,
  config: {
    validate: _index4.default.update,
    description: 'cập nhật thông tin phòng',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'DELETE',
  path: '/phong/{id}',
  handler: _index2.default.deletePhong,
  config: {
    validate: _index4.default.delete,
    description: 'Xoa phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/phong/validate/index.js":
/*!*********************************************!*\
  !*** ./app/modules/phong/validate/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(/*! joi */ "joi");

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_joi2.default.ObjectId = __webpack_require__(/*! joi-objectid */ "joi-objectid")(_joi2.default);
const phongVal = {
  create: {
    payload: {
      _id: _joi2.default.string().length(24),
      tenPhong: _joi2.default.string().required().max(20).trim(),
      anhChinh: _joi2.default.object(),
      anhChiTiet: _joi2.default.object(),
      moTa: _joi2.default.string(),
      soDien: _joi2.default.number().required(),
      soNuoc: _joi2.default.number().required(),
      giaPhong: _joi2.default.number().required(),
      dKMang: _joi2.default.boolean(),
      status: _joi2.default.boolean(),
      homeFlag: _joi2.default.boolean(),
      hotFlag: _joi2.default.boolean(),
      tinhTrangPhongID: _joi2.default.ObjectId(),
      khuPhongID: _joi2.default.ObjectId(),
      loaiPhongID: _joi2.default.ObjectId()
    },
    options: {
      allowUnknown: true
    }
  },
  search: {
    params: {
      isReal: _joi2.default.boolean()
    },
    payload: {
      tenPhong: _joi2.default.string(),
      moTa: _joi2.default.string(),
      soDien: _joi2.default.number(),
      soNuoc: _joi2.default.number(),
      giaPhong: _joi2.default.number(),
      dKMang: _joi2.default.boolean(),
      status: _joi2.default.boolean(),
      homeFlag: _joi2.default.boolean(),
      hotFlag: _joi2.default.boolean(),
      tinhTrangPhongID: _joi2.default.ObjectId(),
      khuPhongID: _joi2.default.ObjectId(),
      loaiPhongID: _joi2.default.ObjectId()
    }
  },
  update: {
    params: {
      id: _joi2.default.ObjectId()
    },
    payload: {
      tenPhong: _joi2.default.string().required().max(20).trim(),
      anhChinh: _joi2.default.object(),
      anhChiTiet: _joi2.default.object(),
      moTa: _joi2.default.string(),
      soDien: _joi2.default.number().required(),
      soNuoc: _joi2.default.number().required(),
      giaPhong: _joi2.default.number().required(),
      dKMang: _joi2.default.boolean(),
      status: _joi2.default.boolean(),
      homeFlag: _joi2.default.boolean(),
      hotFlag: _joi2.default.boolean(),
      tinhTrangPhongID: _joi2.default.ObjectId(),
      khuPhongID: _joi2.default.ObjectId(),
      loaiPhongID: _joi2.default.ObjectId()
    }
  },
  delete: {
    params: {
      id: _joi2.default.ObjectId()
    }
  },
  get: {
    params: {
      id: _joi2.default.ObjectId()
    }
  }
};
exports.default = { ...phongVal
};

/***/ }),

/***/ "./app/modules/tinhtrangphong/controller/index.js":
/*!********************************************************!*\
  !*** ./app/modules/tinhtrangphong/controller/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _boom = __webpack_require__(/*! boom */ "boom");

var _boom2 = _interopRequireDefault(_boom);

var _https = __webpack_require__(/*! https */ "https");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TinhTrangPhong = _mongoose2.default.model('TinhTrangPhong');

const getAll = async (request, h) => {
  try {
    return await TinhTrangPhong.find();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const getById = async (request, h) => {
  try {
    return (await TinhTrangPhong.findById({
      _id: request.params.id
    })) || _boom2.default.notFound();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const create = async (request, h) => {
  try {
    return await TinhTrangPhong.create(request.payload);
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const update = async (request, h) => {
  try {
    let {
      tenTinhTrangPhong
    } = request.payload;
    const item = await TinhTrangPhong.findOneAndUpdate({
      _id: request.params.id
    }, {
      tenTinhTrangPhong
    });
    return item || _boom2.default.notFound();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const deleteTinhTrangPhong = async (request, h) => {
  try {
    return (await TinhTrangPhong.findOneAndRemove({
      _id: request.params.id
    })) || _boom2.default.notFound();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

exports.default = {
  getAll,
  getById,
  create,
  update,
  deleteTinhTrangPhong
};

/***/ }),

/***/ "./app/modules/tinhtrangphong/index.js":
/*!*********************************************!*\
  !*** ./app/modules/tinhtrangphong/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./routes/index */ "./app/modules/tinhtrangphong/routes/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = async (server, options) => {
  server.route(_index2.default);
};

exports.name = 'admin-tinhtrangphong';

/***/ }),

/***/ "./app/modules/tinhtrangphong/routes/index.js":
/*!****************************************************!*\
  !*** ./app/modules/tinhtrangphong/routes/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../controller/index */ "./app/modules/tinhtrangphong/controller/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../validate/index */ "./app/modules/tinhtrangphong/validate/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'GET',
  path: '/tinhtrangphong',
  handler: _index2.default.getAll,
  config: {
    description: 'xem danh sach tinh trang phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/tinhtrangphong/{id}',
  handler: _index2.default.getById,
  config: {
    validate: _index4.default.get,
    description: 'xem thong tin tinh trang phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/tinhtrangphong',
  handler: _index2.default.create,
  config: {
    validate: _index4.default.create,
    description: 'tao moi tinh trang phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'PUT',
  path: '/tinhtrangphong/{id}',
  handler: _index2.default.update,
  config: {
    validate: _index4.default.update,
    description: 'cap nhat thong tin tinh trang phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'DELETE',
  path: '/tinhtrangphong/{id}',
  handler: _index2.default.deleteTinhTrangPhong,
  config: {
    validate: _index4.default.delete,
    description: 'xoa tinh trang phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/tinhtrangphong/validate/index.js":
/*!******************************************************!*\
  !*** ./app/modules/tinhtrangphong/validate/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(/*! joi */ "joi");

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_joi2.default.ObjectId = __webpack_require__(/*! joi-objectid */ "joi-objectid")(_joi2.default);
const tinhTrangPhongVal = {
  create: {
    payload: {
      tenTinhTrangPhong: _joi2.default.string().required().max(20)
    }
  },
  get: {
    params: {
      id: _joi2.default.ObjectId()
    }
  },
  update: {
    params: {
      id: _joi2.default.ObjectId()
    },
    payload: {
      tenTinhTrangPhong: _joi2.default.string().required().max(20)
    }
  },
  delete: {
    params: {
      id: _joi2.default.ObjectId()
    }
  }
};
exports.default = { ...tinhTrangPhongVal
};

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, description, main, scripts, author, license, dependencies, devDependencies, default */
/***/ (function(module) {

module.exports = {"name":"quanlyphongtro","version":"1.0.0","description":"Đồ án tốt nghiệp ","main":"app.js","scripts":{"start":"npm run build:server:once && npm-run-all --parallel nodemon:prod watch:server","build:server:once":"cross-env NODE_ENV=development webpack --config webpack.config.js","watch:server":"cross-env NODE_ENV=development webpack --inline --progress --config webpack.config.js --watch","nodemon:prod":"cross-env NODE_ENV=development nodemon --inspect build.js"},"author":"Nguyễn Văn Toàn","license":"ISC","dependencies":{"bcrypt":"^3.0.4","bluebird":"^3.5.3","boom":"^7.3.0","config":"^3.0.1","hapi":"^17.5.3","hapi-auth-jwt2":"^8.3.0","hapi-cors":"^1.0.3","hapi-swagger":"^9.3.1","inert":"^5.1.2","joi":"^14.3.1","joi-objectid":"^2.0.0","jsonwebtoken":"^8.5.0","lodash":"^4.17.11","moment":"^2.24.0","mongoose":"^5.4.17","mongoose-paginate":"^5.0.3","nodemailer":"^5.1.1","redis":"^2.8.0","vision":"^5.4.4","xoauth2":"^1.2.0"},"devDependencies":{"@babel/core":"^7.3.4","babel-loader":"^8.0.5","babel-preset-env":"^1.7.0","cross-env":"^5.2.0","npm-run-all":"^4.1.5","webpack":"^4.29.6","webpack-cli":"^3.2.3","nodemon":"^1.18.10","webpack-node-externals":"^1.7.2"}};

/***/ }),

/***/ 0:
/*!**********************!*\
  !*** multi ./app.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! F:\DoAnTotNghiep\DoAnTotNghiep_Toan\api\app.js */"./app.js");


/***/ }),

/***/ "bluebird":
/*!***************************!*\
  !*** external "bluebird" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),

/***/ "boom":
/*!***********************!*\
  !*** external "boom" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("boom");

/***/ }),

/***/ "config":
/*!*************************!*\
  !*** external "config" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("config");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "hapi":
/*!***********************!*\
  !*** external "hapi" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("hapi");

/***/ }),

/***/ "hapi-auth-jwt2":
/*!*********************************!*\
  !*** external "hapi-auth-jwt2" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("hapi-auth-jwt2");

/***/ }),

/***/ "hapi-cors":
/*!****************************!*\
  !*** external "hapi-cors" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("hapi-cors");

/***/ }),

/***/ "hapi-swagger":
/*!*******************************!*\
  !*** external "hapi-swagger" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("hapi-swagger");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),

/***/ "inert":
/*!************************!*\
  !*** external "inert" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("inert");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),

/***/ "joi-objectid":
/*!*******************************!*\
  !*** external "joi-objectid" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("joi-objectid");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "mongoose-paginate":
/*!************************************!*\
  !*** external "mongoose-paginate" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose-paginate");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("nodemailer");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "redis":
/*!************************!*\
  !*** external "redis" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redis");

/***/ }),

/***/ "vision":
/*!*************************!*\
  !*** external "vision" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("vision");

/***/ })

/******/ });