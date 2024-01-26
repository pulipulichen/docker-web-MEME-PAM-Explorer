
module.exports = async function(request) {
  return {
    CONFIG: require('./../config'),
    TYPES: await require('./getTypes')(),
    type: await require('./getRouteType')(request),
  }
}