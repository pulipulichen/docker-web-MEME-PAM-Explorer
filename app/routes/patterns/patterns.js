const R = require('../../helpers/db.js');

async function getDatasets(type = 'visual-patterns') {

    let patterns = await require('./../../helpers/getPatterns')(type)

    // let items = await R.getAll('item', 'type = ?', ['visual-patterns'])
    let datasets = []

    for (let i = 0; i < patterns.length; i++) {
        let pattern = patterns[i]
        let results = await R.getAll(`SELECT item_id, image FROM item WHERE type = '${type}' and pattern = '${pattern}' ORDER BY centroid_distance DESC LIMIT 10`)

        if (results && results.rows) {
          results = results.rows
        }

        datasets.push({ 
          pattern,
          items: results
        })
    }

    return datasets
}

module.exports = function (server) {
  let name = 'patterns'

  server.route({
    method: 'GET',
    path: `/${name}/{type?}`,
    handler: async (request, h) => {
      let layoutVariables = await require('../../helpers/getLayoutVariables.js')(request, name)
      let {type} = request.params
      return h.view(`routes/${name}/${name}`, {  
        ...layoutVariables,
        page: '/' + name,
        title: `${type} ${name}`,

        // style: '<link rel="stylesheet/less" type="text/css" href="static/plot/plot.less" />',
        style: name,
        patterns: await require('./../../helpers/getPatterns')(layoutVariables.type),
        datasets: await getDatasets(layoutVariables.type)
      })
    }
});
}