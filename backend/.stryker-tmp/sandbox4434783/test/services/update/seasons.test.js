"use strict";

var _objection = require("objection");

var _seasons = require("services/update/seasons");

var _testData = require("./testData");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var chai = require('chai');

var sinon = require('sinon');

var expect = chai.expect;
chai.use(require('sinon-chai'));
describe('Update service: seasons', function () {
  describe('getUpdateableSeasons', function () {
    var queryStub, findByIdStub;
    beforeEach(function () {
      queryStub = sinon.stub(_objection.Model, 'query');
      findByIdStub = sinon.stub();
      queryStub.returns({
        findById: findByIdStub
      });
      findByIdStub.returns(Promise.resolve(null));
    });
    it('returns updateable season when none are found in database',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var seasons;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _seasons.getUpdateableSeasons)(_testData.testSeasons, 1, 1);

            case 2:
              seasons = _context.sent;
              expect(seasons).eql([_testData.expectedSeasons[1]]);
              expect(findByIdStub).to.have.been.calledOnce;
              expect(findByIdStub).to.have.been.calledWith([1, 1]);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('returns empty when season is found in database',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var seasons;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              findByIdStub.returns(Promise.resolve(_testData.expectedSeasons[1]));
              _context2.next = 3;
              return (0, _seasons.getUpdateableSeasons)(_testData.testSeasons, 1, 1);

            case 3:
              seasons = _context2.sent;
              expect(seasons).to.be.empty;
              expect(findByIdStub).to.have.been.calledOnce;

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('returns updateable season (with different end_year) when found in database but forced',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var seasons;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              findByIdStub.returns(Promise.resolve(_testData.expectedSeasons[2]));
              _context3.next = 3;
              return (0, _seasons.getUpdateableSeasons)(_testData.testSeasons, 2, 1, {
                force: true
              });

            case 3:
              seasons = _context3.sent;
              expect(seasons).eql([_testData.expectedSeasons[2]]);
              expect(queryStub).to.have.been.calledOnce;
              expect(findByIdStub).to.have.been.calledWith([2, 1]);

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('returns undefined on non-existent season',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var seasons;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return (0, _seasons.getUpdateableSeasons)(_testData.testSeasons, 4, 1);

            case 2:
              seasons = _context4.sent;
              expect(seasons).to.be.undefined;
              expect(queryStub).to.have.not.been.called;

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('returns empty on invalid season name',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var seasons;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return (0, _seasons.getUpdateableSeasons)(_testData.testSeasons, 3, 1);

            case 2:
              seasons = _context5.sent;
              expect(seasons).to.be.empty;
              expect(findByIdStub).to.have.been.calledOnce;
              expect(findByIdStub).to.have.been.calledWith([3, 1]);

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    afterEach(function () {
      _objection.Model.query.restore();
    });
  });
});