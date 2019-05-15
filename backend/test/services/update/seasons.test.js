const chai = require('chai')
const sinon = require('sinon')

var expect = chai.expect
chai.use(require('sinon-chai'))

import API from 'api'
import { Model } from 'objection'
import { getUpdateableSeasons } from 'services/update/seasons'
import { testSeasons, expectedSeasons } from './testData'

describe('Update service: seasons', () => {
  describe('getUpdateableSeasons', () => {
    let queryStub, findByIdStub

    beforeEach(() => {
      queryStub = sinon.stub(Model, 'query')
      findByIdStub = sinon.stub()
      queryStub.returns({
        findById: findByIdStub
      })
      findByIdStub.returns(Promise.resolve(null))
    })

    it('returns updateable season when none are found in database', async () => {
      const seasons = await getUpdateableSeasons(testSeasons, 1, 1)

      expect(seasons).eql([expectedSeasons[1]])
    
      expect(findByIdStub).to.have.been.calledOnce
      expect(findByIdStub).to.have.been.calledWith([1,1])
    })

    it('returns empty when season is found in database', async () => {
      findByIdStub.returns(Promise.resolve(expectedSeasons[1]))

      const seasons = await getUpdateableSeasons(testSeasons, 1, 1)

      expect(seasons).to.be.empty

      expect(findByIdStub).to.have.been.calledOnce
    })

    it('returns updateable season (with different end_year) when found in database but forced', async () => {
      findByIdStub.returns(Promise.resolve(expectedSeasons[2]))

      const seasons = await getUpdateableSeasons(testSeasons, 2, 1, { force: true })

      expect(seasons).eql([expectedSeasons[2]])
    
      expect(queryStub).to.have.been.calledOnce
      expect(findByIdStub).to.have.been.calledWith([2, 1])
    })

    it('returns undefined on non-existent season', async () => {
      const seasons = await getUpdateableSeasons(testSeasons, 4, 1)

      expect(seasons).to.be.undefined

      expect(queryStub).to.have.not.been.called
    })

    it('returns empty on invalid season name', async () => {
      const seasons = await getUpdateableSeasons(testSeasons, 3, 1)

      expect(seasons).to.be.empty

      expect(findByIdStub).to.have.been.calledOnce
      expect(findByIdStub).to.have.been.calledWith([3,1])
    })

    afterEach(() => {
      Model.query.restore()
    })
  })
})