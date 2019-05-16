"use strict";

var cov_dewing8zk = function () {
  var path = "/home/local/pyykkomi/liiga/backend/models/matchPlayerStatistic.js";
  var hash = "ae549e7f57823642bb302284e2a4d701c2e70caa";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/local/pyykkomi/liiga/backend/models/matchPlayerStatistic.js",
    statementMap: {
      "0": {
        start: {
          line: 6,
          column: 4
        },
        end: {
          line: 6,
          column: 36
        }
      },
      "1": {
        start: {
          line: 10,
          column: 4
        },
        end: {
          line: 10,
          column: 36
        }
      },
      "2": {
        start: {
          line: 14,
          column: 4
        },
        end: {
          line: 46,
          column: 5
        }
      },
      "3": {
        start: {
          line: 55,
          column: 4
        },
        end: {
          line: 80,
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
            line: 47,
            column: 3
          }
        },
        line: 13
      },
      "3": {
        name: "(anonymous_3)",
        decl: {
          start: {
            line: 49,
            column: 2
          },
          end: {
            line: 49,
            column: 3
          }
        },
        loc: {
          start: {
            line: 49,
            column: 32
          },
          end: {
            line: 81,
            column: 3
          }
        },
        line: 49
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
    hash: "ae549e7f57823642bb302284e2a4d701c2e70caa"
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
exports.MatchPlayerStatistic = void 0;

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

var MatchPlayerStatistic =
/*#__PURE__*/
function (_Model) {
  _inherits(MatchPlayerStatistic, _Model);

  function MatchPlayerStatistic() {
    _classCallCheck(this, MatchPlayerStatistic);

    return _possibleConstructorReturn(this, _getPrototypeOf(MatchPlayerStatistic).apply(this, arguments));
  }

  _createClass(MatchPlayerStatistic, null, [{
    key: "tableName",
    get: function get() {
      cov_dewing8zk.f[0]++;
      cov_dewing8zk.s[0]++;
      return 'match_player_statistics';
    }
  }, {
    key: "idColumn",
    get: function get() {
      cov_dewing8zk.f[1]++;
      cov_dewing8zk.s[1]++;
      return ['player_id', 'match_id']; // 'team_id'
    }
  }, {
    key: "jsonSchema",
    get: function get() {
      cov_dewing8zk.f[2]++;
      cov_dewing8zk.s[2]++;
      return {
        type: 'object',
        properties: {
          player_id: {
            type: 'integer'
          },
          match_id: {
            type: 'integer'
          },
          team_id: {
            type: 'integer'
          },
          number: {
            type: ['integer', 'null']
          },
          position_id: {
            type: ['integer', 'null']
          },
          starting: {
            type: 'boolean'
          },
          replaced_player_id: {
            type: ['integer', 'null']
          },
          replacement_player_id: {
            type: ['integer', 'null']
          },
          isi: {
            type: ['integer', 'null']
          },
          cw: {
            type: ['integer', 'null']
          },
          t: {
            type: ['integer', 'null']
          },
          fop: {
            type: ['integer', 'null']
          },
          pap: {
            type: ['number', 'null']
          },
          g: {
            type: ['integer', 'null']
          },
          a: {
            type: ['integer', 'null']
          },
          spdm: {
            type: ['number', 'null']
          },
          mof: {
            type: ['integer', 'null']
          },
          s: {
            type: ['integer', 'null']
          },
          c: {
            type: ['integer', 'null']
          },
          spda: {
            type: ['number', 'null']
          },
          offs: {
            type: ['integer', 'null']
          },
          d: {
            type: ['integer', 'null']
          },
          f: {
            type: ['integer', 'null']
          },
          lb: {
            type: ['integer', 'null']
          },
          st: {
            type: ['integer', 'null']
          },
          cwp: {
            type: ['number', 'null']
          },
          pa: {
            type: ['integer', 'null']
          }
        }
      };
    }
  }, {
    key: "relationMappings",
    get: function get() {
      cov_dewing8zk.f[3]++;
      cov_dewing8zk.s[3]++;

      /*     const Match = require('./match')
          const Player = require('./player')
          const Team = require('./team')
      
       */
      return {
        match: {
          relation: _db.Model.HasOneRelation,
          modelClass: _path["default"].join(__dirname, 'match'),
          join: {
            from: 'match_player_statistics.match_id',
            to: 'matches.id'
          }
        },
        player: {
          relation: _db.Model.HasOneRelation,
          modelClass: _path["default"].join(__dirname, 'player'),
          join: {
            from: 'match_player_statistics.player_id',
            to: 'players.id'
          }
        },
        team: {
          relation: _db.Model.HasOneRelation,
          modelClass: _path["default"].join(__dirname, 'team'),
          join: {
            from: 'match_player_statistics.team_id',
            to: 'teams.id'
          }
        }
      };
    }
  }]);

  return MatchPlayerStatistic;
}(_db.Model);

exports.MatchPlayerStatistic = MatchPlayerStatistic;