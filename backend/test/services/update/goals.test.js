const chai = require('chai')

var expect = chai.expect

import { getMatchGoals, isWinningGoal } from 'services/update/goals'
import { testMatches, expectedGoals } from './testData'

const createGame = (...params) => ({
  score_first_team: params[0],
  score_second_team: params[1],
  home_team_score: params[2],
  away_team_score: params[3],
  side: params[4]
})

describe('Update service: goals', () => {
  describe('getMatchGoals', () => {
    it('returns goals from a match', () => {
      const goals = getMatchGoals(testMatches[1])

      expect(goals).eql(expectedGoals)
    })

    it('returns null on no goals or null match', () => {
      expect(getMatchGoals(testMatches[0])).eql(null)
      expect(getMatchGoals({ ...testMatches[0], goals: [] })).eql(null)
      expect(getMatchGoals({})).eql(null)
    })
  }),

  describe('isWinningGoal', () => {
    const draw = createGame(0, 0, 0, 0)
    const homeWin = createGame(4, 2)
    const awayWin = createGame(1, 2)

    it('returns false for a draw', () => {
      expect(isWinningGoal(draw)).to.eql(false)
    })

    it('returns true for winning goal for the home side', () => {
      expect(isWinningGoal({ ...homeWin, home_team_score: 3, away_team_score: 0, side: 1 })).to.eql(true)
    })

    it('returns true for winning goal for the away side', () => {
      expect(isWinningGoal({ ...awayWin, home_team_score: 0, away_team_score: 2, side: 2})).to.eql(true)
    })
    it('returns false for goals scored after winning goal', () => {
      expect(isWinningGoal({ ...homeWin, home_team_score: 3, away_team_score: 1, side: 2 })).to.eql(false)
      expect(isWinningGoal({ ...homeWin, home_team_score: 3, away_team_score: 2, side: 2 })).to.eql(false)
      expect(isWinningGoal({ ...homeWin, home_team_score: 4, away_team_score: 2, side: 1 })).to.eql(false)
    })
  })
})

