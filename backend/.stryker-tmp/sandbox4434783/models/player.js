"use strict";

var cov_11zd048xj1 = function () {
  var path = "/home/local/pyykkomi/liiga/backend/models/player.js";
  var hash = "903af809d6af1145fde935449740af0465997636";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/local/pyykkomi/liiga/backend/models/player.js",
    statementMap: {
      "0": {
        start: {
          line: 5,
          column: 4
        },
        end: {
          line: 5,
          column: 20
        }
      },
      "1": {
        start: {
          line: 9,
          column: 4
        },
        end: {
          line: 20,
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
            column: 26
          },
          end: {
            line: 21,
            column: 3
          }
        },
        line: 8
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0
    },
    f: {
      "0": 0,
      "1": 0
    },
    b: {},
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "903af809d6af1145fde935449740af0465997636"
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
exports.Player = void 0;

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

var Player =
/*#__PURE__*/
function (_Model) {
  _inherits(Player, _Model);

  function Player() {
    _classCallCheck(this, Player);

    return _possibleConstructorReturn(this, _getPrototypeOf(Player).apply(this, arguments));
  }

  _createClass(Player, null, [{
    key: "tableName",
    get: function get() {
      cov_11zd048xj1.f[0]++;
      cov_11zd048xj1.s[0]++;
      return 'players';
    }
  }, {
    key: "jsonSchema",
    get: function get() {
      cov_11zd048xj1.f[1]++;
      cov_11zd048xj1.s[1]++;
      return {
        type: 'object',
        properties: {
          id: {
            type: 'integer'
          },
          name: {
            type: 'string'
          },
          surname: {
            type: 'string'
          },
          display_name: {
            type: 'string'
          },
          country: {
            type: 'string'
          },
          logo: {
            type: 'string'
          }
        }
      };
    }
  }]);

  return Player;
}(_db.Model);

exports.Player = Player;