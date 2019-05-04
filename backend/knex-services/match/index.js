import Match from 'knex-models/match'

export default class MatchKnexService {
  static async findMatch(match_id) {
    return Match
      .query()
      .eager('[tournament, season, home_team, away_team, home_statistics, away_statistics]')
      .findById(match_id)
  }
}