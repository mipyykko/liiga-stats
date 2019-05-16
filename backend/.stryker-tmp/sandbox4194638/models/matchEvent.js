"use strict";

var cov_1junplr866 = function () {
  var path = "/home/local/pyykkomi/liiga/backend/models/matchEvent.js";
  var hash = "af1a99d81a047b7c249733eb9d345c17b0fedd35";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/local/pyykkomi/liiga/backend/models/matchEvent.js",
    statementMap: {
      "0": {
        start: {
          line: 5,
          column: 4
        },
        end: {
          line: 5,
          column: 25
        }
      },
      "1": {
        start: {
          line: 9,
          column: 4
        },
        end: {
          line: 9,
          column: 44
        }
      },
      "2": {
        start: {
          line: 13,
          column: 4
        },
        end: {
          line: 36,
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
            line: 37,
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
    hash: "af1a99d81a047b7c249733eb9d345c17b0fedd35"
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
exports.MatchEvent = void 0;

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

var MatchEvent =
/*#__PURE__*/
function (_Model) {
  _inherits(MatchEvent, _Model);

  function MatchEvent() {
    _classCallCheck(this, MatchEvent);

    return _possibleConstructorReturn(this, _getPrototypeOf(MatchEvent).apply(this, arguments));
  }

  _createClass(MatchEvent, null, [{
    key: "tableName",
    get: function get() {
      cov_1junplr866.f[0]++;
      cov_1junplr866.s[0]++;
      return 'match_events';
    }
  }, {
    key: "idColumn",
    get: function get() {
      cov_1junplr866.f[1]++;
      cov_1junplr866.s[1]++;
      return ['id', 'match_id', 'action_code'];
    }
  }, {
    key: "jsonSchema",
    get: function get() {
      cov_1junplr866.f[2]++;
      cov_1junplr866.s[2]++;
      return {
        type: 'object',
        properties: {
          id: {
            type: 'integer'
          },
          match_id: {
            type: 'integer'
          },
          team_id: {
            type: 'integer'
          },
          player_id: {
            type: 'integer'
          },
          opponent_player_id: {
            type: ['integer', 'null']
          },
          parent_event_id: {
            type: ['integer', 'null']
          },
          action_code: {
            type: 'integer'
          },
          standard: {
            type: 'integer'
          },
          type: {
            type: 'string'
          },
          title: {
            type: 'string'
          },
          half: {
            type: 'integer'
          },
          second: {
            type: 'integer'
          },
          pos_x: {
            type: ['number', 'null']
          },
          pos_y: {
            type: ['number', 'null']
          },
          pos_dest_x: {
            type: ['number', 'null']
          },
          pos_dest_y: {
            type: ['number', 'null']
          },
          offset_left: {
            type: ['number', 'null']
          },
          video_url: {
            type: 'string'
          }
        }
      };
    }
  }]);

  return MatchEvent;
}(_db.Model);

exports.MatchEvent = MatchEvent;