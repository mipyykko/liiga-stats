import _ from 'lodash'
import { shallowCompare } from 'utils'

export const getMatchEvents = (match) => {
  if (!match || !match.events) {
    return []
  }

  let uniqueEvents = _.uniqWith(match.events, shallowCompare)
  const eventsById = _.groupBy(uniqueEvents, 'event_id')

  const duplicateEvents = Object.keys(eventsById).map(k => {
    if (eventsById[k].length > 1) {
      return (eventsById[k][0].pos_x > 0 && eventsById[k][0].pos_y > 0) 
        ? eventsById[k][1]['event_id']
        : eventsById[k][0]['event_id']
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

