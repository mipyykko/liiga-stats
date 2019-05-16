"use strict";

var cov_1eyv9vgnei = function () {
  var path = "/home/local/pyykkomi/liiga/backend/models/matchTeamTactic.js";
  var hash = "b044d9851416e951b441ee5fa28465ee44a36a37";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/local/pyykkomi/liiga/backend/models/matchTeamTactic.js",
    statementMap: {
      "0": {
        start: {
          line: 6,
          column: 4
        },
        end: {
          line: 6,
          column: 31
        }
      },
      "1": {
        start: {
          line: 10,
          column: 4
        },
        end: {
          line: 10,
          column: 57
        }
      },
      "2": {
        start: {
          line: 14,
          column: 4
        },
        end: {
          line: 24,
          column: 5
        }
      },
      "3": {
        start: {
          line: 28,
          column: 4
        },
        end: {
          line: 37,
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
            line: 25,
            column: 3
          }
        },
        line: 13
      },
      "3": {
        name: "(anonymous_3)",
        decl: {
          start: {
            line: 27,
            column: 2
          },
          end: {
            line: 27,
            column: 3
          }
        },
        loc: {
          start: {
            line: 27,
            column: 32
          },
          end: {
            line: 38,
            column: 3
          }
        },
        line: 27
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
    hash: "b044d9851416e951b441ee5fa28465ee44a36a37"
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
exports.MatchTeamTactic = void 0;

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

var MatchTeamTactic =
/*#__PURE__*/
function (_Model) {
  _inherits(MatchTeamTactic, _Model);

  function MatchTeamTactic() {
    _classCallCheck(this, MatchTeamTactic);

    return _possibleConstructorReturn(this, _getPrototypeOf(MatchTeamTactic).apply(this, arguments));
  }

  _createClass(MatchTeamTactic, null, [{
    key: "tableName",
    get: function get() {
      cov_1eyv9vgnei.f[0]++;
      cov_1eyv9vgnei.s[0]++;
      return 'match_team_tactics';
    }
  }, {
    key: "idColumn",
    get: function get() {
      cov_1eyv9vgnei.f[1]++;
      cov_1eyv9vgnei.s[1]++;
      return ['team_id', 'match_id', 'player_id', 'second'];
    }
  }, {
    key: "jsonSchema",
    get: function get() {
      cov_1eyv9vgnei.f[2]++;
      cov_1eyv9vgnei.s[2]++;
      return {
        type: 'object',
        properties: {
          team_id: {
            type: 'integer'
          },
          match_id: {
            type: 'integer'
          },
          player_id: {
            type: 'integer'
          },
          position: {
            type: ['integer', 'null']
          },
          second: {
            type: 'integer'
          }
        }
      };
    }
  }, {
    key: "relationMappings",
    get: function get() {
      cov_1eyv9vgnei.f[3]++;
      cov_1eyv9vgnei.s[3]++;
      return {
        player: {
          relation: _db.Model.HasManyRelation,
          modelClass: _path["default"].join(__dirname, 'player'),
          join: {
            from: 'match_team_tactics.player_id',
            to: 'players.id'
          }
        }
      };
    }
  }]);

  return MatchTeamTactic;
}(_db.Model);

exports.MatchTeamTactic = MatchTeamTactic;