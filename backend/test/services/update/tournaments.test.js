const chai = require('chai')
const sinon = require('sinon')

var expect = chai.expect
chai.use(require('sinon-chai'))

import { Model } from 'objection'
import { getUpdateableTournaments } from 'services/update/tournaments'
import { testSeasons, expectedTournament } from './testData'

describe('Update service: tournaments', () => {
  describe('getUpdateableTournaments', async () => {
    let queryStub, findByIdStub

    beforeEach(() => {
      queryStub = sinon.stub(Model, 'query')
      findByIdStub = sinon.stub()

      queryStub.returns({
        findById: findByIdStub
      })
      findByIdStub.returns(Promise.resolve(null))
    })

    it('returns tournaments', async () => {
      const tournaments = await getUpdateableTournaments(testSeasons, 1)

      expect(tournaments).eql([expectedTournament])
      
      expect(findByIdStub).to.have.been.calledOnce
      expect(findByIdStub).to.have.been.calledWith(1)
    })

    it('returns empty if tournament found', async () => {
      findByIdStub.returns(Promise.resolve(expectedTournament))

      const tournaments = await getUpdateableTournaments(testSeasons, 1)

      expect(tournaments).to.be.empty
      expect(queryStub).to.have.been.calledOnce
    })

    it('returns empty on no acceptable tournament name found (and forced)', async () => {
      findByIdStub.returns(Promise.resolve(expectedTournament))

      const tournaments = await getUpdateableTournaments(testSeasons.filter(s => s.id === 4), 1, { force: true })

      expect(tournaments).to.be.empty
      
      expect(queryStub).to.have.been.calledOnce
    })

    it('returns empty on empty or null tournament data', async () => {
      expect(await getUpdateableTournaments(null, 1)).to.be.empty
      expect(await getUpdateableTournaments([], 1)).to.be.empty
    })

    afterEach(() => {
      Model.query.restore()
    })
  })
})
