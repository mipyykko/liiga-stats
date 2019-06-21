import { combineReducers } from 'redux'
import match from './match'
import season from './season'
import tournament from './tournament'
import player from './player'

export const withSelectId = (key, reducer) => (state, action) => {
  switch (action.type) {
    case `SELECT_${key}`:
      return { ...state, id: action.payload.id }
    default:
      return reducer(state, action)
  }
}

export default combineReducers({
  match: withSelectId('MATCH', match),
  season: withSelectId('SEASON', season),
  tournament: withSelectId('TOURNAMENT', tournament),
  player: withSelectId('PLAYER', player)
})