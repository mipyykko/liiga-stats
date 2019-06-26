const chai = require('chai')
const sinon = require('sinon')

var expect = chai.expect
chai.use(require('sinon-chai'))

import API from 'api'
import { 
  getUniquePlayers, 
  getUniquePlayersWithStats, 
  filterEmptyNames,
  getUpdateablePlayers,
  getPlayerStatistics,
  getPlayerStatisticsForTeam,
  getUpdateablePlayersFromEvents,
  getStartingLineUp
} from 'services/update/players'
import { 
  testMatches, 
  expectedGoals,
  expectedUniquePlayers, 
  expectedPlayers, 
  expectedPlayerStatistics,
  detailedEvent,
  expectedDetailedPlayers,
  expectedPlayerSeasons
} from './testData'
import _ from 'lodash'
import { Model } from 'objection'
import { getUpdateablePlayerSeasons } from '../../../src/services/update/players';

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
    let queryStub, findByIdsStub

    beforeEach(() => {
      queryStub = sinon.stub(Model, 'query')
      findByIdsStub = sinon.stub()
      
      queryStub.returns({
        findByIds: findByIdsStub
      })
      findByIdsStub.returns(Promise.resolve([]))
    })

    it('returns right players when none are stored in database', async () => {
      const uniquePlayers = getUniquePlayers(testMatches)
      const updatedPlayers = await getUpdateablePlayers(uniquePlayers)

      expect(updatedPlayers).eql(expectedPlayers)

      expect(findByIdsStub).to.have.been.calledOnce
      expect(findByIdsStub).to.have.been.calledWith(uniquePlayers.map(p => p.player_id))
    })

    it('returns right players when some are stored in database', async () => {
      findByIdsStub.returns(Promise.resolve([{ id: 1 }]))

      const uniquePlayers = getUniquePlayers(testMatches)
      const updatedPlayers = await getUpdateablePlayers(uniquePlayers)

      expect(updatedPlayers.find(p => p.id === 1)).to.be.undefined

      expect(findByIdsStub).to.have.been.calledOnce
      // params same as before
    })

    it('returns right players when some are stored in database and force option is used', async () => {
      findByIdsStub.returns(Promise.resolve([{ id: 1 }]))

      const uniquePlayers = getUniquePlayers(testMatches)
      const updatedPlayers = await getUpdateablePlayers(uniquePlayers, { force: true })

      expect(updatedPlayers).eql(expectedPlayers)

      expect(findByIdsStub).to.have.been.calledOnce
    })

    afterEach(() => {
      Model.query.restore()
    })
  })

  describe('getPlayerStatistics', () => {
    it('returns the right statistics', () => {
      expect(getPlayerStatistics(testMatches[1], expectedGoals)).to.deep.equal(expectedPlayerStatistics)
    })
  })

/*  describe('getPlayerStatisticsForTeam', () => {
    it('returns the right statistics for team', () => {
      expect(getPlayerStatisticsForTeam(testMatches[1], 1)).eql(expectedPlayerStatistics.filter(p => p.team_id === 1))
    })
  }) */

  describe('getUpdateablePlayersFromEvents', () => {
    it('returns updated players', async () => {
      const APIstub = sinon.stub(API, 'fetchDetailedEvent')
      APIstub.onCall(0).returns(Promise.resolve(null))
      APIstub.onCall(1).returns(Promise.resolve(detailedEvent))

      const updatedPlayersFromEvents = await getUpdateablePlayersFromEvents(expectedPlayers, testMatches)
      
      expect(updatedPlayersFromEvents).eql(expectedDetailedPlayers)

      expect(APIstub).to.have.been.calledTwice
      expect(APIstub.firstCall).to.have.been.calledWith(1,1)
      expect(APIstub.secondCall).to.have.been.calledWith(1,2)

      API.fetchDetailedEvent.restore()
    })

    it('returns empty on no data', async () => {
      expect(await getUpdateablePlayersFromEvents([])).to.eql([])
    })
  })

  describe('getUpdateablePlayerSeasons', () => {
    let queryStub, findByIdsStub

    beforeEach(() => {
      queryStub = sinon.stub(Model, 'query')
      findByIdsStub = sinon.stub()
      
      queryStub.returns({
        findByIds: findByIdsStub
      })
      findByIdsStub.returns(Promise.resolve([]))
    })
    const uniquePlayers = getUniquePlayersWithStats(testMatches, ['player_id', 'team_id'])

    it('returns updateable player seasons', async () => {
      const updateablePlayerSeasons = await getUpdateablePlayerSeasons(uniquePlayers, 1, 1)

      expect(updateablePlayerSeasons).to.eql(expectedPlayerSeasons)
    })

    it('returns correct data with existing data', async () => {
      findByIdsStub.returns(Promise.resolve([ { player_id: 1, team_id: 1 } ]))

      const updateablePlayerSeasons = await getUpdateablePlayerSeasons(uniquePlayers, 1, 1)

      expect(updateablePlayerSeasons).to.eql(expectedPlayerSeasons.filter(p => p.player_id !== 1))
    })

    it('returns all data with existing data and force option', async () => {
      findByIdsStub.returns(Promise.resolve([ { player_id: 1, team_id: 1 } ]))

      const updateablePlayerSeasons = await getUpdateablePlayerSeasons(uniquePlayers, 1, 1, { force : true })

      expect(updateablePlayerSeasons).to.eql(expectedPlayerSeasons)
    })

    afterEach(() => {
      Model.query.restore()
    })
  })
  describe('getStartingLineup', () => {
    it('returns correct lineup for team', () => {
      const match = {
        match_id: 1,
        tactics: [
          {
            second: 0,
            tactics: [
              {
                team_id: 1,
                second: 0,
                player_id: 1,
              },
              {
                team_id: 2,
                second: 0,
                player_id: 2
              },
              {
                team_id: 2,
                second: 0,
                player_id: 3
              }
            ]
          },
          {
            second: 1,
            tactics: [
              {
                team_id: 1,
                second: 1,
                player_id: 5
              }
            ]
          }
        ]
      }

      const expected = {
        1: [
          {
            match_id: 1,
            team_id: 1,
            second: 0,
            player_id: 1
          }
        ],
        2: [
          {
            match_id: 1,
            team_id: 2,
            second: 0,
            player_id: 2
          },
          {
            match_id: 1,
            team_id: 2,
            second: 0,
            player_id: 3
          }
        ]
      }

      expect(getStartingLineUp(match, 1)).to.eql(expected[1])
      expect(getStartingLineUp(match, 2)).to.eql(expected[2])
    })
  })
})