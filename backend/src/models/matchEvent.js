import { BaseModel } from 'models/base'

export class MatchEvent extends BaseModel {
  static get tableName() {
    return 'match_events'
  }

  static get idColumn() {
    return ['id', 'match_id', 'action_code']
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        match_id: { type: 'integer' },
        team_id: { type: 'integer' },
        player_id: { type: 'integer' },
        opponent_player_id: { type: ['integer', 'null']},
        action_code: { type: 'integer' },
        parent_event_id: { type: ['integer', 'null']},
        parent_event_action_code: { type: ['integer', 'null']},
        standard: { type: 'integer' },
        type: { type: 'string' },
        title: { type: 'string' },
        half: { type: 'integer' },
        second: { type: 'integer' },
        pos_x: { type: ['number', 'null'] },
        pos_y: { type: ['number', 'null'] },
        pos_dest_x: { type: ['number', 'null'] },
        pos_dest_y: { type: ['number', 'null'] },
        offset_left: { type: ['number', 'null'] },
        video_url: { type: 'string' }
      }
    }
  } 
}