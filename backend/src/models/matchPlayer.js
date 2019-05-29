import { Model } from 'db'
import { getPath } from 'models/utils'

export class MatchPlayer extends Model {
  static get tableName() {
    return 'match_players'
  }

  static get idColumn() {
    return ['player_id', 'match_id'] // 'team_id'
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        player_id: { type: 'integer' },
        match_id: { type: 'integer' },
        team_id: { type: 'integer' },
        number: { type: ['integer', 'null'] },
        position_id: { type: ['integer', 'null'] },
        starting: { type: 'boolean' },
        in_sub_second: { type: ['integer', 'null'] },
        out_sub_second: { type: ['integer', 'null'] },
        replaced_player_id: { type: ['integer', 'null'] },
        replacement_player_id: { type: ['integer', 'null'] },
      }
    }
  }

  static get relationMappings() {
    return {
      player: {
        relation: Model.BelongsToOneRelation,
        modelClass: getPath('player'),
        join: {
          from: 'match_players.player_id',
          to: 'players.id'
        }
      },
      replaced_player: {
        relation: Model.BelongsToOneRelation,
        modelClass: getPath('player'),
        join: {
          from: 'match_players.replaced_player_id',
          to: 'players.id'
        }
      },
      replacement_player: {
        relation: Model.BelongsToOneRelation,
        modelClass: getPath('player'),
        join: {
          from: 'match_players.replacement_player_id',
          to: 'players.id'
        }
      },
      match: {
        relation: Model.BelongsToOneRelation,
        modelClass: getPath('match'),
        join: {
          from: 'match_players.match_id',
          to: 'matches.id'
        }
      },
      team: {
        relation: Model.BelongsToOneRelation,
        modelClass: getPath('team'),
        join: {
          from: 'match_players.team_id',
          to: 'teams.id'
        }
      },
      statistics: {
        relation: Model.BelongsToOneRelation,
        modelClass: getPath('matchPlayerStatistic'),
        join: {
          from: [
            'match_players.player_id',
            'match_players.match_id'
          ],
          to: [
            'match_player_statistics.player_id',
            'match_player_statistics.match_id'
          ]
        }
      },
      tactics: {
        relation: Model.HasManyRelation,
        modelClass: getPath('matchTeamTactic'),
        join: {
          from: [
            'match_players.player_id',
            'match_players.team_id',
            'match_players.match_id',
          ],
          to: [
            'match_team_tactics.player_id',
            'match_team_tactics.team_id',
            'match_team_tactics.match_id'
          ]
        }
      },
    }
  }

}