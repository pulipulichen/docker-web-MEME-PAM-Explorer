const R = require('./db')

let PATTERNS = {}

module.exports = async function (type = 'visual-patterns') {
  if (PATTERNS[type]) {
    return PATTERNS[type]
  }

  let results = await R.getAll(`SELECT pattern FROM item WHERE type = '${type}' GROUP BY type, pattern ORDER BY pattern ASC`)

  if (results && results.rows) {
    results = results.rows
  }

  PATTERNS[type] = results.map(({pattern}) => pattern)
  // console.log(TYPES)
  return PATTERNS[type]
}