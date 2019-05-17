import { Model } from 'db'

export class MatchEvent extends Model {
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
        id: { type: 'number' },
        match_id: { type: 'number' },
        team_id: { type: 'number' },
        player_id: { type: 'number' },
        opponent_player_id: { type: ['number', 'null']},
        action_code: { type: 'number' },
        parent_event_id: { type: ['number', 'null']},
        parent_event_action_code: { type: ['number', 'null']},
        standard: { type: 'number' },
        type: { type: 'string' },
        title: { type: 'string' },
        half: { type: 'number' },
        second: { type: 'number' },
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