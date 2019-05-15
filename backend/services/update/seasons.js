import { Season } from 'models'
import { stripTournament, splitSeasonName } from 'services/common'

export const getUpdateableSeasons = async (seasons, seasonid, tournamentid, options = { force: false }) => {
  const season = seasons.find(s => Number(s.id) === Number(seasonid))

  if (!season) {    
    return
  }

  const { id, name, first_match } = season

  const foundSeason = await Season.query().findById([id, tournamentid])
  const seasonName = stripTournament(name)

  if (foundSeason && foundSeason.name === seasonName && !options.force) {
    return []
  }

  const { country, tournamentName, start_year, end_year } = splitSeasonName(name)

  if (!country || !tournamentName || !start_year) {
    return []
  }

  // TODO: bit silly to construct the name again
  return [{
    id,
    tournament_id: Number(tournamentid),
    name: seasonName,
    start_year: Number(start_year),
    end_year: end_year ? Number(end_year) : Number(start_year),
    first_match_id: first_match
  }]
}

