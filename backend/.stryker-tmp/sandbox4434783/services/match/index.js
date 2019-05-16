"use strict";

var cov_2djarhn8gj = function () {
  var path = "/home/local/pyykkomi/liiga/backend/services/match/index.js";
  var hash = "8ff9ee099b70572eed644790d0a66cb68e3f8bb3";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/local/pyykkomi/liiga/backend/services/match/index.js",
    statementMap: {
      "0": {
        start: {
          line: 5,
          column: 4
        },
        end: {
          line: 8,
          column: 25
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
            column: 35
          },
          end: {
            line: 9,
            column: 3
          }
        },
        line: 4
      }
    },
    branchMap: {},
    s: {
      "0": 0
    },
    f: {
      "0": 0
    },
    b: {},
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "8ff9ee099b70572eed644790d0a66cb68e3f8bb3"
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
exports["default"] = void 0;

var _models = require("models");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MatchService =
/*#__PURE__*/
function () {
  function MatchService() {
    _classCallCheck(this, MatchService);
  }

  _createClass(MatchService, null, [{
    key: "findMatch",
    value: function () {
      var _findMatch = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(match_id) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cov_2djarhn8gj.f[0]++;
                cov_2djarhn8gj.s[0]++;
                return _context.abrupt("return", _models.Match.query().eager('[tournament, season, home_team, away_team, home_statistics, away_statistics, home_team_info, away_team_info, home_team_tactics, away_team_tactics, home_players, away_players, goals]').findById(match_id));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function findMatch(_x) {
        return _findMatch.apply(this, arguments);
      }

      return findMatch;
    }()
  }]);

  return MatchService;
}();

exports["default"] = MatchService;