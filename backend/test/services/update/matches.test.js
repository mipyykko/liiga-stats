const chai = require('chai')
const sinon = require('sinon')

var expect = chai.expect
chai.use(require('sinon-chai'))

import API from 'api'
import { Model } from 'objection'
import { getMatches, getUpdateableMatches, getForMatches } from 'services/update/matches'
import { testMatches, testSeasonMatches, expectedMatches } from './testData'

describe('Update service: matches', () => {
  const completeMatches = testMatches.filter(m => m.status === 5)

  describe('getMatches', () => {
    let APIstub, findByIdsStub, queryStub

    beforeEach(() => {
      queryStub = sinon.stub(Model, 'query')
      findByIdsStub = sinon.stub()
      queryStub.returns({
        findByIds: findByIdsStub
      })
      findByIdsStub.returns(Promise.resolve([]))

      APIstub = sinon.stub(API, 'fetchMatch')

      APIstub.withArgs(1).returns(Promise.resolve(completeMatches[0]))
      APIstub.withArgs(2).returns(Promise.resolve(completeMatches[1]))
    })

    it('fetches matches when none are found in database', async () => {
      const matches = await getMatches(testSeasonMatches)

      expect(findByIdsStub).to.have.been.calledOnce
      expect(findByIdsStub).to.have.been.calledWith([1,2])

      expect(APIstub).to.have.been.calledTwice

      expect(matches).eql(completeMatches)
    })

    it('fetches only matches not found in database', async () => {
      findByIdsStub.returns(Promise.resolve([expectedMatches[0]]))

      const matches = await getMatches(testSeasonMatches)

      expect(findByIdsStub).to.have.been.calledOnce

      expect(APIstub).to.have.been.calledOnce

      expect(matches).eql([completeMatches[1]])
    })

    it('fetches only matches with higher status than found in database', async () => {
      findByIdsStub.returns(Promise.resolve([ {...expectedMatches[0], status: 4 }]))

      const matches = await getMatches(testSeasonMatches)

      expect(findByIdsStub).to.have.been.calledOnce
      
      expect(APIstub).to.have.been.calledTwice

      expect(matches).eql(completeMatches)
    })

    it('fetches matches when forced', async () => {
      findByIdsStub.returns(Promise.resolve(expectedMatches))

      const matches = await getMatches(testSeasonMatches, { force: true })

      expect(matches).eql(completeMatches)
    })

    afterEach(() => {
      Model.query.restore()
      API.fetchMatch.restore()
    })
  })

  describe('getUpdateableMatches', () => {
    it('returns matches', async () => {
      const matches = await getUpdateableMatches(completeMatches, 1, 1)

      expect(matches).eql(expectedMatches)
    })
  })

  describe('getForMatches', () => {
    it('runs given function with right params and returns non-null', () => {
      const fn = sinon.spy((a, b, c) => a ? `${a}: ${a+b+c}` : null)

      const res = getForMatches([1,2, null], fn, 2, 3)

      expect(res).eql(['1: 6', '2: 7'])

      expect(fn.getCall(0)).to.have.been.calledWith(1, 2, 3)
      expect(fn.getCall(1)).to.have.been.calledWith(2, 2, 3)
      expect(fn.getCall(2)).to.have.been.calledWith(null, 2, 3)
    })
  })
})