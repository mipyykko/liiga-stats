const fs = require('fs')
const API = require('./api')
const config = require('config')

class FakeAPI extends API {
  static async fetchMatch (matchid) {
    try {
      return JSON.parse(fs.readFileSync(`${config.LOCAL_DATA_DIRECTORY}/${matchid}.json`, { encoding: 'utf-8' }))
    } catch(err) {
      return super.fetchMatch(matchid)
    }
  }
}

module.exports = FakeAPI