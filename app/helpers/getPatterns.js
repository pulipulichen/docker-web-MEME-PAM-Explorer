const R = require('./db')

let PATTERNS = {}

let parsePatternNumber = function (pattern) {
  let patternNumber = pattern.slice(pattern.indexOf(' ') + 1)
  return patternNumber
}

module.exports = async function (type = 'visual-patterns') {
  if (PATTERNS[type]) {
    return PATTERNS[type]
  }

  let results = await R.getAll(`SELECT pattern, count(pattern) as count_pattern FROM item WHERE type = '${type}' GROUP BY type, pattern ORDER BY pattern ASC`)

  if (results && results.rows) {
    results = results.rows
  }

  results.sort((a, b) => {
    return (parsePatternNumber(a.pattern) - parsePatternNumber(b.pattern))
  })

  results = results.map(item => {
    item.number = parsePatternNumber(item.pattern)
    item.numberCount = `${item.number} (${item.count_pattern})`

    return item
  })

  // PATTERNS[type] = results.map(({pattern}) => pattern)
  PATTERNS[type] = results
  // console.log(results)
  
  // console.log(TYPES)
  return PATTERNS[type]
}