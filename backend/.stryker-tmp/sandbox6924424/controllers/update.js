"use strict";

var cov_1tn6r81jce = function () {
  var path = "/home/local/pyykkomi/liiga/backend/controllers/update.js";
  var hash = "a2997150567675dd66104189630cc871950d4e55";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/local/pyykkomi/liiga/backend/controllers/update.js",
    statementMap: {
      "0": {
        start: {
          line: 3,
          column: 25
        },
        end: {
          line: 19,
          column: 1
        }
      },
      "1": {
        start: {
          line: 5,
          column: 39
        },
        end: {
          line: 5,
          column: 49
        }
      },
      "2": {
        start: {
          line: 6,
          column: 30
        },
        end: {
          line: 6,
          column: 39
        }
      },
      "3": {
        start: {
          line: 8,
          column: 4
        },
        end: {
          line: 17,
          column: 5
        }
      },
      "4": {
        start: {
          line: 9,
          column: 27
        },
        end: {
          line: 9,
          column: 94
        }
      },
      "5": {
        start: {
          line: 11,
          column: 6
        },
        end: {
          line: 11,
          column: 28
        }
      },
      "6": {
        start: {
          line: 13,
          column: 6
        },
        end: {
          line: 13,
          column: 12
        }
      },
      "7": {
        start: {
          line: 15,
          column: 6
        },
        end: {
          line: 15,
          column: 25
        }
      },
      "8": {
        start: {
          line: 16,
          column: 6
        },
        end: {
          line: 16,
          column: 15
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
            column: 42
          },
          end: {
            line: 18,
            column: 3
          }
        },
        line: 4
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 6,
            column: 12
          },
          end: {
            line: 6,
            column: 25
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 6,
            column: 20
          },
          end: {
            line: 6,
            column: 25
          }
        }],
        line: 6
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
      "0": [0]
    },
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "a2997150567675dd66104189630cc871950d4e55"
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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var updateController = (cov_1tn6r81jce.s[0]++, {
  postUpdateSeason: function () {
    var _postUpdateSeason = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res, next) {
      var _ref, tournamentid, seasonid, _ref2, _ref2$force, force, updateResult;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              cov_1tn6r81jce.f[0]++;
              _ref = (cov_1tn6r81jce.s[1]++, req.params), tournamentid = _ref.tournamentid, seasonid = _ref.seasonid;
              _ref2 = (cov_1tn6r81jce.s[2]++, req.query), _ref2$force = _ref2.force, force = _ref2$force === void 0 ? (cov_1tn6r81jce.b[0][0]++, false) : _ref2$force;
              cov_1tn6r81jce.s[3]++;
              _context.prev = 4;
              cov_1tn6r81jce.s[4]++;
              _context.next = 8;
              return _services.updateService.updateSeason(tournamentid, seasonid, {
                force: force
              });

            case 8:
              updateResult = _context.sent;
              cov_1tn6r81jce.s[5]++;
              res.json(updateResult);
              cov_1tn6r81jce.s[6]++;
              next();
              _context.next = 21;
              break;

            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](4);
              cov_1tn6r81jce.s[7]++;
              res.sendStatus(500);
              cov_1tn6r81jce.s[8]++;
              next(_context.t0);

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 15]]);
    }));

    function postUpdateSeason(_x, _x2, _x3) {
      return _postUpdateSeason.apply(this, arguments);
    }

    return postUpdateSeason;
  }()
});
var _default = updateController;
exports["default"] = _default;