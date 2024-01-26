
module.exports = async function (request) {
  const TYPES = await require('./getTypes')()

  let type = TYPES[0]
  if (request && request.params && request.params.type) {
    type = request.params.type
  }

  return type
}