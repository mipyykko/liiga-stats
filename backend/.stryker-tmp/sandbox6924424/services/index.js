"use strict";

var cov_1w72hmkup2 = function () {
  var path = "/home/local/pyykkomi/liiga/backend/services/index.js";
  var hash = "3e9881363e50c3fa7f1d6477226ab02436bbf704";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/local/pyykkomi/liiga/backend/services/index.js",
    statementMap: {},
    fnMap: {},
    branchMap: {},
    s: {},
    f: {},
    b: {},
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "3e9881363e50c3fa7f1d6477226ab02436bbf704"
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
Object.defineProperty(exports, "updateService", {
  enumerable: true,
  get: function get() {
    return _update["default"];
  }
});
Object.defineProperty(exports, "matchService", {
  enumerable: true,
  get: function get() {
    return _match["default"];
  }
});

var _update = _interopRequireDefault(require("./update"));

var _match = _interopRequireDefault(require("./match"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }