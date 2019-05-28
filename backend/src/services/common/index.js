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