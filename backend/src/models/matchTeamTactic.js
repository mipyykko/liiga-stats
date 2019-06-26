import { BaseModel } from 'models/base'

export class MatchTeamTactic extends BaseModel {
  static get tableName() {
    return 'match_team_tactics'
  }

  static get idColumn() {
    return ['team_id', 'match_id', 'player_id', 'second']
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        team_id: { type: 'integer' },
        match_id: { type: 'integer' },
        player_id: { type: 'integer' },
        position: { type: ['integer', 'null'] },
        second: { type: 'integer' }
      }
    }
  }

  static get relationMappings() {
    return {
      player: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'player',
        join: {
          from: 'match_team_tactics.player_id',
          to: 'players.id'
        }
      },
      match_player: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'matchPlayer',
        join: {
          from: ['match_team_tactics.player_id', 'match_team_tactics.match_id'],
          to: ['match_players.player_id', 'match_players.match_id']
        }
      },
      match_team: {
        relation: BaseModel.HasOneRelation,
        modelClass: 'matchTeam',
        join: {
          from: ['match_team_tactics.match_id', 'match_team_tactics.team_id'],
          to: ['match_teams.match_id', 'match_teams.team_id']
        }
      }
    }
  }
}
