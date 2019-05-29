import { Match } from 'models'
import { knex } from 'db'
export default class MatchService {
  static async findMatch(match_id) {
    console.log(Match)
    return Match
      .query()
      .eager('[tournament, season, home_team, away_team, home_statistics, away_statistics, home_team_info, away_team_info, home_team_tactics, away_team_tactics, home_players, away_players, goals]')
      .findById(match_id)
  }

  static async test() {
    return null
/*     const isiquery = knex('match_player_statistics')
      .avg({ isi: 'isi' })
      .where('isi', '>', 0)
      .groupBy('player_id', 'isi')
      .as('isi')


    const query = knex
      .avg({ isi: 'isi' })
      .from('match_player_statistics')
      .groupBy('player_id', 'isi')
      .as('isiquery')

    const statquery = knex('match_player_statistics')
      .sum({ g: 'g' })
      .groupBy('player_id')
      .as('gquery')

    return knex.select('player_id', 'isiqueryisiquery, statquery)
      .from('match_player_statistics')
      .groupBy('player_id', 'match_id', 'team_id')
 */  
  }
}