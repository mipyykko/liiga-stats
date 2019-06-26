const chai = require('chai')
const sinon = require('sinon')
const util = require('util')

var expect = chai.expect
var fail = chai.fail

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
  expectedTeamStatistics, expectedEvents, 
  expectedGoals, expectedTactics,
  expectedPlayerStatistics, expectedUpdated,
  expectedMatchTeams, expectedMatchPlayers,
  expectedSeasonTeams, expectedPlayerSeasons
} from './testData'

describe('Update service: updating season', () => {
  let stubs = {}
  let transactionStub, insertManyStub, updateStub, upsertStub

  beforeEach(() => {
    const toStub = [
      [API, ['fetchTournamentSeason', 'fetchTournamentSeasons']],
      [matchFns, ['getMatches', 'getUpdateableMatches']],
      [teamFns, ['getUpdateableTeams']],
      [playerFns, ['getUpdateablePlayers', 'getUpdateablePlayersFromEvents', 'getUpdateablePlayerSeasons']],
      [tournamentFns, ['getUpdateableTournaments']],
      [seasonFns, ['getUpdateableSeasons']]
    ]

    stubs = toStub.reduce((acc, [cl, fns]) => 
      ({ ...acc, ...fns.reduce((acc2, fn) => 
        ({ ...acc2, [fn]: sinon.stub(cl, fn) }), 
      {})}),
    {})

    insertManyStub = sinon.stub(common, 'insertMany')
    updateStub = sinon.stub(common, 'update')
    upsertStub = sinon.stub(common, 'upsert')
    transactionStub = sinon.spy(async (...params) => await params[params.length-1]())

    sinon.replace(objection.default, 'transaction', transactionStub)

    stubs['fetchTournamentSeasons'].returns(Promise.resolve(testSeasons))
    stubs['fetchTournamentSeason'].returns(Promise.resolve(testSeasonMatches))
    stubs['getMatches'].returns(Promise.resolve(testMatches))
    // these two aren't actually what's returned, but whatever
    stubs['getUpdateablePlayers'].returns(Promise.resolve(expectedPlayers))
    stubs['getUpdateableTeams'].returns(Promise.resolve(expectedTeams))
    stubs['getUpdateablePlayersFromEvents'].returns(Promise.resolve(expectedDetailedPlayers))
    stubs['getUpdateablePlayerSeasons'].returns(Promise.resolve(expectedPlayerSeasons))
  })

  it('returns expected updated ids', async () => {
    insertManyStub.onCall(0).returns(Promise.resolve([expectedTeams, expectedPlayers]))
    updateStub.returns(Promise.resolve(expectedDetailedPlayers))

    insertManyStub.onCall(1).returns(Promise.resolve([
      [expectedTournament], 
      [expectedSeasons[1]], 
      expectedMatches,
      expectedPlayerSeasons
    ]))

    upsertStub.onCall(0).returns(Promise.resolve(expectedPlayerStatistics))
    upsertStub.onCall(1).returns(Promise.resolve(Object.values(expectedTeamStatistics)))

    insertManyStub.onCall(2).returns(Promise.resolve([
      expectedSeasonTeams,
      expectedMatchPlayers,
      expectedMatchTeams,
      expectedTactics,
      expectedGoals,
      expectedEvents
    ]))


    const updated = await updateService.updateSeason(1, 1)

    expect(insertManyStub.callCount).eql(3)
    expect(updateStub.callCount).eql(1)
    expect(upsertStub.callCount).eql(2)

    expect(Object.keys(updated.updated).length).eql(15)
    // TODO: hmm, this below may not work like it should
    Object.keys(updated).forEach(k => expect(updated.updated[k]).eql(expectedUpdated.updated[k]))
    // expect(updated).eql(expectedUpdated)
  })

  it('returns error', async () => {
    insertManyStub.onCall(0).throws('an error happened')

    let updated

    try {
      updated = await updateService.updateSeason(1, 1)
      fail('should have thrown an error')
    }
    catch (error) {
      expect(updated).eql({ error: 'an error happened'})
    }
  })
  
  afterEach(() => {
    sinon.restore()
  })
})


