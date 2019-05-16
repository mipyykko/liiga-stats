"use strict";

var cov_4em3a62qy = function () {
  var path = "/home/local/pyykkomi/liiga/backend/controllers/index.js";
  var hash = "d87e8c4d0c602b3ae6d66b9a782d1ef4c10d1625";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/local/pyykkomi/liiga/backend/controllers/index.js",
    statementMap: {},
    fnMap: {},
    branchMap: {},
    s: {},
    f: {},
    b: {},
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "d87e8c4d0c602b3ae6d66b9a782d1ef4c10d1625"
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
Object.defineProperty(exports, "matchController", {
  enumerable: true,
  get: function get() {
    return _matches["default"];
  }
});
Object.defineProperty(exports, "updateController", {
  enumerable: true,
  get: function get() {
    return _update["default"];
  }
});

var _matches = _interopRequireDefault(require("./matches"));

var _update = _interopRequireDefault(require("./update"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }