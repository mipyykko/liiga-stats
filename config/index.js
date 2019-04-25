require('dotenv').config()

const config = {
  PORT: process.env.PORT || 3001,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/liiga',
  
  INSTAT_API_URI: 'http://mc.instatfootball.com/api/v1/',
  LOCAL_DATA_DIRECTORY: process.env.LOCAL_DATA_DIRECTORY
}

module.exports = config