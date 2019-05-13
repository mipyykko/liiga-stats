import { Season } from 'models'

export const getUpdateableSeasons = async (seasons, seasonid, tournamentid, options = { force: false }) => {
  const season = seasons.find(s => Number(s.id) === Number(seasonid))

  if (!season) {    
    return
  }

  const { id, name, first_match } = season

  const foundSeason = await Season.query().findById([id, tournamentid])

  if (foundSeason && foundSeason.name === name && !options.force) {
    return []
  }

  const seasonRegExp = /^(.*)\.\s+(.*) - (\d+)-?(\d+)?$/

  const [{}, country, tournamentName, start_year, end_year] = seasonRegExp.exec(name)

  if (!country || !tournamentName || !start_year) {
    return []
  }

  // TODO: bit silly to construct the name again
  return [{
    id,
    tournament_id: Number(tournamentid),
    name: `${tournamentName} - ${start_year}${end_year ? `-${end_year}` : ''}}`,
    start_year: Number(start_year),
    end_year: end_year ? Number(end_year) : Number(start_year),
    first_match_id: first_match
  }]
}