import _ from 'lodash'
import { shallowCompare } from 'utils'

export const insert = async (data, entity, trx = null) => {
  if (!(data instanceof Array)) {
    return await entity.query(trx).insert(data)
  }

  const chunks = _.chunk(data, 1000)

  return _.flattenDepth(
    await Promise.all(chunks
      .map(async chunk => 
        await entity
          .query(trx)
          .insert(chunk)
      )
    ),
    1)
}

export const insertMany = async (data, entities, trx = null) => {
  return Promise.all(
    (_.zip(data, entities))
      .map(async ([d, e]) => await insert(d, e, trx))
  )
}

export const update = async (data, entity, trx = null, id = 'id') => {
  if (!(data instanceof Array)) {
    return await entity
      .query(trx)
      .skipUndefined()
      .patchAndFetchById(getId(data, id), data)
  }

  return _.flattenDepth(
    await Promise.all(data.map(async d => 
      await entity
        .query(trx)
        .skipUndefined()
        .patchAndFetchById(getId(d, id), d))),
    1)
} 

const getId = (data, id) => id instanceof Array
  ? id.map(i => data[i])
  : data[id]

const compareById = (data1, data2, id) => id instanceof Array
  ? id.all(k => data1[k] === data2[k])
  : data1[id] === data2[id]

const exists = n => typeof n !== 'undefined' && n !== null

export const upsert = async (data, entity, trx = null, id) => {
  const _id = id 
    ? id
    : entity.getIdColumn
      ? entity.getIdColumn()
      : 'id'

  // not an array, upsert single
  if (!(data instanceof Array)) {
    const existing = await entity
      .query(trx)
      .findById(getId(data, _id))

    if (!existing) {
      return insert(data, entity, trx)
    }

    return update(data, entity, trx, _id)
  }

  const existing = await entity
    .query(trx)
    .findByIds(data.map(d => getId(d, _id)))
  
  const existingIds = existing.filter(d => exists(getId(d, _id)))
  const [maybeUpdateableData, insertableData] = _.partition(data, d => _.includes(existingIds, getId(d, _id)))
  const updateableData = maybeUpdateableData
    .filter(maybeData => !shallowCompare(
      maybeData,
      data.find(d => compareById(maybeData, d, _id))
    ))

  return _.flattenDepth(
    await Promise.all([
      insert(insertableData, entity, trx),
      ...updateableData.map(async d => update(d, entity, trx, _id))       
    ]),
    1)
}

export const upsertMany = async (data, entities, trx = null) => {
  return Promise.all(
    (_.zip(data, entities))
      .map(async ([d, e]) => await upsert(d, e, trx))
  )
}

export const splitSeasonName = (name) => {
  const seasonRegExp = /^(.*)\.\s+(.*) - (\d+)-?(\d+)?$/

  try {
    // eslint-disable-next-line no-empty-pattern
    const [{}, country, tournamentName, start_year, end_year] = seasonRegExp.exec(name)

    return { country, tournamentName, start_year, end_year }
  } catch (e) {
    return {}
  }
}

export const stripTournament = (name) => {
  const tournamentRegExp = /^.*\.\s+(.*)$/

  try {
    // eslint-disable-next-line no-empty-pattern
    const [{}, seasonName] = tournamentRegExp.exec(name)
    
    return seasonName
  } catch (e) {
    return null
  }
}