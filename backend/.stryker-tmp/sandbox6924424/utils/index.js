"use strict";

var cov_1hsf6xrfqb = function () {
  var path = "/home/local/pyykkomi/liiga/backend/utils/index.js";
  var hash = "715f74bdfbd720f53821bfad824ddf2ec65409bb";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/local/pyykkomi/liiga/backend/utils/index.js",
    statementMap: {
      "0": {
        start: {
          line: 1,
          column: 30
        },
        end: {
          line: 3,
          column: 57
        }
      },
      "1": {
        start: {
          line: 2,
          column: 2
        },
        end: {
          line: 3,
          column: 57
        }
      },
      "2": {
        start: {
          line: 3,
          column: 33
        },
        end: {
          line: 3,
          column: 56
        }
      },
      "3": {
        start: {
          line: 5,
          column: 32
        },
        end: {
          line: 5,
          column: 60
        }
      },
      "4": {
        start: {
          line: 5,
          column: 46
        },
        end: {
          line: 5,
          column: 60
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 1,
            column: 30
          },
          end: {
            line: 1,
            column: 31
          }
        },
        loc: {
          start: {
            line: 2,
            column: 2
          },
          end: {
            line: 3,
            column: 57
          }
        },
        line: 2
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 3,
            column: 26
          },
          end: {
            line: 3,
            column: 27
          }
        },
        loc: {
          start: {
            line: 3,
            column: 33
          },
          end: {
            line: 3,
            column: 56
          }
        },
        line: 3
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 5,
            column: 32
          },
          end: {
            line: 5,
            column: 33
          }
        },
        loc: {
          start: {
            line: 5,
            column: 46
          },
          end: {
            line: 5,
            column: 60
          }
        },
        line: 5
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 2,
            column: 2
          },
          end: {
            line: 3,
            column: 57
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 2,
            column: 2
          },
          end: {
            line: 2,
            column: 55
          }
        }, {
          start: {
            line: 3,
            column: 2
          },
          end: {
            line: 3,
            column: 57
          }
        }],
        line: 2
      }
    },
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0
    },
    f: {
      "0": 0,
      "1": 0,
      "2": 0
    },
    b: {
      "0": [0, 0]
    },
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "715f74bdfbd720f53821bfad824ddf2ec65409bb"
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
exports.convertTimeToSec = exports.shallowCompare = void 0;
cov_1hsf6xrfqb.s[0]++;

var shallowCompare = function shallowCompare(obj1, obj2) {
  cov_1hsf6xrfqb.f[0]++;
  cov_1hsf6xrfqb.s[1]++;
  return (cov_1hsf6xrfqb.b[0][0]++, Object.keys(obj1).length === Object.keys(obj2).length) && (cov_1hsf6xrfqb.b[0][1]++, Object.keys(obj1).every(function (key) {
    cov_1hsf6xrfqb.f[1]++;
    cov_1hsf6xrfqb.s[2]++;
    return obj1[key] === obj2[key];
  }));
};

exports.shallowCompare = shallowCompare;
cov_1hsf6xrfqb.s[3]++;

var convertTimeToSec = function convertTimeToSec(min, sec) {
  cov_1hsf6xrfqb.f[2]++;
  cov_1hsf6xrfqb.s[4]++;
  return min * 60 + sec;
};

exports.convertTimeToSec = convertTimeToSec;