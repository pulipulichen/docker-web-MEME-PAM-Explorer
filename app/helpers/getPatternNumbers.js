const getPatterns = require('./getPatterns.js');

let parsePatternNumber = function (pattern) {
  let patternNumber = pattern.slice(pattern.indexOf(' ') + 1)
  return patternNumber
}

module.exports = async function (type) {
  let patterns = await getPatterns(type)
  patterns = patterns.map(i => {
    let number = parsePatternNumber(i.pattern)

    let count = i.count_pattern

    return `${number} (${count})`
  })

  return patterns
}