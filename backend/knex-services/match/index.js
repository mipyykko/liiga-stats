import Match from 'knex-models/match'

export default class MatchKnexService {
  static async findMatch(match_id) {
    return Match
      .query()
      .eager('[tournament, season, home_team, away_team, home_statistics, away_statistics, home_team_info, away_team_info, home_team_tactics, away_team_tactics, home_players, away_players, goals]')
      .findById(match_id)
  }
}