const R = require('../../helpers/db.js');

async function getItems(type, pattern) {

    // let items = await R.getAll('item', 'type = ?', ['visual-patterns'])
    
    let results = await R.getAll(`SELECT item_id, image FROM item WHERE type = '${type}' and pattern = '${pattern}' ORDER BY centroid_distance DESC`)

    if (results && results.rows) {
      results = results.rows
    }

    return results
}

module.exports = function (server) {
  let name = 'items'
  
  server.route({
    method: 'GET',
    path: `/${name}/{type}/{pattern}`,
    handler: async (request, h) => {
      let layoutVariables = await require('../../helpers/getLayoutVariables.js')(request, name)
      let type = request.params.type
      let pattern = request.params.pattern
      return h.view(`routes/${name}/${name}`, {  
        ...layoutVariables,
        // page: '/patterns',
        page: `/${name}`,
        mode_switcher_page: `/patterns`,

        title: `${type} ${pattern}`,

        patterns: await require('./../../helpers/getPatterns')(layoutVariables.type),
        pattern,

        // style: '<link rel="stylesheet/less" type="text/css" href="static/plot/plot.less" />',
        style: name,
        items: await getItems(layoutVariables.type, pattern)
      })
    }
});
}