require('dotenv').config()

/* if (process.env.NODE_ENV !== 'production') {
} */

const isProduction = process.env.NODE_ENV === 'production'

export default {
  PORT: process.env.PORT || 3001,
  EXTERNAL_API_URI: process.env.EXTERNAL_API_URI,
  LOCAL_DATA_DIRECTORY: process.env.LOCAL_DATA_DIRECTORY,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DATABASE: isProduction
    ? process.env.POSTGRES_DATABASE
    : process.env.POSTGRES_TEST_DATABASE
}
