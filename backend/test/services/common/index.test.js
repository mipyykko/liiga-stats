const chai = require('chai')
const sinon = require('sinon')
const util = require('util')

var expect = chai.expect
var assert = chai.assert

chai.use(require('sinon-chai'))

//import { Model } from 'objection'
import { insert, insertMany, update, splitSeasonName } from 'services/common'
import _ from 'lodash'

describe('Common services', () => {
  let Model, queryStub, insertStub, patchAndFetchByIdStub

  beforeEach(() => {
    Model = {
      query: () => ({
        insert: () => {},
        skipUndefined: () => ({ patchAndFetchById: () => {} })
      })
    }

    queryStub = sinon.stub(Model, 'query')
    insertStub = sinon.spy(data =>
      Array.isArray(data)
        ? data.map(d => ({ ...d, status: 'ok' }))
        : { ...data, status: 'ok' }
    )
    patchAndFetchByIdStub = sinon.spy((id, data) => ({ ...data, givenId: id }))
    queryStub.returns({
      insert: insertStub,
      skipUndefined: () => ({ patchAndFetchById: patchAndFetchByIdStub })
    })
  })

  describe('insert', () => {
    it('inserts single object', async () => {
      const ret = await insert({ id: 1 }, Model)

      expect(ret).eql({ id: 1, status: 'ok' })
      expect(insertStub).to.have.been.calledOnce
    })

    it('inserts multiple objects', async () => {
      const ret = await insert([{ id: 1 }, { id: 2 }], Model)

      expect(ret).eql([{ id: 1, status: 'ok' }, { id: 2, status: 'ok' }])
      expect(insertStub).to.have.been.calledOnce
    })

    it('inserts multiple objects in chunks and uses trx in query', async () => {
      const data = _.range(1001).map(n => ({ id: n }))
      const expectData = data.map(d => ({ ...d, status: 'ok' }))

      const ret = await insert(data, Model, 'trx')
      expect(ret).eql(expectData)
      expect(insertStub).to.have.been.calledTwice
      expect(queryStub).to.have.been.calledWith('trx')
    })
  })

  describe('insertMany', () => {
    it('inserts many', async () => {
      const ret = await insertMany([[{ id: 1 }], [{ id: 2 }]], [Model, Model])

      expect(ret).eql([[{ id: 1, status: 'ok' }], [{ id: 2, status: 'ok' }]])

      expect(insertStub).to.have.been.calledTwice
    })

    it('throws error on unequal number of data and entities', async () => {
      try {
        await insertMany(['a', 'b'], [Model])
      } catch (e) {
        var error = e.message

        expect(() => { throw new Error(error) }).to.throw('must have equal number of data arrays and entities')
      }

      expect(error).to.not.be.undefined      
    })
  })

  describe('update', () => {
    it('updates single object', async () => {
      const ret = await update({ id: 1 }, Model)

      expect(ret).eql({ id: 1, givenId: 1 })
    })

    it('updates multiple objects and uses given id field', async () => {
      const ret = await update([{ pid: 1 }, { pid: 2 }], Model, null, 'pid')

      expect(ret).eql([{ pid: 1, givenId: 1 }, { pid: 2, givenId: 2 }])
    })
  })

  describe('splitSeasonName', () => {
    it('returns correct with all fields present', () => {
      const res = splitSeasonName('test. test tournament - 1234-4567')

      expect(res).to.eql({
        country: 'test',
        tournamentName: 'test tournament',
        start_year: 1234,
        end_year: 4567
      })
    })

    it('returns correct with no end year', () => {
      const res = splitSeasonName('test. test tournament - 1234')

      expect(res).to.eql({
        country: 'test',
        tournamentName: 'test tournament',
        start_year: 1234,
        end_year: undefined
      })
    })

    it('returns correct with no country', () => {
      const res = splitSeasonName('test tournament - 1234')

      expect(res).to.eql({
        country: undefined,
        tournamentName: 'test tournament',
        start_year: 1234,
        end_year: undefined
      })
    })

    it('returns correct with no tournament', () => {
      const res = splitSeasonName('- 1234')

      expect(res).to.eql({
        country: undefined,
        tournamentName: undefined,
        start_year: 1234,
        end_year: undefined
      })
    })

    it('returns correct on invalid string', () => {
      expect(splitSeasonName('asdf')).to.eql({
        country: undefined,
        tournamentName: undefined,
        start_year: undefined,
        end_year: undefined
      })
    })
  })
})
