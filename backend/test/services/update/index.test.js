const chai = require('chai')
const sinon = require('sinon')
const util = require('util')

var expect = chai.expect
chai.use(require('sinon-chai'))

import API from 'api'
import * as objection from 'objection'
import * as common from 'services/common'
import updateService from 'services/update'

import * as matchFns from 'services/update/matches'
import * as tournamentFns from 'services/update/tournaments'
import * as seasonFns from 'services/update/seasons'
import * as goalFns from 'services/update/goals'
import * as playerFns from 'services/update/players'
import * as eventFns from 'services/update/events'
import * as teamFns from 'services/update/teams'

import {
  testSeasons, testSeasonMatches, testMatches,
  expectedTeams, expectedPlayers, expectedDetailedPlayers,
  expectedTournament, expectedSeasons, expectedMatches,
  expectedTeamStatistics, expectedTeamInfos,
  expectedEvents, expectedGoals, expectedTactics,
  expectedPlayerStatistics, expectedUpdated
} from './testData'

describe('Update service: updating season', () => {
  let fetchTournamentSeasonsStub, fetchTournamentSeasonStub,
      getMatchesStub, getUpdateableTournamentsStub,
      getUpdateableSeasonsStub, getUpdateableMatchesStub,
      getUpdateableTeamsStub, getUpdateablePlayersStub,
      getUpdateablePlayersFromEventsStub, 
      transactionStub, insertManyStub, updateStub

  beforeEach(() => {
    fetchTournamentSeasonStub = sinon.stub(API, 'fetchTournamentSeason')
    fetchTournamentSeasonsStub = sinon.stub(API, 'fetchTournamentSeasons')
    getMatchesStub = sinon.stub(matchFns, 'getMatches')
    getUpdateableTournamentsStub = sinon.stub(tournamentFns, 'getUpdateableTournaments')
    getUpdateableSeasonsStub = sinon.stub(seasonFns, 'getUpdateableSeasons')
    getUpdateableMatchesStub = sinon.stub(matchFns, 'getUpdateableMatches')
    getUpdateableTeamsStub = sinon.stub(teamFns, 'getUpdateableTeams')
    getUpdateablePlayersStub = sinon.stub(playerFns, 'getUpdateablePlayers')
    getUpdateablePlayersFromEventsStub = sinon.stub(playerFns, 'getUpdateablePlayersFromEvents')
    insertManyStub = sinon.stub(common, 'insertMany')
    updateStub = sinon.stub(common, 'update')
    transactionStub = sinon.spy(async (...params) => await params[params.length-1]())

    sinon.replace(objection.default, 'transaction', transactionStub)

    fetchTournamentSeasonsStub.returns(Promise.resolve(testSeasons))
    fetchTournamentSeasonStub.returns(Promise.resolve(testSeasonMatches))
    getMatchesStub.returns(Promise.resolve(testMatches))
    getUpdateablePlayersFromEventsStub.returns(Promise.resolve(expectedDetailedPlayers))
  })

  it('returns expected updated ids', async () => {
    insertManyStub.onCall(0).returns(Promise.resolve([expectedTeams, expectedPlayers]))
    updateStub.returns(Promise.resolve(expectedDetailedPlayers))

    insertManyStub.onCall(1).returns(Promise.resolve([
      [expectedTournament], 
      [expectedSeasons], 
      expectedMatches
    ]))

    insertManyStub.onCall(2).returns(Promise.resolve([
      Object.values(expectedTeamStatistics),
      Object.values(expectedTeamInfos),
      expectedPlayerStatistics,
      expectedTactics,
      expectedGoals,
      expectedEvents
    ]))

    const updated = await updateService.updateSeason(1, 1)

    expect(insertManyStub.callCount).eql(3)
    expect(updateStub.getCall(0).args[0]).eql(expectedDetailedPlayers)


    expect(updated).eql(expectedUpdated)
  })

  it('returns error', async () => {
    insertManyStub.onCall(0).throws('an error happened')

    const updated = await updateService.updateSeason(1, 1)

    expect(updated).eql({ error: 'an error happened'})
  })
  
  afterEach(() => {
    sinon.restore()
  })
})


