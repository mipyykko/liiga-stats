"use strict";

var cov_pkukoykko = function () {
  var path = "/home/local/pyykkomi/liiga/backend/stryker.conf.js";
  var hash = "a8143e7a31f726f459093d490c5f18a5acfb25b7";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/local/pyykkomi/liiga/backend/stryker.conf.js",
    statementMap: {
      "0": {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 21,
          column: 1
        }
      },
      "1": {
        start: {
          line: 2,
          column: 2
        },
        end: {
          line: 20,
          column: 4
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 1,
            column: 17
          },
          end: {
            line: 1,
            column: 18
          }
        },
        loc: {
          start: {
            line: 1,
            column: 34
          },
          end: {
            line: 21,
            column: 1
          }
        },
        line: 1
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0
    },
    f: {
      "0": 0
    },
    b: {},
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "a8143e7a31f726f459093d490c5f18a5acfb25b7"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  return coverage[path] = coverageData;
}();

cov_pkukoykko.s[0]++;

module.exports = function (config) {
  cov_pkukoykko.f[0]++;
  cov_pkukoykko.s[1]++;
  config.set({
    mutator: 'javascript',
    mutate: ['services/**/*.js'],
    packageManager: 'npm',
    reporters: ['html', 'clear-text', 'progress'],
    testRunner: 'mocha',
    transpilers: ['babel'],
    testFramework: 'mocha',
    coverageAnalysis: 'off',
    babel: {
      optionsFile: '.babelrc'
    },
    mochaOptions: {
      spec: ['test/**/*.test.js'],
      require: ['@babel/register', '@babel/polyfill']
    }
  });
};