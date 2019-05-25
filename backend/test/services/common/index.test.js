const chai = require('chai')
const sinon = require('sinon')
const util = require('util')

var expect = chai.expect
chai.use(require('sinon-chai'))

//import { Model } from 'objection'
import { insert, insertMany, update } from 'services/common'
import _ from 'lodash'

describe('Common services', () => {
  let Model, entityStub, queryStub, insertStub, patchAndFetchByIdStub

  beforeEach(() => {
    Model = { 
      query: () => ({
        insert: () => {},
        skipUndefined: () => ({ patchAndFetchById: () => {} }) 
      })
    }

    queryStub = sinon.stub(Model, 'query')
    insertStub = sinon.spy((data) => (
      data instanceof Array 
        ? data.map(d => ({...d, status: 'ok' }))
        : {...data, status: 'ok' }
    ))
    patchAndFetchByIdStub = sinon.spy((id, data) => ({ ...data, givenId: id }))
    queryStub.returns({
      insert: insertStub,
      skipUndefined: () => ({ patchAndFetchById: patchAndFetchByIdStub })
    })
  })

  it('inserts single object', async () => {
    const ret = await insert({ id: 1 }, Model)

    expect(ret).eql({ id: 1, status: 'ok' })
    expect(insertStub).to.have.been.calledOnce
  })

  it('inserts multiple objects', async () => {
    const ret = await insert([{ id: 1}, { id: 2 }], Model)

    expect(ret).eql([{ id: 1, status: 'ok' }, { id: 2, status: 'ok' }])
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

  it('inserts many', async () => {
    const ret = await insertMany([[{ id: 1 }], [{ id: 2}]], [Model, Model])

    expect(ret).eql([[{ id: 1, status: 'ok'}], [{ id: 2, status: 'ok' }]])

    expect(insertStub).to.have.been.calledTwice
  })

  it('updates single object', async () => {
    const ret = await update({ id: 1 }, Model)

    expect(ret).eql({ id: 1, givenId: 1 })
  })

  it('updates multiple objects and uses given id field', async () => {
    const ret = await update([{ pid: 1 }, { pid: 2 }], Model, null, 'pid')

    expect(ret).eql([{ pid: 1, givenId: 1 }, { pid: 2, givenId: 2 }])
  })
})