"use strict";

var cov_14evs8pimr = function () {
  var path = "/home/local/pyykkomi/liiga/backend/models/matchTeamStatistic.js";
  var hash = "319912eef875eb05e602b9e8167059b4c50b248e";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/local/pyykkomi/liiga/backend/models/matchTeamStatistic.js",
    statementMap: {
      "0": {
        start: {
          line: 5,
          column: 4
        },
        end: {
          line: 5,
          column: 34
        }
      },
      "1": {
        start: {
          line: 9,
          column: 4
        },
        end: {
          line: 9,
          column: 34
        }
      },
      "2": {
        start: {
          line: 13,
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
            line: 4,
            column: 2
          },
          end: {
            line: 4,
            column: 3
          }
        },
        loc: {
          start: {
            line: 4,
            column: 25
          },
          end: {
            line: 6,
            column: 3
          }
        },
        line: 4
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 8,
            column: 2
          },
          end: {
            line: 8,
            column: 3
          }
        },
        loc: {
          start: {
            line: 8,
            column: 24
          },
          end: {
            line: 10,
            column: 3
          }
        },
        line: 8
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 12,
            column: 2
          },
          end: {
            line: 12,
            column: 3
          }
        },
        loc: {
          start: {
            line: 12,
            column: 26
          },
          end: {
            line: 35,
            column: 3
          }
        },
        line: 12
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
    hash: "319912eef875eb05e602b9e8167059b4c50b248e"
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
exports.MatchTeamStatistic = void 0;

var _db = require("db");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MatchTeamStatistic =
/*#__PURE__*/
function (_Model) {
  _inherits(MatchTeamStatistic, _Model);

  function MatchTeamStatistic() {
    _classCallCheck(this, MatchTeamStatistic);

    return _possibleConstructorReturn(this, _getPrototypeOf(MatchTeamStatistic).apply(this, arguments));
  }

  _createClass(MatchTeamStatistic, null, [{
    key: "tableName",
    get: function get() {
      cov_14evs8pimr.f[0]++;
      cov_14evs8pimr.s[0]++;
      return 'match_team_statistics';
    }
  }, {
    key: "idColumn",
    get: function get() {
      cov_14evs8pimr.f[1]++;
      cov_14evs8pimr.s[1]++;
      return ['team_id', 'match_id'];
    }
  }, {
    key: "jsonSchema",
    get: function get() {
      cov_14evs8pimr.f[2]++;
      cov_14evs8pimr.s[2]++;
      return {
        type: 'object',
        properties: {
          team_id: {
            type: 'integer'
          },
          match_id: {
            type: 'integer'
          },
          status: {
            type: 'integer'
          },
          s: {
            type: ['integer', 'null']
          },
          st: {
            type: ['integer', 'null']
          },
          f: {
            type: ['integer', 'null']
          },
          pa: {
            type: ['integer', 'null']
          },
          pap: {
            type: ['number', 'null']
          },
          bpm: {
            type: ['number', 'null']
          },
          bpp: {
            type: ['number', 'null']
          },
          ck: {
            type: ['integer', 'null']
          },
          cw: {
            type: ['integer', 'null']
          },
          cwp: {
            type: ['integer', 'null']
          },
          offs: {
            type: ['integer', 'null']
          },
          yc: {
            type: ['integer', 'null']
          },
          rc: {
            type: ['integer', 'null']
          }
        }
      };
    }
  }]);

  return MatchTeamStatistic;
}(_db.Model);

exports.MatchTeamStatistic = MatchTeamStatistic;