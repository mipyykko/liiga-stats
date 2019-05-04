import Tournament from 'knex-models/tournament'

export const updateTournament = async (seasons, tournamentid, options = { force: false }) => {
  const foundTournament = await Tournament.query().findById(tournamentid)

  if (foundTournament && !options.force) {
    return foundTournament
  }

  if (!seasons || seasons.length === 0) {
    return
  }

  const seasonRegExp = /^(.*)\.\s+(.*) - (\d+)-?(\d+)?$/

  let country, name

  const found = seasons.some(season => {
    [{}, country, name] = seasonRegExp.exec(season.name)

    return country && name
  })

  if (!found) {
    return
  }

  return await Tournament
    .query()
    .insert({
      id: tournamentid,
      name,
      country
    })
}

export const getUpdateableTournaments = async (seasons, tournamentid, options = { force: false }) => {
  const foundTournament = await Tournament.query().findById(tournamentid)

  if (foundTournament && !options.force) {
    return []
  }

  if (!seasons || seasons.length === 0) {
    return []
  }

  const seasonRegExp = /^(.*)\.\s+(.*) - (\d+)-?(\d+)?$/

  let country, name

  const found = seasons.some(season => {
    [{}, country, name] = seasonRegExp.exec(season.name)

    return country && name
  })

  if (!found) {
    return
  }

  return [{
    id: tournamentid,
    name, 
    country
  }]
}