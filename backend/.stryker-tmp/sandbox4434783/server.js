"use strict";

var cov_beh9rl1t9 = function () {
  var path = "/home/local/pyykkomi/liiga/backend/server.js";
  var hash = "b3c927a5377133214ac1039bd15929f09f48cc2f";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/local/pyykkomi/liiga/backend/server.js",
    statementMap: {
      "0": {
        start: {
          line: 10,
          column: 12
        },
        end: {
          line: 10,
          column: 21
        }
      },
      "1": {
        start: {
          line: 12,
          column: 0
        },
        end: {
          line: 12,
          column: 26
        }
      },
      "2": {
        start: {
          line: 13,
          column: 0
        },
        end: {
          line: 13,
          column: 15
        }
      },
      "3": {
        start: {
          line: 14,
          column: 0
        },
        end: {
          line: 14,
          column: 27
        }
      },
      "4": {
        start: {
          line: 16,
          column: 16
        },
        end: {
          line: 16,
          column: 35
        }
      },
      "5": {
        start: {
          line: 22,
          column: 0
        },
        end: {
          line: 26,
          column: 2
        }
      },
      "6": {
        start: {
          line: 23,
          column: 2
        },
        end: {
          line: 23,
          column: 44
        }
      },
      "7": {
        start: {
          line: 24,
          column: 2
        },
        end: {
          line: 24,
          column: 20
        }
      },
      "8": {
        start: {
          line: 25,
          column: 2
        },
        end: {
          line: 25,
          column: 17
        }
      },
      "9": {
        start: {
          line: 28,
          column: 0
        },
        end: {
          line: 28,
          column: 23
        }
      },
      "10": {
        start: {
          line: 30,
          column: 0
        },
        end: {
          line: 32,
          column: 2
        }
      },
      "11": {
        start: {
          line: 31,
          column: 2
        },
        end: {
          line: 31,
          column: 49
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 22,
            column: 33
          },
          end: {
            line: 22,
            column: 34
          }
        },
        loc: {
          start: {
            line: 22,
            column: 47
          },
          end: {
            line: 26,
            column: 1
          }
        },
        line: 22
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 30,
            column: 24
          },
          end: {
            line: 30,
            column: 25
          }
        },
        loc: {
          start: {
            line: 30,
            column: 30
          },
          end: {
            line: 32,
            column: 1
          }
        },
        line: 30
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
      "8": 0,
      "9": 0,
      "10": 0,
      "11": 0
    },
    f: {
      "0": 0,
      "1": 0
    },
    b: {},
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "b3c927a5377133214ac1039bd15929f09f48cc2f"
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

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _index = _interopRequireDefault(require("config/index"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (cov_beh9rl1t9.s[0]++, (0, _express["default"])());
cov_beh9rl1t9.s[1]++;
app.use(_bodyParser["default"].json());
cov_beh9rl1t9.s[2]++;
app.use((0, _cors["default"])());
cov_beh9rl1t9.s[3]++;
app.use((0, _morgan["default"])('combined'));
var Promise = (cov_beh9rl1t9.s[4]++, require('bluebird')); // mongoose.Promise = Promise
// mongoose.connect(config.MONGO_URI, { useNewUrlParser: true })
// mongoose.set('debug', true)

cov_beh9rl1t9.s[5]++;
process.on('unhandledRejection', function (error, p) {
  cov_beh9rl1t9.f[0]++;
  cov_beh9rl1t9.s[6]++;
  console.log('=== UNHANDLED REJECTION ===');
  cov_beh9rl1t9.s[7]++;
  console.dir(error);
  cov_beh9rl1t9.s[8]++;
  process.exit(1);
});
cov_beh9rl1t9.s[9]++;
app.use('/api', _routes["default"]);
cov_beh9rl1t9.s[10]++;
app.listen(_index["default"].PORT, function () {
  cov_beh9rl1t9.f[1]++;
  cov_beh9rl1t9.s[11]++;
  console.log("listening on port ".concat(_index["default"].PORT));
});
var _default = app;
exports["default"] = _default;