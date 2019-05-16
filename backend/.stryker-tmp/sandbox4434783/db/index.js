"use strict";

var cov_18slaj82a0 = function () {
  var path = "/home/local/pyykkomi/liiga/backend/db/index.js";
  var hash = "0a6c41684860baadd77414d2afb257636d8b8279";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/local/pyykkomi/liiga/backend/db/index.js",
    statementMap: {
      "0": {
        start: {
          line: 5,
          column: 13
        },
        end: {
          line: 15,
          column: 2
        }
      },
      "1": {
        start: {
          line: 17,
          column: 0
        },
        end: {
          line: 17,
          column: 16
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      "0": 0,
      "1": 0
    },
    f: {},
    b: {},
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "0a6c41684860baadd77414d2afb257636d8b8279"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  return coverage[path] = coverageData;
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Model", {
  enumerable: true,
  get: function get() {
    return _objection.Model;
  }
});
exports.knex = void 0;

var _config = _interopRequireDefault(require("config"));

var _objection = require("objection");

var _knex = _interopRequireDefault(require("knex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var knex = (cov_18slaj82a0.s[0]++, (0, _knex["default"])({
  client: 'pg',
  connection: {
    host: _config["default"].POSTGRES_HOST,
    user: _config["default"].POSTGRES_USER,
    password: _config["default"].POSTGRES_PASSWORD,
    database: _config["default"].POSTGRES_DATABASE
  },
  pool: {
    min: 0,
    max: 100
  } //debug: true

}));
exports.knex = knex;
cov_18slaj82a0.s[1]++;

_objection.Model.knex(knex);