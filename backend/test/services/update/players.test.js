var chai = require('chai')
chai.use(require('sinon-chai'))
var expect = chai.expect
var sinon = require('sinon')

const mongoose = require('mongoose')
const Player = require('models/player')
const { getMatchPlayers, updatePlayers, getUniquePlayers } = require('services/update/players')

const matches = [
  {
    first_team: { 
      team_id: 1
    },
    second_team: {
      team_id: 2
    },
    players: [
      {
        player_id: 1,
        position_id: 31,
        team_id: 1,
        number: 1,
      },
      {
        player_id: 1,
        position_id: 31,
        team_id: 1,
        number: 1,
      },
      {
        player_id: 2,
        position_id: 32,
        team_id: 2,
        number: 2
      }
    ]
  },
  {
    first_team: { 
      team_id: 1
    },
    second_team: {
      team_id: 3
    },
    players: [
      {
        player_id: 1,
        position_id: 31,
        team_id: 1,
        number: 1
      },
      {
        player_id: 1,
        position_id: 31,
        team_id: 1,
        number: 1
      },
      {
        player_id: 3,
        position_id: 33,
        team_id: 3,
        number: 2
      }
    ]
  }
]

describe('getMatchPlayers', () => {

  const statistics = [
    {
      _id: 123,
      player_id: 1
    },
    {
      _id: 345,
      player_id: 2
    }
  ]

  const expected = [
    {
      player_id: 1,
      position_id: 31,
      team_id: 1,
      number: 1,
      statistics_id: 123
    },
    {
      player_id: 2,
      position_id: 32,
      team_id: 2,
      number: 2,
      statistics_id: 345
    }
  ]

  it('returns correct list of players', () => {
    const players = getMatchPlayers(matches[0], statistics)

    expect(players).to.eql(expected)
  })
})

describe('updatePlayers', () => {
  const players = [
    {
      player_id: 1,
      display_name: 'test',
      photo: 'photo.jpg'
    },
    {
      player_id: 2,
      display_name: 'test2',
      photo: 'photo2.jpg'
    }
  ]

  const expected = players.map(p => ({ _id: p.player_id, player_name: p.display_name, ...p }))

  let findOneStub, findOneAndUpdateStub
  
  beforeEach(() => {
    findOneStub = sinon.stub(mongoose.Model, 'findOne')
    findOneAndUpdateStub = sinon.stub(mongoose.Model, 'findOneAndUpdate')
  })

  it('creates player not in database', async () => {
    findOneStub.withArgs({ _id: 1 }).returns(Promise.resolve(expected[0]))
    findOneStub.withArgs({ _id: 2 }).returns(null)
    findOneAndUpdateStub.returns({ exec: () => Promise.resolve(expected[1]) })

    const updatedPlayers = await updatePlayers(players)


    expect(findOneStub).to.have.been.calledTwice
    expect(findOneAndUpdateStub).to.have.been.calledOnce

    expect(updatedPlayers).eql(expected)
  })

  it('updates player with force option', async () => {
    findOneStub.withArgs({ _id: 1 }).returns(Promise.resolve(expected[0]))
    findOneStub.withArgs({ _id: 2 }).returns(null)

    findOneAndUpdateStub.withArgs({ _id: 1}).returns({ exec: () => Promise.resolve(expected[0]) })
    findOneAndUpdateStub.withArgs({ _id: 2}).returns({ exec: () => Promise.resolve(expected[1]) })

    const updatedPlayers = await updatePlayers(players, { force: true })

    expect(findOneStub).to.have.been.calledTwice
    expect(findOneAndUpdateStub).to.have.been.calledTwice

    expect(updatedPlayers).eql(expected)
  })

  afterEach(() => {
    mongoose.Model.findOne.restore()
    mongoose.Model.findOneAndUpdate.restore()
  })
})

describe('getUniquePlayers', () => {
  it('returns unique players from single match', () => {
    const expected = [
      {
        player_id: 1,
        position_id: 31,
        team_id: 1,
        number: 1,
      },
      {
        player_id: 2,
        position_id: 32,
        team_id: 2,
        number: 2,
      }
    ]

    expect(getUniquePlayers(matches[0])).eql(expected)
  })

  it('returns unique players from multiple matches', () => {
    const expected = [
      {
        player_id: 1,
        position_id: 31,
        team_id: 1,
        number: 1,
      },
      {
        player_id: 2,
        position_id: 32,
        team_id: 2,
        number: 2,
      },
      {
        player_id: 3,
        position_id: 33,
        team_id: 3,
        number: 2
      }
    ]

    expect(getUniquePlayers(matches)).eql(expected)
  })
})