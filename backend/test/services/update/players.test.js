const chai = require('chai')
const sinon = require('sinon')
import API from 'api'

const mongoose = require('mongoose')
const { 
  updatePlayers, 
  updatePlayerStatistics,
  updatePlayersFromDetailedEvent,
  getMatchPlayers,
  getUniquePlayers 
} = require('services/update/players')

chai.use(require('sinon-chai'))
var expect = chai.expect

const matches = [
  {
    match_id: 1,
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
        statistics: { 
          g: 1,
          isi: 500
        }
      },
      {
        player_id: 1,
        position_id: 31,
        team_id: 1,
        number: 1,
        statistics: {
          g: 1,
          isi: 500
        }
      },
      {
        player_id: 2,
        position_id: 32,
        team_id: 2,
        number: 2,
        statistics: {
          g: 0,
          isi: 150
        }
      }
    ]
  }, {
    match_id: 2,
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

const extendedEvents = [
  {
    event_id: 1,
  },
  { event_id: 2,
    players: [
      {
        id: 1,
        player_team: 1,
        name_eng: 'test',
        lastname_eng: 'one'
      },
      {
        id: 2,
        player_team: 2,
        name_eng: 'test',
        lastname_eng: 'two'
      },
      {
        id: 1,
        player_team: 1,
        name_eng: 'test',
        lastname_eng: 'duplicate'
      },
      {
        id: 3,
        player_team: 2,
        name_eng: null,
        lastname_eng: null
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
  const expected = players.map(p => ({ _id: p.player_id, player_name: p.display_name, ...p }))

  let findOneStub, findOneAndUpdateStub
  
  beforeEach(() => {
    findOneStub = sinon.stub(mongoose.Model, 'findOne')
    findOneAndUpdateStub = sinon.stub(mongoose.Model, 'findOneAndUpdate')
  })

  it('creates player not in database and returns existing', async () => {
    extendStub([
      { _id: 1 }, { _id: 2}
    ], [
      Promise.resolve(expected[0]),
      null
    ])(findOneStub)
    findOneAndUpdateStub.returns({ exec: () => Promise.resolve(expected[1]) })

    const updatedPlayers = await updatePlayers(players)


    expect(findOneStub).to.have.been.calledTwice
    expect(findOneAndUpdateStub).to.have.been.calledOnce

    expect(updatedPlayers).eql(expected)
  })

  it('updates player with force option', async () => {
    extendStub([
      { _id: 1}, { _id: 2 }
    ], [
      Promise.resolve(expected[0]),
      null
    ])(findOneStub)

    extendStub([
      { _id: 1 }, { _id: 2 }
    ], [
      { exec: () => Promise.resolve(expected[0]) },
      { exec: () => Promise.resolve(expected[1]) }
    ])(findOneAndUpdateStub)

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

describe('updatePlayerStatistics', async() => {
  let findOneAndUpdateStub

  beforeEach(() => {
    findOneAndUpdateStub = sinon.stub(mongoose.Model, 'findOneAndUpdate')
  })

  it('updates player statistics', async () => {
    const match = matches[0]

    const expected = [
      {
        player_id: 1,
        match_id: 1,
        g: 1,
        isi: 500
      },
      {
        player_id: 2,
        match_id: 1,
        g: 0,
        isi: 150
      }
    ]

    extendStub(
      [{ player_id: 1, match_id: 1 }, { player_id: 2, match_id: 1 }],
      [{ exec: () => Promise.resolve(expected[0])}, 
        { exec: () => Promise.resolve(expected[1]) }]
    )(findOneAndUpdateStub)

    const playerStatistics = await updatePlayerStatistics(match)

    expect(findOneAndUpdateStub).to.have.been.calledTwice
    expect(findOneAndUpdateStub).to.have.been.calledWith(
      { player_id: 1, match_id: 1},
      { $set: { g: 1, isi: 500 }})    
    expect(playerStatistics).eql(expected)
  })

  afterEach(() => {
    mongoose.Model.findOneAndUpdate.restore()
  })
})

describe('updatePlayersFromDetailedEvent', async () => {
  let fetchDetailedEventStub, findOneStub, findOneAndUpdateStub

  beforeEach(() => {
    fetchDetailedEventStub = sinon.stub(API, 'fetchDetailedEvent')
    findOneStub = sinon.stub(mongoose.Model, 'findOne')
    findOneAndUpdateStub = sinon.stub(mongoose.Model, 'findOneAndUpdate')
  })

  it('updates missing name from event and does not touch existing', async () => {
    
    extendStub([
      [1,1], [1, 2]
    ], [
      Promise.resolve(extendedEvents[0]),
      Promise.resolve(extendedEvents[1])
    ])(fetchDetailedEventStub)

    extendStub([
      { _id: 1 }, { _id: 2 }
    ], [
      { player_id: 1, surname: 'one' },
      { player_id: 2, name: 'test', surname: 'two' }
    ])(findOneStub)
    
    extendStub([
      { _id: 1 }
    ], [{
      exec: () => ({
        player_id: 1,
        name: 'test',
        surname: 'one'
      })
    }])(findOneAndUpdateStub)

    const updatedPlayers = await updatePlayersFromDetailedEvent(1, extendedEvents)

    expect(fetchDetailedEventStub).to.have.been.calledTwice
    expect(findOneStub).to.have.been.calledTwice
    expect(findOneAndUpdateStub).to.have.been.calledOnce

    expect(updatedPlayers).to.eql([
      {
        player_id: 1,
        name: 'test',
        surname: 'one'
      }      
    ])
  })

  it('returns empty with no events or not found events', async () => {
    const dummyEvent = { event_id: 1 }

    fetchDetailedEventStub
      .withArgs(1, 1)
      .returns(Promise.resolve(dummyEvent))

    expect(await updatePlayersFromDetailedEvent(1, [])).eql([])
    expect(await updatePlayersFromDetailedEvent(1, [dummyEvent])).eql([])
  })

  afterEach(() => {
    API.fetchDetailedEvent.restore()
    mongoose.Model.findOne.restore()
    mongoose.Model.findOneAndUpdate.restore()
  })
})

describe('getUniquePlayers', () => {
  it('returns unique players from single match', () => {
    const expected = [matches[0].players[0], matches[0].players[2]]

    expect(getUniquePlayers(matches[0])).eql(expected)
  })

  it('returns unique players from multiple matches', () => {
    const expected = [
      matches[0].players[0],
      matches[0].players[2],
      matches[1].players[2]
    ]

    expect(getUniquePlayers(matches)).eql(expected)
  })
})

const extendStub = (paramlist, retvals) => (stub) => {
  paramlist.map((_, idx) => {
    const params = paramlist[idx] instanceof Array 
      ? paramlist[idx]
      : [paramlist[idx]]

    stub
      .withArgs(...params)
      .returns(retvals[idx])
  })

  return stub
}
