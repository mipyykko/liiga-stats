import fs from 'fs'
import path from 'path'

module.exports = fs.readdirSync(__dirname).reduce((arr, file) => {
  if (['index.js', 'utils', 'base'].includes(file)) return arr

  const req = require(path.join(__dirname, file))

  return Object.assign(arr, req)
}, {})
