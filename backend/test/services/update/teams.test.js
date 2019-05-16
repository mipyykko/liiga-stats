const chai = require('chai')
const sinon = require('sinon')

var expect = chai.expect
chai.use(require('sinon-chai'))

import { Model } from 'objection'

import {
  getUniqueTeams, 
  getUniqueTeamsFromMatches,
  getTactics,
  getTeamTactics,
  getTeamInfo,
  getTeamStatistics,
  getUpdateableTeams
} from 'services/update/teams'

import {
  testMatches, 
  expectedTeams,
  expectedTactics,
  expectedTeamInfos,
  expectedTeamStatistics
} from './testData'

describe('Update service: teams', () => {
  describe('getUniqueTeams', () => {
    it('returns unique teams', () => {
      expect(getUniqueTeams([ { team_id: 1 }, { team_id: 1 }, { team_id: 2 }])).eql([ { team_id: 1}, { team_id: 2 }])
    })
  })

  describe('getUniqueTeamsFromMatches', () => {
    it('returns unique teams', () => {
      expect(getUniqueTeamsFromMatches(testMatches).map(t => t.team_id)).eql([1,2,3])
    })
  })

  describe('getTactics', () => {
    it('returns tactics', () => {
      expect(getTactics(testMatches[1])).eql(expectedTactics)
    })
  })

  describe('getTeamTactics', () => {
    it('returns tactics for team', () => {
      expect(getTeamTactics(testMatches[1], 1)).eql(expectedTactics.filter(t => t.team_id === 1))
    })
  })

  describe('getTeamInfo', () => {
    it('returns team info for each team', () => {
      ['first', 'second'].map(t => expect(getTeamInfo(testMatches[1], t)).eql(expectedTeamInfos[t]))
    })
  })

  describe('getTeamStatistics', () => {
    it('returns team statistics for each team', () => {
      ['first', 'second'].map(t => expect(getTeamStatistics(testMatches[1], t)).eql(expectedTeamStatistics[t]))
    })
  })

  describe('getUpdateableTeams', () => {
    let queryStub, findByIdsStub

    beforeEach(() => {
      queryStub = sinon.stub(Model, 'query')
      findByIdsStub = sinon.stub()
      queryStub.returns({
        findByIds: findByIdsStub
      })
      findByIdsStub.returns(Promise.resolve(null))
    })

    it('returns updateable teams if not found in database', async () => {
      const uniqueTeams = getUniqueTeamsFromMatches(testMatches)

      const updateableTeams = await getUpdateableTeams(uniqueTeams)

      expect(updateableTeams).eql(expectedTeams)
      expect(findByIdsStub).to.have.been.calledOnce
      expect(findByIdsStub).to.have.been.calledWith([1,2,3])
    })

    it('returns updateable teams if some found in database', async () => {
      findByIdsStub.returns(Promise.resolve([{ team_id: 1 }]))

      const uniqueTeams = getUniqueTeamsFromMatches(testMatches)

      const updateableTeams = await getUpdateableTeams(uniqueTeams)

      expect(updateableTeams).eql(expectedTeams.filter(t => t.team_id !== 1))
    })

    it('returns updateable teams if some found in database but forced', async () => {
      findByIdsStub.returns(Promise.resolve([{ team_id: 1 }]))

      const uniqueTeams = getUniqueTeamsFromMatches(testMatches)

      const updateableTeams = await getUpdateableTeams(uniqueTeams, { force: true })

      expect(updateableTeams).eql(expectedTeams)
    })
    
    afterEach(() => {
      Model.query.restore()
    })
  })
})