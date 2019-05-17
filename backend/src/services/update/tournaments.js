import { Tournament } from 'models'
import { splitSeasonName } from 'services/common'

export const getUpdateableTournaments = async (seasons, tournamentid, options = { force: false }) => {
  const foundTournament = await Tournament.query().findById(tournamentid)

  if ((foundTournament || (!seasons || seasons.length == 0)) && !options.force) {
    return []
  }

  let country, name

  const found = seasons.some(season => {
    const split = splitSeasonName(season.name)

    country = split.country
    name = split.tournamentName

    return country && name
  })

  if (!found) {
    return []
  }

  return [{
    id: tournamentid,
    name, 
    country
  }]
}