require('dotenv').config()

const config = {
  PORT: process.env.PORT || 3001,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/liiga',
  
  API_URI: process.env.API_URI,
  LOCAL_DATA_DIRECTORY: process.env.LOCAL_DATA_DIRECTORY
}

module.exports = config