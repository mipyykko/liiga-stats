const chai = require('chai')
const sinon = require('sinon')

import API from 'api'
import { 
  getUniquePlayers, 
  getUniquePlayersWithStats, 
  filterEmptyNames,
  getUpdateablePlayers,
  getPlayerStatistics,
  getPlayerStatisticsForTeam,
  getUpdateablePlayersFromEvents
} from 'services/update/players'
import { 
  testMatches, 
  expectedUniquePlayers, 
  expectedPlayers, 
  expectedPlayerStatistics,
  detailedEvent,
  expectedDetailedPlayers
} from './testData'
import _ from 'lodash'
import { Model } from 'objection'

var expect = chai.expect
chai.use(require('sinon-chai'))


describe('Update service: players', () => {
  const oneMatchExpected = expectedUniquePlayers.filter(p => _.includes([1,2], p.team_id))

  describe('getUniquePlayers', () => {
    it('returns unique players from single match', () => {
      expect(getUniquePlayers(testMatches[1])).eql(oneMatchExpected)
    })

    it('returns unique players from multiple matches', () => {
      expect(getUniquePlayers(testMatches)).eql(expectedUniquePlayers)
    })
  })

  describe('getUniquePlayersWithStats', () => {
    it('returns unique players with stats', () => {
      expect(getUniquePlayersWithStats(testMatches[1])).eql(oneMatchExpected)
    })

    it('returns unique players with stats from multiple matches', () => {
      expect(getUniquePlayersWithStats(testMatches)).eql(expectedUniquePlayers)
    })
  })

  describe('filterEmptyNames', () => {
    it('filters empty names', () => {
      expect(filterEmptyNames(testMatches[1].players).find(p => p.display_name === '')).to.be.undefined
    })
  })

  describe('getUpdateablePlayers', () => {
    let queryStub

    beforeEach(() => {
      queryStub = sinon.stub(Model, 'query')
    })

    it('returns right players when none are stored in database', async () => {
      queryStub.returns({
        findByIds: () => Promise.resolve([])
      })

      const uniquePlayers = getUniquePlayers(testMatches)
      const updatedPlayers = await getUpdateablePlayers(uniquePlayers)

      expect(updatedPlayers).eql(expectedPlayers)

      expect(queryStub).to.have.been.calledOnce
    })

    it('returns right players when some are stored in database', async () => {
      queryStub.returns({
        findByIds: () => Promise.resolve([{ id: 1 }])
      })

      const uniquePlayers = getUniquePlayers(testMatches)
      const updatedPlayers = await getUpdateablePlayers(uniquePlayers)

      expect(updatedPlayers.find(p => p.id === 1)).to.be.undefined

      expect(queryStub).to.have.been.calledOnce
    })

    it('returns right players when some are stored in database and force option is used', async () => {
      queryStub.returns({
        findByIds: () => Promise.resolve([{ id: 1 }])
      })

      const uniquePlayers = getUniquePlayers(testMatches)
      const updatedPlayers = await getUpdateablePlayers(uniquePlayers, { force: true })

      expect(updatedPlayers).eql(expectedPlayers)

      expect(queryStub).to.have.been.calledOnce
    })

    afterEach(() => {
      Model.query.restore()
    })
  })

  describe('getPlayerStatistics', () => {
    it('returns the right statistics', () => {
      expect(getPlayerStatistics(testMatches[1])).to.deep.equal(expectedPlayerStatistics)
    })
  })

  describe('getPlayerStatisticsForTeam', () => {
    it('returns the right statistics for team', () => {
      expect(getPlayerStatisticsForTeam(testMatches[1], 1)).eql(expectedPlayerStatistics.filter(p => p.team_id === 1))
    })
  })

  describe('getUpdateablePlayersFromEvents', () => {
    it('returns updated players', async () => {
      const APIstub = sinon.stub(API, 'fetchDetailedEvent')
      APIstub.onCall(0).returns(Promise.resolve(null))
      APIstub.onCall(1).returns(Promise.resolve(detailedEvent))

      const updatedPlayersFromEvents = await getUpdateablePlayersFromEvents(expectedPlayers, testMatches)
      
      expect(updatedPlayersFromEvents).eql(expectedDetailedPlayers)

      expect(APIstub).to.have.been.calledTwice

      API.fetchDetailedEvent.restore()
    })
  })
})