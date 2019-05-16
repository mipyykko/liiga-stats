"use strict";

var cov_8oofdw8va = function () {
  var path = "/home/local/pyykkomi/liiga/backend/models/season.js";
  var hash = "755c670e3de81c66120dc2dfb04fe6a5e818e42d";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/local/pyykkomi/liiga/backend/models/season.js",
    statementMap: {
      "0": {
        start: {
          line: 6,
          column: 4
        },
        end: {
          line: 6,
          column: 20
        }
      },
      "1": {
        start: {
          line: 10,
          column: 4
        },
        end: {
          line: 10,
          column: 34
        }
      },
      "2": {
        start: {
          line: 14,
          column: 4
        },
        end: {
          line: 25,
          column: 5
        }
      },
      "3": {
        start: {
          line: 31,
          column: 4
        },
        end: {
          line: 41,
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
            column: 24
          },
          end: {
            line: 11,
            column: 3
          }
        },
        line: 9
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 13,
            column: 2
          },
          end: {
            line: 13,
            column: 3
          }
        },
        loc: {
          start: {
            line: 13,
            column: 26
          },
          end: {
            line: 26,
            column: 3
          }
        },
        line: 13
      },
      "3": {
        name: "(anonymous_3)",
        decl: {
          start: {
            line: 28,
            column: 2
          },
          end: {
            line: 28,
            column: 3
          }
        },
        loc: {
          start: {
            line: 28,
            column: 32
          },
          end: {
            line: 42,
            column: 3
          }
        },
        line: 28
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0
    },
    f: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0
    },
    b: {},
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "755c670e3de81c66120dc2dfb04fe6a5e818e42d"
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
exports.Season = void 0;

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

var Season =
/*#__PURE__*/
function (_Model) {
  _inherits(Season, _Model);

  function Season() {
    _classCallCheck(this, Season);

    return _possibleConstructorReturn(this, _getPrototypeOf(Season).apply(this, arguments));
  }

  _createClass(Season, null, [{
    key: "tableName",
    get: function get() {
      cov_8oofdw8va.f[0]++;
      cov_8oofdw8va.s[0]++;
      return 'seasons';
    }
  }, {
    key: "idColumn",
    get: function get() {
      cov_8oofdw8va.f[1]++;
      cov_8oofdw8va.s[1]++;
      return ['id', 'tournament_id'];
    }
  }, {
    key: "jsonSchema",
    get: function get() {
      cov_8oofdw8va.f[2]++;
      cov_8oofdw8va.s[2]++;
      return {
        type: 'object',
        properties: {
          id: {
            type: 'integer'
          },
          tournament_id: {
            type: 'integer'
          },
          name: {
            type: 'string'
          },
          start_year: {
            type: 'integer'
          },
          end_year: {
            type: ['integer', 'null']
          },
          first_match_id: {
            type: 'integer'
          }
        }
      };
    }
  }, {
    key: "relationMappings",
    get: function get() {
      cov_8oofdw8va.f[3]++;
      cov_8oofdw8va.s[3]++;
      //const Tournament = require('./tournament')
      return {
        tournament: {
          relation: _db.Model.BelongsToOneRelation,
          modelClass: _path["default"].join(__dirname, 'tournament'),
          join: {
            from: 'seasons.tournament_id',
            to: 'tournaments.id'
          }
        } // firstmatch...

      };
    }
  }]);

  return Season;
}(_db.Model);

exports.Season = Season;