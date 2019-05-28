// import { Goal } from './goal'
/* import { Match } from './match'
import { MatchEvent } from './matchEvent'
import { MatchPlayerStatistic } from './matchPlayerStatistic'
import { MatchTeamInfo } from './matchTeamInfo'
import { MatchTeamTactic } from './matchTeamTactic'
import { Player } from './player'
import { Season } from './season'
import { Team } from './team'
import { Tournament } from './tournament'

const Goal = require('./goal')

module.exports = { 
  Goal, 
  Match, 
  MatchEvent, 
  MatchPlayerStatistic, 
  MatchTeamInfo,
  MatchTeamTactic,
  Player,
  Season,
  Team,
  Tournament
}
 */
import fs from 'fs'
import path from 'path'

let exportable

exportable = fs.readdirSync(__dirname).reduce((arr, file) => {
  if (['index.js', 'utils'].includes(file)) return arr

  const req = require(path.join(__dirname, file))

  return Object.assign(arr, req)
}, {})

module.exports = exportable