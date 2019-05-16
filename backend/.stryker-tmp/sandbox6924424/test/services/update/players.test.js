"use strict";

var _api = _interopRequireDefault(require("api"));

var _players = require("services/update/players");

var _testData = require("./testData");

var _lodash = _interopRequireDefault(require("lodash"));

var _objection = require("objection");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var chai = require('chai');

var sinon = require('sinon');

var expect = chai.expect;
chai.use(require('sinon-chai'));
describe('Update service: players', function () {
  var oneMatchExpected = _testData.expectedUniquePlayers.filter(function (p) {
    return _lodash["default"].includes([1, 2], p.team_id);
  });

  describe('getUniquePlayers', function () {
    it('returns unique players from single match', function () {
      expect((0, _players.getUniquePlayers)(_testData.testMatches[1])).eql(oneMatchExpected);
    });
    it('returns unique players from multiple matches', function () {
      expect((0, _players.getUniquePlayers)(_testData.testMatches)).eql(_testData.expectedUniquePlayers);
    });
  });
  describe('getUniquePlayersWithStats', function () {
    it('returns unique players with stats', function () {
      expect((0, _players.getUniquePlayersWithStats)(_testData.testMatches[1])).eql(oneMatchExpected);
    });
    it('returns unique players with stats from multiple matches', function () {
      expect((0, _players.getUniquePlayersWithStats)(_testData.testMatches)).eql(_testData.expectedUniquePlayers);
    });
  });
  describe('filterEmptyNames', function () {
    it('filters empty names', function () {
      expect((0, _players.filterEmptyNames)(_testData.testMatches[1].players).find(function (p) {
        return p.display_name === '';
      })).to.be.undefined;
    });
  });
  describe('getUpdateablePlayers', function () {
    var queryStub, findByIdsStub;
    beforeEach(function () {
      queryStub = sinon.stub(_objection.Model, 'query');
      findByIdsStub = sinon.stub();
      queryStub.returns({
        findByIds: findByIdsStub
      });
      findByIdsStub.returns(Promise.resolve([]));
    });
    it('returns right players when none are stored in database',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var uniquePlayers, updatedPlayers;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              uniquePlayers = (0, _players.getUniquePlayers)(_testData.testMatches);
              _context.next = 3;
              return (0, _players.getUpdateablePlayers)(uniquePlayers);

            case 3:
              updatedPlayers = _context.sent;
              expect(updatedPlayers).eql(_testData.expectedPlayers);
              expect(findByIdsStub).to.have.been.calledOnce;
              expect(findByIdsStub).to.have.been.calledWith(uniquePlayers.map(function (p) {
                return p.player_id;
              }));

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('returns right players when some are stored in database',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var uniquePlayers, updatedPlayers;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              findByIdsStub.returns(Promise.resolve([{
                id: 1
              }]));
              uniquePlayers = (0, _players.getUniquePlayers)(_testData.testMatches);
              _context2.next = 4;
              return (0, _players.getUpdateablePlayers)(uniquePlayers);

            case 4:
              updatedPlayers = _context2.sent;
              expect(updatedPlayers.find(function (p) {
                return p.id === 1;
              })).to.be.undefined;
              expect(findByIdsStub).to.have.been.calledOnce; // params same as before

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('returns right players when some are stored in database and force option is used',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var uniquePlayers, updatedPlayers;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              findByIdsStub.returns(Promise.resolve([{
                id: 1
              }]));
              uniquePlayers = (0, _players.getUniquePlayers)(_testData.testMatches);
              _context3.next = 4;
              return (0, _players.getUpdateablePlayers)(uniquePlayers, {
                force: true
              });

            case 4:
              updatedPlayers = _context3.sent;
              expect(updatedPlayers).eql(_testData.expectedPlayers);
              expect(findByIdsStub).to.have.been.calledOnce;

            case 7:
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
  describe('getPlayerStatistics', function () {
    it('returns the right statistics', function () {
      expect((0, _players.getPlayerStatistics)(_testData.testMatches[1])).to.deep.equal(_testData.expectedPlayerStatistics);
    });
  });
  describe('getPlayerStatisticsForTeam', function () {
    it('returns the right statistics for team', function () {
      expect((0, _players.getPlayerStatisticsForTeam)(_testData.testMatches[1], 1)).eql(_testData.expectedPlayerStatistics.filter(function (p) {
        return p.team_id === 1;
      }));
    });
  });
  describe('getUpdateablePlayersFromEvents', function () {
    it('returns updated players',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var APIstub, updatedPlayersFromEvents;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              APIstub = sinon.stub(_api["default"], 'fetchDetailedEvent');
              APIstub.onCall(0).returns(Promise.resolve(null));
              APIstub.onCall(1).returns(Promise.resolve(_testData.detailedEvent));
              _context4.next = 5;
              return (0, _players.getUpdateablePlayersFromEvents)(_testData.expectedPlayers, _testData.testMatches);

            case 5:
              updatedPlayersFromEvents = _context4.sent;
              expect(updatedPlayersFromEvents).eql(_testData.expectedDetailedPlayers);
              expect(APIstub).to.have.been.calledTwice;
              expect(APIstub.firstCall).to.have.been.calledWith(1, 1);
              expect(APIstub.secondCall).to.have.been.calledWith(1, 2);

              _api["default"].fetchDetailedEvent.restore();

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
  });
});