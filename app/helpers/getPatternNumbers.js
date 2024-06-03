const getPatterns = require('./getPatterns.js');

let parsePatternNumber = function (pattern) {
  let patternNumber = pattern.slice(pattern.indexOf(' ') + 1)
  return patternNumber
}

module.exports = async function (type) {
  let patterns = await getPatterns(type)
  patterns = patterns.map(i => parsePatternNumber(i))

  return patterns
}