const R = require('../../helpers/db.js');

async function getDatasets(type = 'visual-patterns') {

    let patterns = await require('./../../helpers/getPatterns')(type)
    
    // let items = await R.getAll('item', 'type = ?', ['visual-patterns'])
    let datasets = []

    for (let i = 0; i < patterns.length; i++) {
        let pattern = patterns[i].pattern
        let results = await R.getAll(`SELECT item_id, image FROM item WHERE type = '${type}' and pattern = '${pattern}' ORDER BY centroid_distance ASC LIMIT 10`)

        if (results && results.rows) {
          results = results.rows
        }

        datasets.push({ 
          pattern,
          items: results,
          number: patterns[i].number,
          count_pattern: patterns[i].count_pattern
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
        mode_switcher_page: '/' + name,

        title: `${type} ${name}`,

        // style: '<link rel="stylesheet/less" type="text/css" href="static/plot/plot.less" />',
        style: name,
        patternNumbers: await require('./../../helpers/getPatternNumbers')(layoutVariables.type),
        patterns: await require('./../../helpers/getPatterns')(layoutVariables.type),
        datasets: await getDatasets(layoutVariables.type)
      })
    }
});
}