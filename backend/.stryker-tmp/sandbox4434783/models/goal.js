"use strict";

var cov_20dggd6kng = function () {
  var path = "/home/local/pyykkomi/liiga/backend/models/goal.js";
  var hash = "c4cfd8a5c43c686030f3570b15b65e435a0d4ccf";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/local/pyykkomi/liiga/backend/models/goal.js",
    statementMap: {
      "0": {
        start: {
          line: 5,
          column: 4
        },
        end: {
          line: 5,
          column: 18
        }
      },
      "1": {
        start: {
          line: 9,
          column: 4
        },
        end: {
          line: 9,
          column: 61
        }
      },
      "2": {
        start: {
          line: 13,
          column: 4
        },
        end: {
          line: 33,
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
            line: 34,
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
    hash: "c4cfd8a5c43c686030f3570b15b65e435a0d4ccf"
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
exports.Goal = void 0;

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

var Goal =
/*#__PURE__*/
function (_Model) {
  _inherits(Goal, _Model);

  function Goal() {
    _classCallCheck(this, Goal);

    return _possibleConstructorReturn(this, _getPrototypeOf(Goal).apply(this, arguments));
  }

  _createClass(Goal, null, [{
    key: "tableName",
    get: function get() {
      cov_20dggd6kng.f[0]++;
      cov_20dggd6kng.s[0]++;
      return 'goals';
    }
  }, {
    key: "idColumn",
    get: function get() {
      cov_20dggd6kng.f[1]++;
      cov_20dggd6kng.s[1]++;
      return ['match_id', 'home_team_score', 'away_team_score'];
    }
  }, {
    key: "jsonSchema",
    get: function get() {
      cov_20dggd6kng.f[2]++;
      cov_20dggd6kng.s[2]++;
      return {
        type: 'object',
        properties: {
          scorer_id: {
            type: 'integer'
          },
          assistant_id: {
            type: ['integer', 'null']
          },
          match_id: {
            type: 'integer'
          },
          team_id: {
            type: 'integer'
          },
          opposing_team_id: {
            type: 'integer'
          },
          opposing_goalkeeper_id: {
            type: 'integer'
          },
          half: {
            type: 'integer'
          },
          second: {
            type: 'integer'
          },
          standard: {
            type: 'integer'
          },
          type: {
            type: 'integer'
          },
          side: {
            type: 'integer'
          },
          home_team_score: {
            type: 'integer'
          },
          away_team_score: {
            type: 'integer'
          },
          home_team_prev_score: {
            type: 'integer'
          },
          away_team_prev_score: {
            type: 'integer'
          }
        }
      };
    }
  }]);

  return Goal;
}(_db.Model);

exports.Goal = Goal;