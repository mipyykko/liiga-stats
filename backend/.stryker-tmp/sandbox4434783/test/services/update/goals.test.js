"use strict";

var _goals = require("services/update/goals");

var _testData = require("./testData");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var chai = require('chai');

var expect = chai.expect;
describe('Update service: goals', function () {
  describe('getMatchGoals', function () {
    it('returns goals from a match', function () {
      var goals = (0, _goals.getMatchGoals)(_testData.testMatches[1]);
      expect(goals).eql(_testData.expectedGoals);
    });
    it('returns null on no goals or null match', function () {
      expect((0, _goals.getMatchGoals)(_testData.testMatches[0])).eql(null);
      expect((0, _goals.getMatchGoals)(_objectSpread({}, _testData.testMatches[0], {
        goals: []
      }))).eql(null);
      expect((0, _goals.getMatchGoals)({})).eql(null);
    });
  });
});