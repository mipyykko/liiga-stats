"use strict";

var cov_us65v534y = function () {
  var path = "/home/local/pyykkomi/liiga/backend/config/index.js";
  var hash = "87dd3ecf8d3dacc756a075565c02e9b4b5c19e17";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/local/pyykkomi/liiga/backend/config/index.js",
    statementMap: {
      "0": {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 26
        }
      },
      "1": {
        start: {
          line: 6,
          column: 21
        },
        end: {
          line: 6,
          column: 58
        }
      }
    },
    fnMap: {},
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 9,
            column: 8
          },
          end: {
            line: 9,
            column: 32
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 9,
            column: 8
          },
          end: {
            line: 9,
            column: 24
          }
        }, {
          start: {
            line: 9,
            column: 28
          },
          end: {
            line: 9,
            column: 32
          }
        }],
        line: 9
      },
      "1": {
        loc: {
          start: {
            line: 10,
            column: 13
          },
          end: {
            line: 12,
            column: 77
          }
        },
        type: "cond-expr",
        locations: [{
          start: {
            line: 11,
            column: 6
          },
          end: {
            line: 11,
            column: 27
          }
        }, {
          start: {
            line: 12,
            column: 7
          },
          end: {
            line: 12,
            column: 76
          }
        }],
        line: 10
      },
      "2": {
        loc: {
          start: {
            line: 12,
            column: 7
          },
          end: {
            line: 12,
            column: 76
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 12,
            column: 7
          },
          end: {
            line: 12,
            column: 33
          }
        }, {
          start: {
            line: 12,
            column: 38
          },
          end: {
            line: 12,
            column: 76
          }
        }],
        line: 12
      },
      "3": {
        loc: {
          start: {
            line: 19,
            column: 21
          },
          end: {
            line: 21,
            column: 40
          }
        },
        type: "cond-expr",
        locations: [{
          start: {
            line: 20,
            column: 6
          },
          end: {
            line: 20,
            column: 35
          }
        }, {
          start: {
            line: 21,
            column: 6
          },
          end: {
            line: 21,
            column: 40
          }
        }],
        line: 19
      }
    },
    s: {
      "0": 0,
      "1": 0
    },
    f: {},
    b: {
      "0": [0, 0],
      "1": [0, 0],
      "2": [0, 0],
      "3": [0, 0]
    },
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "87dd3ecf8d3dacc756a075565c02e9b4b5c19e17"
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
cov_us65v534y.s[0]++;

require('dotenv').config();
/* if (process.env.NODE_ENV !== 'production') {
} */


var isProduction = (cov_us65v534y.s[1]++, process.env.NODE_ENV === 'production');
var _default = {
  PORT: (cov_us65v534y.b[0][0]++, process.env.PORT) || (cov_us65v534y.b[0][1]++, 3001),
  MONGO_URI: isProduction ? (cov_us65v534y.b[1][0]++, process.env.MONGO_URI) : (cov_us65v534y.b[1][1]++, (cov_us65v534y.b[2][0]++, process.env.TEST_MONGO_URI) || (cov_us65v534y.b[2][1]++, 'mongodb://127.0.0.1:27017/liiga_test')),
  EXTERNAL_API_URI: process.env.EXTERNAL_API_URI,
  LOCAL_DATA_DIRECTORY: process.env.LOCAL_DATA_DIRECTORY,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DATABASE: isProduction ? (cov_us65v534y.b[3][0]++, process.env.POSTGRES_DATABASE) : (cov_us65v534y.b[3][1]++, process.env.POSTGRES_TEST_DATABASE)
};
exports["default"] = _default;