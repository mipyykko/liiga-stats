import { Model } from 'db'
import { getPath } from 'models/utils'

export class Match extends Model {
  static get tableName() {
    return 'matches'
  }

  static get modifiers() {
    return {
      unique(builder) {
        builder.distinct('id')
      }
    }
  }
  static get jsonSchema() {
    return {
      type: 'object',

      properties: { 
        id: { type: 'integer' },
        tournament_id: { type: 'integer' },
        season_id: { type: 'integer' },
        round: { type: 'integer' },
        date: { type: 'string' },
        //time: { type: 'string' },
        status: { type: 'integer' },
        min: { type: 'integer' },
        width: { type: 'integer' },
        height: { type: 'integer' },
        home_team_id: { type: 'integer' },
        away_team_id: { type: 'integer' },
        home_score: { type: 'integer' },
        away_score: { type: 'integer' } 
      }
    }
  }

  static get relationMappings() {
    return {
      tournament: {
        relation: Model.BelongsToOneRelation,
        modelClass: getPath('tournament'),
        join: {
          from: 'matches.tournament_id',
          to: 'tournaments.id'
        }
      },
      season: {
        relation: Model.BelongsToOneRelation,
        modelClass: getPath('season'),
        join: {
          from: [
            'matches.tournament_id',
            'matches.season_id'
          ],
          to: [
            'seasons.tournament_id',
            'seasons.id'
          ]
        }
      },
      // TODO: find better name?
/*       home_team: {
        relation: Model.HasOneRelation,
        modelClass: getPath('team'),
        join: {
          from: 'matches.home_team_id',
          to: 'teams.id'
        },
      },
      away_team: {
        relation: Model.HasOneRelation,
        modelClass: getPath('team'),
        join: {
          from: 'matches.away_team_id',
          to: 'teams.id'
        }
      }, */
      home_players: {
        relation: Model.HasManyRelation,
        modelClass: getPath('matchPlayer'),
        join: {
          from: [
            'matches.home_team_id',
            'matches.id'
          ],
          to: [
            'match_players.team_id',
            'match_players.match_id'
          ]
        },
      },
      away_players: {
        relation: Model.HasManyRelation,
        modelClass: getPath('matchPlayer'),
        join: {
          from: [
            'matches.away_team_id',
            'matches.id'
          ],
          to: [
            'match_players.team_id',
            'match_players.match_id'
          ]
        },
      },
/*       home_statistics: {
        relation: Model.HasOneRelation,
        modelClass: getPath('matchTeamStatistic'),
        join: {
          from: [
            'matches.home_team_id',
            'matches.id'
          ],
          to: [
            'match_team_statistics.team_id',
            'match_team_statistics.match_id'
          ]
        }
      },
      away_statistics: {
        relation: Model.HasOneRelation,
        modelClass: getPath('matchTeamStatistic'),
        join: {
          from: [
            'matches.away_team_id',
            'matches.id'
          ],
          to: [
            'match_team_statistics.team_id',
            'match_team_statistics.match_id'
          ]
        }
      }, */
      home_team: {
        relation: Model.HasOneRelation,
        modelClass: getPath('matchTeam'),
        join: {
          from: [
            'matches.home_team_id',
            'matches.id'
          ],
          to: [
            'match_teams.team_id',
            'match_teams.match_id'
          ]
        }
      },
      away_team: {
        relation: Model.HasOneRelation,
        modelClass: getPath('matchTeam'),
        join: {
          from: [
            'matches.away_team_id',
            'matches.id'
          ],
          to: [
            'match_teams.team_id',
            'match_teams.match_id'
          ]
        }
      },
/*       home_team_tactics: { 
        relation: Model.HasManyRelation,
        modelClass: getPath('matchTeamTactic'),
        join: {
          from: [
            'matches.home_team_id',
            'matches.id',
          ],
          to: [
            'match_team_tactics.team_id',
            'match_team_tactics.match_id'
          ]
        }
      },
      away_team_tactics: { 
        relation: Model.HasManyRelation,
        modelClass: getPath('matchTeamTactic'),
        join: {
          from: [
            'matches.away_team_id',
            'matches.id',
          ],
          to: [
            'match_team_tactics.team_id',
            'match_team_tactics.match_id'
          ]
        }
      }, */
      goals: {
        relation: Model.HasManyRelation,
        modelClass: getPath('goal'),
        join: {
          from: [
            'matches.id'
          ],
          to: [
            'goals.match_id'
          ]
        }
      },
      events: {
        relation: Model.HasManyRelation,
        modelClass: getPath('matchEvent'),
        join: {
          from: [
            'matches.id'
          ],
          to: [
            'match_events.match_id'
          ]
        }

      }
    }
  }
}