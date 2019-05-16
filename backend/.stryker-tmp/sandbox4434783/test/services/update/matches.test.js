"use strict";

var _api = _interopRequireDefault(require("api"));

var _objection = require("objection");

var _matches = require("services/update/matches");

var _testData = require("./testData");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var chai = require('chai');

var sinon = require('sinon');

var expect = chai.expect;
chai.use(require('sinon-chai'));
describe('Update service: matches', function () {
  var completeMatches = _testData.testMatches.filter(function (m) {
    return m.status === 5;
  });

  describe('getMatches', function () {
    var APIstub, findByIdsStub, queryStub;
    beforeEach(function () {
      queryStub = sinon.stub(_objection.Model, 'query');
      findByIdsStub = sinon.stub();
      queryStub.returns({
        findByIds: findByIdsStub
      });
      findByIdsStub.returns(Promise.resolve([]));
      APIstub = sinon.stub(_api["default"], 'fetchMatch');
      APIstub.withArgs(1).returns(Promise.resolve(completeMatches[0]));
      APIstub.withArgs(2).returns(Promise.resolve(completeMatches[1]));
    });
    it('fetches matches when none are found in database',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var matches;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _matches.getMatches)(_testData.testSeasonMatches);

            case 2:
              matches = _context.sent;
              expect(findByIdsStub).to.have.been.calledOnce;
              expect(findByIdsStub).to.have.been.calledWith([1, 2]);
              expect(APIstub).to.have.been.calledTwice;
              expect(matches).eql(completeMatches);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('fetches only matches not found in database',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var matches;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              findByIdsStub.returns(Promise.resolve([_testData.expectedMatches[0]]));
              _context2.next = 3;
              return (0, _matches.getMatches)(_testData.testSeasonMatches);

            case 3:
              matches = _context2.sent;
              expect(findByIdsStub).to.have.been.calledOnce;
              expect(APIstub).to.have.been.calledOnce;
              expect(matches).eql([completeMatches[1]]);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('fetches only matches with higher status than found in database',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var matches;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              findByIdsStub.returns(Promise.resolve([_objectSpread({}, _testData.expectedMatches[0], {
                status: 4
              })]));
              _context3.next = 3;
              return (0, _matches.getMatches)(_testData.testSeasonMatches);

            case 3:
              matches = _context3.sent;
              expect(findByIdsStub).to.have.been.calledOnce;
              expect(APIstub).to.have.been.calledTwice;
              expect(matches).eql(completeMatches);

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('fetches matches when forced',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var matches;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              findByIdsStub.returns(Promise.resolve(_testData.expectedMatches));
              _context4.next = 3;
              return (0, _matches.getMatches)(_testData.testSeasonMatches, {
                force: true
              });

            case 3:
              matches = _context4.sent;
              expect(matches).eql(completeMatches);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    afterEach(function () {
      _objection.Model.query.restore();

      _api["default"].fetchMatch.restore();
    });
  });
  describe('getUpdateableMatches', function () {
    it('returns matches',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var matches;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return (0, _matches.getUpdateableMatches)(completeMatches, 1, 1);

            case 2:
              matches = _context5.sent;
              expect(matches).eql(_testData.expectedMatches);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
  });
  describe('getForMatches', function () {
    it('runs given function with right params and returns non-null', function () {
      var fn = sinon.spy(function (a, b, c) {
        return a ? "".concat(a, ": ").concat(a + b + c) : null;
      });
      var res = (0, _matches.getForMatches)([1, 2, null], fn, 2, 3);
      expect(res).eql(['1: 6', '2: 7']);
      expect(fn.getCall(0)).to.have.been.calledWith(1, 2, 3);
      expect(fn.getCall(1)).to.have.been.calledWith(2, 2, 3);
      expect(fn.getCall(2)).to.have.been.calledWith(null, 2, 3);
    });
  });
});