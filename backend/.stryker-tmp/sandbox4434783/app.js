"use strict";

var cov_odrzpl4o = function () {
  var path = "/home/local/pyykkomi/liiga/backend/app.js";
  var hash = "0e145c0e1a711a1e084e563efeae11742ae9e79f";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/local/pyykkomi/liiga/backend/app.js",
    statementMap: {
      "0": {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 35
        }
      },
      "1": {
        start: {
          line: 2,
          column: 0
        },
        end: {
          line: 4,
          column: 2
        }
      },
      "2": {
        start: {
          line: 5,
          column: 0
        },
        end: {
          line: 5,
          column: 26
        }
      },
      "3": {
        start: {
          line: 7,
          column: 0
        },
        end: {
          line: 7,
          column: 39
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0
    },
    f: {},
    b: {},
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "0e145c0e1a711a1e084e563efeae11742ae9e79f"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  return coverage[path] = coverageData;
}();

cov_odrzpl4o.s[0]++;

require('app-module-path/register');

cov_odrzpl4o.s[1]++;

require('@babel/register')({
  presets: ['@babel/preset-env']
});

cov_odrzpl4o.s[2]++;

require('@babel/polyfill');

cov_odrzpl4o.s[3]++;
module.exports = require('./server.js');