"use strict";

var _objection = require("objection");

var _teams = require("services/update/teams");

var _testData = require("./testData");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var chai = require('chai');

var sinon = require('sinon');

var expect = chai.expect;
chai.use(require('sinon-chai'));
describe('Update service: teams', function () {
  describe('getUniqueTeams', function () {
    it('returns unique teams', function () {
      expect((0, _teams.getUniqueTeams)([{
        team_id: 1
      }, {
        team_id: 1
      }, {
        team_id: 2
      }])).eql([{
        team_id: 1
      }, {
        team_id: 2
      }]);
    });
  });
  describe('getUniqueTeamsFromMatches', function () {
    it('returns unique teams', function () {
      expect((0, _teams.getUniqueTeamsFromMatches)(_testData.testMatches).map(function (t) {
        return t.team_id;
      })).eql([1, 2, 3]);
    });
  });
  describe('getTactics', function () {
    it('returns tactics', function () {
      expect((0, _teams.getTactics)(_testData.testMatches[1])).eql(_testData.expectedTactics);
    });
  });
  describe('getTeamTactics', function () {
    it('returns tactics for team', function () {
      expect((0, _teams.getTeamTactics)(_testData.testMatches[1], 1)).eql(_testData.expectedTactics.filter(function (t) {
        return t.team_id === 1;
      }));
    });
  });
  describe('getTeamInfo', function () {
    it('returns team info for each team', function () {
      ['first', 'second'].map(function (t) {
        return expect((0, _teams.getTeamInfo)(_testData.testMatches[1], t)).eql(_testData.expectedTeamInfos[t]);
      });
    });
  });
  describe('getTeamStatistics', function () {
    it('returns team statistics for each team', function () {
      ['first', 'second'].map(function (t) {
        return expect((0, _teams.getTeamStatistics)(_testData.testMatches[1], t)).eql(_testData.expectedTeamStatistics[t]);
      });
    });
  });
  describe('getUpdateableTeams', function () {
    var queryStub, findByIdsStub;
    beforeEach(function () {
      queryStub = sinon.stub(_objection.Model, 'query');
      findByIdsStub = sinon.stub();
      queryStub.returns({
        findByIds: findByIdsStub
      });
      findByIdsStub.returns(Promise.resolve(null));
    });
    it('returns updateable teams if not found in database',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var uniqueTeams, updateableTeams;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              uniqueTeams = (0, _teams.getUniqueTeamsFromMatches)(_testData.testMatches);
              _context.next = 3;
              return (0, _teams.getUpdateableTeams)(uniqueTeams);

            case 3:
              updateableTeams = _context.sent;
              expect(updateableTeams).eql(_testData.expectedTeams);
              expect(findByIdsStub).to.have.been.calledOnce;
              expect(findByIdsStub).to.have.been.calledWith([1, 2, 3]);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('returns updateable teams if some found in database',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var uniqueTeams, updateableTeams;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              findByIdsStub.returns(Promise.resolve([{
                team_id: 1
              }]));
              uniqueTeams = (0, _teams.getUniqueTeamsFromMatches)(_testData.testMatches);
              _context2.next = 4;
              return (0, _teams.getUpdateableTeams)(uniqueTeams);

            case 4:
              updateableTeams = _context2.sent;
              expect(updateableTeams).eql(_testData.expectedTeams.filter(function (t) {
                return t.team_id !== 1;
              }));

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('returns updateable teams if some found in database but forced',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var uniqueTeams, updateableTeams;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              findByIdsStub.returns(Promise.resolve([{
                team_id: 1
              }]));
              uniqueTeams = (0, _teams.getUniqueTeamsFromMatches)(_testData.testMatches);
              _context3.next = 4;
              return (0, _teams.getUpdateableTeams)(uniqueTeams, {
                force: true
              });

            case 4:
              updateableTeams = _context3.sent;
              expect(updateableTeams).eql(_testData.expectedTeams);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    afterEach(function () {
      _objection.Model.query.restore();
    });
  });
});