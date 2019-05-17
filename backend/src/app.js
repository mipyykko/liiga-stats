require('app-module-path/register')
require('@babel/register')({
  sourceMaps: !(process.env.NODE_ENV !== 'production')
  //presets: ['@babel/preset-env']
})
require('@babel/polyfill')

module.exports = require('./server.js')