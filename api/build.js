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
  }, HapiAuth2, RouteImage]).then(async err => {
    if (err) {
      console.log(err);
    }
    /* Load models */


    __webpack_require__(/*! ../models/Phong/model */ "./app/models/Phong/model.js");

    __webpack_require__(/*! ../models/KhuPhong/model */ "./app/models/KhuPhong/model.js");

    __webpack_require__(/*! ../models/LoaiPhong/model */ "./app/models/LoaiPhong/model.js");

    __webpack_require__(/*! ../models/TinhTrangPhong/model */ "./app/models/TinhTrangPhong/model.js");
    /* Load Modules */


    let modules = [];
    modules.push(__webpack_require__(/*! ../modules/phong */ "./app/modules/phong/index.js"));
    modules.push(__webpack_require__(/*! ../modules/khuphong */ "./app/modules/khuphong/index.js"));
    modules.push(__webpack_require__(/*! ../modules/loaiphong */ "./app/modules/loaiphong/index.js"));
    modules.push(__webpack_require__(/*! ../modules/tinhtrangphong */ "./app/modules/tinhtrangphong/index.js"));

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
  timestamps: true
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PhongSchema = new _mongoose.Schema(_schema.schema, _schema.options);
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
  timestamps: true
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
    return await KhuPhong.find();
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

exports.register = async (server, options) => {
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

exports.register = async (server, options) => {
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

const create = async (request, h) => {
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
      fs.writeFile(`app/lib/images/${anhChiTiet.name[i]}`, anhChinh64[i], 'base64', function (err) {
        return err;
      });
    }

    console.log(request.payload); // return await Phong.create(request.payload)

    return true;
  } catch (err) {
    console.log(err);
    return _boom2.default.forbidden(err);
  }
};

const getAll = async (request, h) => {
  try {
    return await Phong.find().populate('LoaiPhong').populate('KhuPhong').populate('TinhTrangPhong');
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

exports.default = {
  create,
  getAll
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

exports.register = async (server, options) => {
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
  path: '/phong',
  handler: _index2.default.create,
  config: {
    validate: _index4.default.create,
    description: 'tao phong moi',
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
  update: {
    params: {
      id: _joi2.default.ObjectId()
    },
    payload: {
      tenPhong: _joi2.default.string().required().max(20).trim(),
      anhChinh: _joi2.default.string().required(),
      anhChiTiet: _joi2.default.array(),
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

module.exports = {"name":"quanlyphongtro","version":"1.0.0","description":"Đồ án tốt nghiệp ","main":"app.js","scripts":{"start":"npm run build:server:once && npm-run-all --parallel nodemon:prod watch:server","build:server:once":"cross-env NODE_ENV=development webpack --config webpack.config.js","watch:server":"cross-env NODE_ENV=development webpack --inline --progress --config webpack.config.js --watch","nodemon:prod":"cross-env NODE_ENV=development nodemon --inspect build.js"},"author":"Nguyễn Văn Toàn","license":"ISC","dependencies":{"bcrypt":"^3.0.4","bluebird":"^3.5.3","boom":"^7.3.0","config":"^3.0.1","hapi":"^17.5.3","hapi-auth-jwt2":"^8.3.0","hapi-swagger":"^9.3.1","inert":"^5.1.2","joi":"^14.3.1","joi-objectid":"^2.0.0","jsonwebtoken":"^8.5.0","lodash":"^4.17.11","mongoose":"^5.4.17","mongoose-paginate":"^5.0.3","redis":"^2.8.0","vision":"^5.4.4"},"devDependencies":{"@babel/core":"^7.3.4","babel-loader":"^8.0.5","babel-preset-env":"^1.7.0","cross-env":"^5.2.0","npm-run-all":"^4.1.5","webpack":"^4.29.6","webpack-cli":"^3.2.3","nodemon":"^1.18.10","webpack-node-externals":"^1.7.2"}};

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