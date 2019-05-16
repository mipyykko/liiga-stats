"use strict";

var cov_2p3xffu4lf = function () {
  var path = "/home/local/pyykkomi/liiga/backend/models/index.js";
  var hash = "cd233009b1bf833d7a77e0b2683b07cf010103e9";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/local/pyykkomi/liiga/backend/models/index.js",
    statementMap: {
      "0": {
        start: {
          line: 4,
          column: 19
        },
        end: {
          line: 10,
          column: 6
        }
      },
      "1": {
        start: {
          line: 5,
          column: 2
        },
        end: {
          line: 5,
          column: 37
        }
      },
      "2": {
        start: {
          line: 5,
          column: 27
        },
        end: {
          line: 5,
          column: 37
        }
      },
      "3": {
        start: {
          line: 7,
          column: 19
        },
        end: {
          line: 7,
          column: 45
        }
      },
      "4": {
        start: {
          line: 9,
          column: 2
        },
        end: {
          line: 9,
          column: 41
        }
      },
      "5": {
        start: {
          line: 12,
          column: 0
        },
        end: {
          line: 12,
          column: 27
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 4,
            column: 52
          },
          end: {
            line: 4,
            column: 53
          }
        },
        loc: {
          start: {
            line: 4,
            column: 67
          },
          end: {
            line: 10,
            column: 1
          }
        },
        line: 4
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 5,
            column: 2
          },
          end: {
            line: 5,
            column: 37
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 5,
            column: 2
          },
          end: {
            line: 5,
            column: 37
          }
        }, {
          start: {
            line: 5,
            column: 2
          },
          end: {
            line: 5,
            column: 37
          }
        }],
        line: 5
      }
    },
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    },
    f: {
      "0": 0
    },
    b: {
      "0": [0, 0]
    },
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "cd233009b1bf833d7a77e0b2683b07cf010103e9"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  return coverage[path] = coverageData;
}();

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var exportable = (cov_2p3xffu4lf.s[0]++, _fs["default"].readdirSync(__dirname).reduce(function (arr, file) {
  cov_2p3xffu4lf.f[0]++;
  cov_2p3xffu4lf.s[1]++;

  if (file === 'index.js') {
    cov_2p3xffu4lf.b[0][0]++;
    cov_2p3xffu4lf.s[2]++;
    return arr;
  } else {
    cov_2p3xffu4lf.b[0][1]++;
  }

  var filename = (cov_2p3xffu4lf.s[3]++, _path["default"].join(__dirname, file));
  cov_2p3xffu4lf.s[4]++;
  return _objectSpread({}, arr, require(filename));
}, {}));
cov_2p3xffu4lf.s[5]++;
module.exports = exportable;