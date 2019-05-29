import fs from 'fs'
import path from 'path'

let exportable

exportable = fs.readdirSync(__dirname).reduce((arr, file) => {
  if (['index.js', 'utils'].includes(file)) return arr

  const req = require(path.join(__dirname, file))

  return Object.assign(arr, req)
}, {})

module.exports = exportable