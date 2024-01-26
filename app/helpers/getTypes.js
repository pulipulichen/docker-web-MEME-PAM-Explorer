const R = require('./db')

let TYPES

module.exports = async function () {
  if (TYPES) {
    return TYPES
  }

  let results = await R.getAll(`SELECT type FROM item GROUP BY type ORDER BY type DESC`)

  TYPES = results.rows.map(({type}) => type)
  // console.log(TYPES)
  return TYPES
}