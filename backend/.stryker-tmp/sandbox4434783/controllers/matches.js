"use strict";

var cov_1kn9gy1k11 = function () {
  var path = "/home/local/pyykkomi/liiga/backend/controllers/matches.js";
  var hash = "5678445f2fc62e32374b17414ceade9009ab7b1b";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/local/pyykkomi/liiga/backend/controllers/matches.js",
    statementMap: {
      "0": {
        start: {
          line: 4,
          column: 24
        },
        end: {
          line: 21,
          column: 1
        }
      },
      "1": {
        start: {
          line: 6,
          column: 24
        },
        end: {
          line: 6,
          column: 34
        }
      },
      "2": {
        start: {
          line: 8,
          column: 4
        },
        end: {
          line: 10,
          column: 5
        }
      },
      "3": {
        start: {
          line: 9,
          column: 6
        },
        end: {
          line: 9,
          column: 42
        }
      },
      "4": {
        start: {
          line: 12,
          column: 18
        },
        end: {
          line: 12,
          column: 55
        }
      },
      "5": {
        start: {
          line: 14,
          column: 4
        },
        end: {
          line: 16,
          column: 5
        }
      },
      "6": {
        start: {
          line: 15,
          column: 6
        },
        end: {
          line: 15,
          column: 58
        }
      },
      "7": {
        start: {
          line: 18,
          column: 4
        },
        end: {
          line: 18,
          column: 19
        }
      },
      "8": {
        start: {
          line: 19,
          column: 4
        },
        end: {
          line: 19,
          column: 10
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
            column: 33
          },
          end: {
            line: 20,
            column: 3
          }
        },
        line: 5
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 8,
            column: 4
          },
          end: {
            line: 10,
            column: 5
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 8,
            column: 4
          },
          end: {
            line: 10,
            column: 5
          }
        }, {
          start: {
            line: 8,
            column: 4
          },
          end: {
            line: 10,
            column: 5
          }
        }],
        line: 8
      },
      "1": {
        loc: {
          start: {
            line: 14,
            column: 4
          },
          end: {
            line: 16,
            column: 5
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 14,
            column: 4
          },
          end: {
            line: 16,
            column: 5
          }
        }, {
          start: {
            line: 14,
            column: 4
          },
          end: {
            line: 16,
            column: 5
          }
        }],
        line: 14
      }
    },
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0
    },
    f: {
      "0": 0
    },
    b: {
      "0": [0, 0],
      "1": [0, 0]
    },
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "5678445f2fc62e32374b17414ceade9009ab7b1b"
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

var _services = require("services");

var _error = require("utils/error");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var matchController = (cov_1kn9gy1k11.s[0]++, {
  getMatch: function () {
    var _getMatch = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res, next) {
      var _ref, matchid, match;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              cov_1kn9gy1k11.f[0]++;
              _ref = (cov_1kn9gy1k11.s[1]++, req.params), matchid = _ref.matchid;
              cov_1kn9gy1k11.s[2]++;

              if (!matchid) {
                cov_1kn9gy1k11.b[0][0]++;
                cov_1kn9gy1k11.s[3]++;
                (0, _error.throwError)(400, 'no match id given');
              } else {
                cov_1kn9gy1k11.b[0][1]++;
              }

              cov_1kn9gy1k11.s[4]++;
              _context.next = 7;
              return _services.matchService.findMatch(matchid);

            case 7:
              match = _context.sent;
              cov_1kn9gy1k11.s[5]++;

              if (!match) {
                cov_1kn9gy1k11.b[1][0]++;
                cov_1kn9gy1k11.s[6]++;
                (0, _error.throwError)(404, "no match with id ".concat(matchid, " found"));
              } else {
                cov_1kn9gy1k11.b[1][1]++;
              }

              cov_1kn9gy1k11.s[7]++;
              res.json(match);
              cov_1kn9gy1k11.s[8]++;
              next();

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getMatch(_x, _x2, _x3) {
      return _getMatch.apply(this, arguments);
    }

    return getMatch;
  }()
});
var _default = matchController;
exports["default"] = _default;