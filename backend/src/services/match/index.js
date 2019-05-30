import { Match } from 'models'
import { knex } from 'db'
export default class MatchService {
  static async findMatch(match_id) {
    const fields = [
      'tournament', 'season', 
      'home_team', 'home_team.statistics', 
      'away_team', 'away_team.statistics',
      'home_players', 'home_players.player', 'home_players.statistics',
      'away_players', 'away_players.player', 'away_players.statistics',
      'goals', 'events',
      'goals.scorer'
    ]
    return Match
      .query()
      .eager(`[${fields.join(',')}]`)
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