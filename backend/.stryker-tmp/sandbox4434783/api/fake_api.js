"use strict";

var cov_15wdy0vvep = function () {
  var path = "/home/local/pyykkomi/liiga/backend/api/fake_api.js";
  var hash = "dfbf03784125f3ae9f3a06a106a084a10ced295e";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/local/pyykkomi/liiga/backend/api/fake_api.js",
    statementMap: {
      "0": {
        start: {
          line: 7,
          column: 4
        },
        end: {
          line: 11,
          column: 5
        }
      },
      "1": {
        start: {
          line: 8,
          column: 6
        },
        end: {
          line: 8,
          column: 95
        }
      },
      "2": {
        start: {
          line: 10,
          column: 6
        },
        end: {
          line: 10,
          column: 55
        }
      },
      "3": {
        start: {
          line: 15,
          column: 4
        },
        end: {
          line: 19,
          column: 5
        }
      },
      "4": {
        start: {
          line: 16,
          column: 6
        },
        end: {
          line: 16,
          column: 130
        }
      },
      "5": {
        start: {
          line: 18,
          column: 6
        },
        end: {
          line: 18,
          column: 64
        }
      },
      "6": {
        start: {
          line: 23,
          column: 4
        },
        end: {
          line: 27,
          column: 5
        }
      },
      "7": {
        start: {
          line: 24,
          column: 6
        },
        end: {
          line: 24,
          column: 113
        }
      },
      "8": {
        start: {
          line: 26,
          column: 6
        },
        end: {
          line: 26,
          column: 38
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 6,
            column: 2
          },
          end: {
            line: 6,
            column: 3
          }
        },
        loc: {
          start: {
            line: 6,
            column: 46
          },
          end: {
            line: 12,
            column: 3
          }
        },
        line: 6
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 14,
            column: 2
          },
          end: {
            line: 14,
            column: 3
          }
        },
        loc: {
          start: {
            line: 14,
            column: 55
          },
          end: {
            line: 20,
            column: 3
          }
        },
        line: 14
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 22,
            column: 2
          },
          end: {
            line: 22,
            column: 3
          }
        },
        loc: {
          start: {
            line: 22,
            column: 36
          },
          end: {
            line: 28,
            column: 3
          }
        },
        line: 22
      }
    },
    branchMap: {},
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
      "0": 0,
      "1": 0,
      "2": 0
    },
    b: {},
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "dfbf03784125f3ae9f3a06a106a084a10ced295e"
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

var _fs = _interopRequireDefault(require("fs"));

var _api = _interopRequireDefault(require("./api"));

var _config = _interopRequireDefault(require("config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FakeAPI =
/*#__PURE__*/
function (_API) {
  _inherits(FakeAPI, _API);

  function FakeAPI() {
    _classCallCheck(this, FakeAPI);

    return _possibleConstructorReturn(this, _getPrototypeOf(FakeAPI).apply(this, arguments));
  }

  _createClass(FakeAPI, null, [{
    key: "fetchTournamentSeasons",
    value: function fetchTournamentSeasons(tournamentid) {
      cov_15wdy0vvep.f[0]++;
      cov_15wdy0vvep.s[0]++;

      try {
        cov_15wdy0vvep.s[1]++;
        return JSON.parse(_fs["default"].readFileSync("".concat(_config["default"].LOCAL_DATA_DIRECTORY, "/").concat(tournamentid, ".json")));
      } catch (err) {
        cov_15wdy0vvep.s[2]++;
        return _get(_getPrototypeOf(FakeAPI), "fetchTournamentSeasons", this).call(this, tournamentid);
      }
    }
  }, {
    key: "fetchTournamentSeason",
    value: function fetchTournamentSeason(tournamentid, seasonid) {
      cov_15wdy0vvep.f[1]++;
      cov_15wdy0vvep.s[3]++;

      try {
        cov_15wdy0vvep.s[4]++;
        return JSON.parse(_fs["default"].readFileSync("".concat(_config["default"].LOCAL_DATA_DIRECTORY, "/").concat(tournamentid, "-").concat(seasonid, ".json"), {
          encoding: 'utf-8'
        }));
      } catch (err) {
        cov_15wdy0vvep.s[5]++;
        return _get(_getPrototypeOf(FakeAPI), "fetchTournamentSeason", this).call(this, tournamentid, seasonid);
      }
    }
  }, {
    key: "fetchMatch",
    value: function () {
      var _fetchMatch = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(matchid) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cov_15wdy0vvep.f[2]++;
                cov_15wdy0vvep.s[6]++;
                _context.prev = 2;
                cov_15wdy0vvep.s[7]++;
                return _context.abrupt("return", JSON.parse(_fs["default"].readFileSync("".concat(_config["default"].LOCAL_DATA_DIRECTORY, "/").concat(matchid, ".json"), {
                  encoding: 'utf-8'
                })));

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](2);
                cov_15wdy0vvep.s[8]++;
                return _context.abrupt("return", _get(_getPrototypeOf(FakeAPI), "fetchMatch", this).call(this, matchid));

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 7]]);
      }));

      function fetchMatch(_x) {
        return _fetchMatch.apply(this, arguments);
      }

      return fetchMatch;
    }()
  }]);

  return FakeAPI;
}(_api["default"]);

exports["default"] = FakeAPI;