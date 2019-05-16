"use strict";

var _events = require("services/update/events");

var _testData = require("./testData");

var chai = require('chai');

var sinon = require('sinon');

var expect = chai.expect;
chai.use(require('sinon-chai'));
describe('Update service: events', function () {
  describe('getMatchEvents', function () {
    it('returns match events', function () {
      var events = (0, _events.getMatchEvents)(_testData.testMatches[1]);
      expect(events).eql(_testData.expectedEvents);
    });
    it('returns empty on null match', function () {
      return expect((0, _events.getMatchEvents)(null)).to.be.empty;
    });
  });
});