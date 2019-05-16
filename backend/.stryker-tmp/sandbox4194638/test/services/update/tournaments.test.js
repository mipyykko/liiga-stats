"use strict";

var _objection = require("objection");

var _tournaments = require("services/update/tournaments");

var _testData = require("./testData");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var chai = require('chai');

var sinon = require('sinon');

var expect = chai.expect;
chai.use(require('sinon-chai'));
describe('Update service: tournaments', function () {
  describe('getUpdateableTournaments',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5() {
    var queryStub, findByIdStub;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            beforeEach(function () {
              queryStub = sinon.stub(_objection.Model, 'query');
              findByIdStub = sinon.stub();
              queryStub.returns({
                findById: findByIdStub
              });
              findByIdStub.returns(Promise.resolve(null));
            });
            it('returns tournaments',
            /*#__PURE__*/
            _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee() {
              var tournaments;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return (0, _tournaments.getUpdateableTournaments)(_testData.testSeasons, 1);

                    case 2:
                      tournaments = _context.sent;
                      expect(tournaments).eql([_testData.expectedTournament]);
                      expect(findByIdStub).to.have.been.calledOnce;
                      expect(findByIdStub).to.have.been.calledWith(1);

                    case 6:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            })));
            it('returns empty if tournament found',
            /*#__PURE__*/
            _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee2() {
              var tournaments;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      findByIdStub.returns(Promise.resolve(_testData.expectedTournament));
                      _context2.next = 3;
                      return (0, _tournaments.getUpdateableTournaments)(_testData.testSeasons, 1);

                    case 3:
                      tournaments = _context2.sent;
                      expect(tournaments).to.be.empty;
                      expect(queryStub).to.have.been.calledOnce;

                    case 6:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            })));
            it('returns empty on no acceptable tournament name found (and forced)',
            /*#__PURE__*/
            _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee3() {
              var tournaments;
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      findByIdStub.returns(Promise.resolve(_testData.expectedTournament));
                      _context3.next = 3;
                      return (0, _tournaments.getUpdateableTournaments)(_testData.testSeasons.filter(function (s) {
                        return s.id === 4;
                      }), 1, {
                        force: true
                      });

                    case 3:
                      tournaments = _context3.sent;
                      expect(tournaments).to.be.empty;
                      expect(queryStub).to.have.been.calledOnce;

                    case 6:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3);
            })));
            it('returns empty on empty or null tournament data',
            /*#__PURE__*/
            _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee4() {
              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.t0 = expect;
                      _context4.next = 3;
                      return (0, _tournaments.getUpdateableTournaments)(null, 1);

                    case 3:
                      _context4.t1 = _context4.sent;
                      (0, _context4.t0)(_context4.t1).to.be.empty;
                      _context4.t2 = expect;
                      _context4.next = 8;
                      return (0, _tournaments.getUpdateableTournaments)([], 1);

                    case 8:
                      _context4.t3 = _context4.sent;
                      (0, _context4.t2)(_context4.t3).to.be.empty;

                    case 10:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4);
            })));
            afterEach(function () {
              _objection.Model.query.restore();
            });

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
});