const chai = require('chai')
const sinon = require('sinon')

var expect = chai.expect
chai.use(require('sinon-chai'))

import { getMatchEvents } from 'services/update/events'
import { testMatches, expectedEvents } from './testData'

describe('Update service: events', () => {
  describe('getMatchEvents', () => {
    it('returns match events', () => {
      const events = getMatchEvents(testMatches[1])

      expect(events).eql(expectedEvents)
    })

    it('returns empty on null match', () => 
      expect(getMatchEvents(null)).to.be.empty
    )
  })
})