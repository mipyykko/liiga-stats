"use strict";

var cov_cy2zh6pg0 = function () {
  var path = "/home/local/pyykkomi/liiga/backend/utils/error.js";
  var hash = "0d1d64b8e499c29b46845207cf66057e568f57d9";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/local/pyykkomi/liiga/backend/utils/error.js",
    statementMap: {
      "0": {
        start: {
          line: 1,
          column: 19
        },
        end: {
          line: 8,
          column: 1
        }
      },
      "1": {
        start: {
          line: 2,
          column: 16
        },
        end: {
          line: 2,
          column: 34
        }
      },
      "2": {
        start: {
          line: 4,
          column: 2
        },
        end: {
          line: 4,
          column: 23
        }
      },
      "3": {
        start: {
          line: 5,
          column: 2
        },
        end: {
          line: 5,
          column: 19
        }
      },
      "4": {
        start: {
          line: 7,
          column: 2
        },
        end: {
          line: 7,
          column: 13
        }
      },
      "5": {
        start: {
          line: 10,
          column: 0
        },
        end: {
          line: 10,
          column: 31
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 1,
            column: 19
          },
          end: {
            line: 1,
            column: 20
          }
        },
        loc: {
          start: {
            line: 1,
            column: 46
          },
          end: {
            line: 8,
            column: 1
          }
        },
        line: 1
      }
    },
    branchMap: {},
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
    b: {},
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "0d1d64b8e499c29b46845207cf66057e568f57d9"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  return coverage[path] = coverageData;
}();

cov_cy2zh6pg0.s[0]++;

var throwError = function throwError(status, code, message) {
  cov_cy2zh6pg0.f[0]++;
  var error = (cov_cy2zh6pg0.s[1]++, new Error(message));
  cov_cy2zh6pg0.s[2]++;
  error.status = status;
  cov_cy2zh6pg0.s[3]++;
  error.code = code;
  cov_cy2zh6pg0.s[4]++;
  throw error;
};

cov_cy2zh6pg0.s[5]++;
module.exports = {
  throwError: throwError
};