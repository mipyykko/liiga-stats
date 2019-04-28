require('dotenv').config()

/* if (process.env.NODE_ENV !== 'production') {
} */

export default {
  PORT: process.env.PORT || 3001,
  MONGO_URI: process.env.NODE_ENV === 'production' 
    ? process.env.MONGO_URI
    : (process.env.TEST_MONGO_URI ||  'mongodb://127.0.0.1:27017/liiga_test'),

  EXTERNAL_API_URI: process.env.EXTERNAL_API_URI,
  LOCAL_DATA_DIRECTORY: process.env.LOCAL_DATA_DIRECTORY
}
