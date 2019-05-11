import fs from 'fs'
import path from 'path'

const exportable = fs.readdirSync(__dirname).reduce((arr, file) => {
  if (file === 'index.js') return arr

  const filename = path.join(__dirname, file)

  return { ...arr, ...require(filename) }
}, {})

module.exports = exportable
