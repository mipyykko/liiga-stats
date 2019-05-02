import Match from 'models/match'
import Player from 'models/player'
import dummy from 'mongoose-dummy'

export const createMatches = async (length) => {
  let matches = dummy(Match)
  
  return matches
}

