import _ from 'lodash'
import { shallowCompare, convertTimeToSec } from 'utils'

export const getMatchEvents = (match) => {
  if (!match) {
    return []
  }

  const { events, goals } = match

  let uniqueEvents = _.uniqWith(events, shallowCompare)
  const eventsById = _.groupBy(uniqueEvents, 'event_id')

  const duplicateEvents = Object.values(eventsById).map(es => {
    if (es.length > 1) {
      return (es[0].pos_x > 0 && es[0].pos_y > 0) 
        ? es[0]['event_id']
        : es[1]['event_id']
    } 
    
    return
  }).filter(v => !!v)

  uniqueEvents = uniqueEvents.filter(e => !_.includes(duplicateEvents, e.event_id))

  return uniqueEvents.map(event => ({
    ..._.omit(event, ['event_id', 'minute', 'fitness_available', 'player_name', 'opponent_player_name', 'opponent_player_id']),
    id: event.event_id,
    match_id: match.match_id,
    opponent_player_id: match.opponent_player_id > 0 ? match.opponent_player_id : null
  }))  
}

const mapEventToGoalId = (event, goals) => {
  if (event.type !== 'goal') {
    return
  }

  const { player_id, minute, second } = event

  // TODO: not used now since it's a composite key
  return (goals.find(
    goal => goal.scorer_id == player_id && 
    goal.second == convertTimeToSec(minute - 1, second)) || {}).id // goal doesn't have an id now
}

