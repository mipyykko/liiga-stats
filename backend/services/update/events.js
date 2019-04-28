import Event from 'models/event'
import _ from 'lodash'
import { shallowCompare, convertTimeToSec } from 'util'

export const updateEvents = async (match, matchGoals) => {
  const { goals, events, match_id, first_team, second_team } = match

  // sometimes events can appear doubled
  const uniqueEvents = _.uniqWith(events, shallowCompare)

  const uniqueEventIds = _.uniq(uniqueEvents.map(e => e.event_id)).length

/*   if (uniqueEventIds != uniqueEvents.length) {
    console.log("combined events at %d", match_id)

    const eventMap = _.reduce(uniqueEvents, (acc, curr) => ({ ...acc, [curr.event_id]: acc[curr.event_id] ? acc[curr.event_id] + 1 : 1 }), {})

    const repeatEventIds = Object.entries(eventMap).filter(k => k[1] > 1).map(k => Number(k[0]))

    const repeatedEvents = uniqueEvents.filter(event => _.includes(repeatEventIds, event.event_id))
  } */

  // TODO: opponent player_id === 0 => undefined/null

  return await Promise.all(uniqueEvents.map(async (event) => {
    const newEvent = await Event.findOneAndUpdate({
      event_id: event.event_id,
      match_id: match_id
    }, {
      $set: {
        goal_id: mapEventToGoalId(event, matchGoals),
        match_id,
        opponent_player_id: event.opponent_player_id === 0 ? null : event.opponent_player_id,
        ...event,         
      }
    }, {
      new: true, upsert: true
    })

    return newEvent
  }))
}

const mapEventToGoalId = (event, goals) => {
  if (event.type !== 'goal') {
    return
  }

  const { player_id, minute, second } = event

  return (goals.find(goal => goal.scorer_id == player_id && goal.second == convertTimeToSec(minute - 1, second)) || {})._id
}