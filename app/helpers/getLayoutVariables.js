
module.exports = async function(request, page) {
  let type = await require('./getRouteType')(request)
  // let homepage_uri = `/${page}/${type}`
  // if (page === 'items') {
  //   homepage_uri = `/patterns/${type}`
  // }
  let homepage_uri = `/${type}`

  return {
    CONFIG: require('./../config'),
    TYPES: await require('./getTypes')(),
    homepage_uri,
    type
  }
}