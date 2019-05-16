"use strict";

var cov_2jmmp3nvj8 = function () {
  var path = "/home/local/pyykkomi/liiga/backend/routes.js";
  var hash = "9c3efe3b4257f4eeb76535407c9b96eff9110de5";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/local/pyykkomi/liiga/backend/routes.js",
    statementMap: {
      "0": {
        start: {
          line: 4,
          column: 15
        },
        end: {
          line: 4,
          column: 31
        }
      },
      "1": {
        start: {
          line: 6,
          column: 0
        },
        end: {
          line: 6,
          column: 81
        }
      },
      "2": {
        start: {
          line: 7,
          column: 0
        },
        end: {
          line: 7,
          column: 55
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0
    },
    f: {},
    b: {},
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "9c3efe3b4257f4eeb76535407c9b96eff9110de5"
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

var _controllers = require("controllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (cov_2jmmp3nvj8.s[0]++, _express["default"].Router());
cov_2jmmp3nvj8.s[1]++;
router.post('/update/:tournamentid/:seasonid', _controllers.updateController.postUpdateSeason);
cov_2jmmp3nvj8.s[2]++;
router.get('/match/:matchid', _controllers.matchController.getMatch);
var _default = router;
exports["default"] = _default;