import fs from 'fs'
import API from './api'
import config from 'config'

export default class FakeAPI extends API {
  static fetchTournamentSeason(tournamentid, seasonid) {
    try {
      return JSON.parse(fs.readFileSync(`${config.LOCAL_DATA_DIRECTORY}/${tournamentid}-${seasonid}.json`, { encoding: 'utf-8' }))
    } catch (err) {
      return super.fetchTournamentSeason(tournamentid, seasonid)
    }
  }

  static async fetchMatch (matchid) {
    try {
      return JSON.parse(fs.readFileSync(`${config.LOCAL_DATA_DIRECTORY}/${matchid}.json`, { encoding: 'utf-8' }))
    } catch(err) {
      return super.fetchMatch(matchid)
    }
  }
}
