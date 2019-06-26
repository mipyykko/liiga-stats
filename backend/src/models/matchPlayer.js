import { BaseModel } from 'models/base'
import { knex } from 'db'
export class MatchPlayer extends BaseModel {
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
        player_id: { type: 'integer' },
        match_id: { type: 'integer' },
        team_id: { type: 'integer' },
        number: { type: ['integer', 'null'] },
        position_id: { type: ['integer', 'null'] },
        starting: { type: 'boolean' }
        // TODO: these aren't accurate because of the halves - rethink
        /*         in_sub_second: { type: ['integer', 'null'] },
        out_sub_second: { type: ['integer', 'null'] },
        replaced_player_id: { type: ['integer', 'null'] },
        replacement_player_id: { type: ['integer', 'null'] }, */
      }
    }
  }

  static get relationMappings() {
    return {
      player: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'player',
        join: {
          from: 'match_players.player_id',
          to: 'players.id'
        }
      },
      /*       replaced_player: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'player',
        join: {
          from: 'match_players.replaced_player_id',
          to: 'players.id'
        }
      },
      replacement_player: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'player',
        join: {
          from: 'match_players.replacement_player_id',
          to: 'players.id'
        }
      }, */
      match: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'match',
        join: {
          from: 'match_players.match_id',
          to: 'matches.id'
        }
      },
      team: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'team',
        join: {
          from: 'match_players.team_id',
          to: 'teams.id'
        }
      },
      statistics: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'matchPlayerStatistic',
        join: {
          from: ['match_players.player_id', 'match_players.match_id'],
          to: [
            'match_player_statistics.player_id',
            'match_player_statistics.match_id'
          ]
        }
      },
      tactics: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'matchTeamTactic',
        join: {
          from: [
            'match_players.player_id',
            'match_players.team_id',
            'match_players.match_id'
          ],
          to: [
            'match_team_tactics.player_id',
            'match_team_tactics.team_id',
            'match_team_tactics.match_id'
          ]
        }
      },
      goals: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'goal',
        join: {
          from: ['match_players.player_id', 'match_players.match_id'],
          to: ['goals.scorer_id', 'goals.match_id']
        }
      },
      goal_events: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'matchEvent',
        join: {
          from: ['match_players.player_id', 'match_players.match_id'],
          to: ['match_events.player_id', 'match_events.match_id']
        },
        modify: builder => builder.where('type', 'goal')
      },
      cards: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'matchEvent',
        join: {
          from: ['match_players.player_id', 'match_players.match_id'],
          to: ['match_events.player_id', 'match_events.match_id']
        },
        modify: builder => builder.whereIn('type', ['yc', 'rc', 'yrc'])
      },
      substitution_in: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'matchEvent',
        join: {
          from: ['match_players.match_id', 'match_players.player_id'],
          to: ['match_events.match_id', 'match_events.opponent_player_id']
        },
        modify: builder => builder.where('type', 'sub')
      },
      substitution_out: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'matchEvent',
        join: {
          from: ['match_players.match_id', 'match_players.player_id'],
          to: ['match_events.match_id', 'match_events.player_id']
        },
        modify: builder => builder.where('type', 'sub')
      },
      statistics_test: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'matchPlayerStatistic',
        join: {
          from: ['match_players.player_id'],
          to: ['match_player_statistics.player_id']
        },
        modify: builder =>
          builder
            .sum({ g: 'g' })
            .sum({ a: 'a' })
            .groupBy('player_id')
      }
    }
  }
}
