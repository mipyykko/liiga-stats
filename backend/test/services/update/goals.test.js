const chai = require('chai')

var expect = chai.expect

import { getMatchGoals } from 'services/update/goals'
import { testMatches, expectedGoals } from './testData'

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
  })
})
