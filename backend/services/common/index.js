import _ from 'lodash'

export const insert = async (data, entity, trx = null) => {
  if (!(data instanceof Array)) {
    return await entity.query(trx).insert(data)
  }

  const chunks = _.chunk(data, 1000)

  return _.flattenDepth(
    await Promise.all(chunks.map(async chunk => await entity.query(trx).insert(chunk))),
    1)
}

export const insertMany = async (data, entities, trx = null) => {
  return Promise.all(
    (_.zip(data, entities)).map(async ([d, e]) => await insert(d, e, trx))
  )
}

export const update = async (data, entity, trx = null, id = 'id') => {
  if (!(data instanceof Array)) {
    return await entity
      .query(trx)
      .skipUndefined()
      .patchAndFetchById(data[id], data)
  }

  return _.flattenDepth(
    await Promise.all(data.map(async d => 
      await entity
        .query(trx)
        .skipUndefined()
        .patchAndFetchById(d[id], d))),
    1)
} 
