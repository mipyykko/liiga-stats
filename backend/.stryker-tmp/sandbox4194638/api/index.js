"use strict";

var cov_1fysf6vwbf = function () {
  var path = "/home/local/pyykkomi/liiga/backend/api/index.js";
  var hash = "26f00b449b1858f5bc5ee5800f2129c6c6296dc0";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/local/pyykkomi/liiga/backend/api/index.js",
    statementMap: {},
    fnMap: {},
    branchMap: {},
    s: {},
    f: {},
    b: {},
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "26f00b449b1858f5bc5ee5800f2129c6c6296dc0"
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

var _fake_api = _interopRequireDefault(require("./fake_api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _fake_api["default"];
exports["default"] = _default;