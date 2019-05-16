"use strict";

var cov_274y23mu12 = function () {
  var path = "/home/local/pyykkomi/liiga/backend/models/tournament.js";
  var hash = "aeb10a81ad0cbe6a047d6e6ddb1ec24d8b48c974";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/local/pyykkomi/liiga/backend/models/tournament.js",
    statementMap: {
      "0": {
        start: {
          line: 6,
          column: 4
        },
        end: {
          line: 6,
          column: 24
        }
      },
      "1": {
        start: {
          line: 10,
          column: 4
        },
        end: {
          line: 19,
          column: 5
        }
      },
      "2": {
        start: {
          line: 25,
          column: 4
        },
        end: {
          line: 34,
          column: 5
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 5,
            column: 2
          },
          end: {
            line: 5,
            column: 3
          }
        },
        loc: {
          start: {
            line: 5,
            column: 25
          },
          end: {
            line: 7,
            column: 3
          }
        },
        line: 5
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 9,
            column: 2
          },
          end: {
            line: 9,
            column: 3
          }
        },
        loc: {
          start: {
            line: 9,
            column: 26
          },
          end: {
            line: 20,
            column: 3
          }
        },
        line: 9
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 22,
            column: 2
          },
          end: {
            line: 22,
            column: 3
          }
        },
        loc: {
          start: {
            line: 22,
            column: 32
          },
          end: {
            line: 35,
            column: 3
          }
        },
        line: 22
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0
    },
    f: {
      "0": 0,
      "1": 0,
      "2": 0
    },
    b: {},
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "aeb10a81ad0cbe6a047d6e6ddb1ec24d8b48c974"
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
exports.Tournament = void 0;

var _db = require("db");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Tournament =
/*#__PURE__*/
function (_Model) {
  _inherits(Tournament, _Model);

  function Tournament() {
    _classCallCheck(this, Tournament);

    return _possibleConstructorReturn(this, _getPrototypeOf(Tournament).apply(this, arguments));
  }

  _createClass(Tournament, null, [{
    key: "tableName",
    get: function get() {
      cov_274y23mu12.f[0]++;
      cov_274y23mu12.s[0]++;
      return 'tournaments';
    }
  }, {
    key: "jsonSchema",
    get: function get() {
      cov_274y23mu12.f[1]++;
      cov_274y23mu12.s[1]++;
      return {
        type: 'object',
        properties: {
          id: {
            type: 'integer '
          },
          name: {
            type: 'string'
          },
          country: {
            type: 'string'
          },
          type: {
            type: 'integer'
          }
        }
      };
    }
  }, {
    key: "relationMappings",
    get: function get() {
      cov_274y23mu12.f[2]++;
      cov_274y23mu12.s[2]++;
      // const Season = require('./season')
      return {
        seasons: {
          relation: _db.Model.HasManyRelation,
          modelClass: _path["default"].join(__dirname, 'season'),
          join: {
            from: 'tournaments.id',
            to: 'seasons.tournament_id'
          }
        }
      };
    }
  }]);

  return Tournament;
}(_db.Model);

exports.Tournament = Tournament;