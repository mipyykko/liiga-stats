var chai = require('chai')
chai.use(require('sinon-chai'))
var expect = chai.expect
var sinon = require('sinon')

const mongoose = require('mongoose')
const { 
  updateTeams, 
  updateTeamStatistics, 
  getUniqueTeams 
} = require('services/update/teams')

import { extendStub } from '../../helpers/stubs'
import { createMatches } from '../../helpers/factories'

describe('Update service: teams', () => {
  describe('test', async () => {
    console.log(await createMatches(5))
  })

  describe('getUniqueTeams', () => {
    const matches = [{
      first_team: { 
        team_id: 1
      },
      second_team: { 
        team_id: 2,
      }
    }, { 
      first_team: {
        team_id: 1
      },
      second_team: {
        team_id: 3
      }
    }, {
      first_team: {
        team_id: 2
      },
      second_team: {
        team_id: 1
      }
    }]

    const uniqueTeams = getUniqueTeams(matches)

    expect(uniqueTeams).eql([
      { team_id: 1 },
      { team_id: 2 },
      { team_id: 3 }
    ])
  })

  describe('updateTeams', async () => {
    const teams = [
      { 
        team_id: 1,
        name: 'test one',
        logo: 'logo.jpg'
      },
      { 
        team_id: 2,
        name: 'test two',
        logo: 'logo2.jpg'
      },
      { 
        team_id: 1,
        name: 'test duplicate',
        logo: 'logod.jpg'
      }
    ]

    let findOneStub, findOneAndUpdateStub

    beforeEach(() => {
      findOneStub = sinon.stub(mongoose.Model, 'findOne')
      findOneAndUpdateStub = sinon.stub(mongoose.Model, 'findOneAndUpdate')
    })

    it('creates teams not found and returns found', async () => {
      const expected = [
        { _id: 1, ...teams[0] },
        { _id: 2, ...teams[1] }
      ]

      extendStub([
        { _id: 1 }, { _id: 2 }
      ], [
        Promise.resolve(expected[0]),
        null
      ])(findOneStub)

      extendStub([
        { _id: 2 }
      ], [
        { exec: () => Promise.resolve(expected[1]) }
      ])(findOneAndUpdateStub)

      const updatedTeams = await updateTeams(teams)

      expect(findOneStub).to.have.been.calledTwice
      expect(findOneAndUpdateStub).to.have.been.calledOnce
      expect(updatedTeams).eql(expected)
    })

    afterEach(() => {
      mongoose.Model.findOne.restore()
      mongoose.Model.findOneAndUpdate.restore()
    })
  })
})