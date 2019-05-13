const chai = require('chai')
const sinon = require('sinon')

import { getUniquePlayers } from 'services/update/players'

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

describe('Update service: players', () => {
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

})