const R = require('../../helpers/db.js');

async function getDatasets (type = 'visual-patterns') {
  let datasets = []
  // let items = await R.getAll('item', 'type = ?', ['visual-patterns'])
  try {
    // let results = await R.getAll(`SELECT pattern, x, y, item_id, centroid_distance, image, url, type FROM item WHERE type = '${type}' ORDER BY centroid_distance ASC, pattern ASC limit 200`)
    let patterns = await require('./../../helpers/getPatterns')(type)

    for (let i = 0; i < patterns.length; i++) {
        let pattern = patterns[i]
        let results = await R.getAll(`SELECT pattern, pca_x, pca_y, item_id, centroid_distance, image, url, type FROM item WHERE type = '${type}' and pattern = '${pattern}' ORDER BY centroid_distance ASC LIMIT 10`)

        if (results && results.rows) {
          results = results.rows
        }

        results = results.map(item => {
          return {
            ...item,
            x: item.pca_x,
            y: item.pca_y,
          }
        })

        // console.log(results)

        datasets.push({
          label: pattern,
          data: results,
          pointRadius: 5
        })
    }

    datasets = JSON.stringify(datasets)
  }
  catch (e) {
    // console.log('111')
    console.trace(e)
  }

  return datasets
}

module.exports = function (server) {
  let name = 'plot'

  server.route({
    method: 'GET',
    path: `/${name}/{type?}`,
    handler: async (request, h) => {
      let layoutVariables = await require('./../../helpers/getLayoutVariables')(request, name)
      let {type} = request.params
      let values = {  
        ...layoutVariables,
        page: '/' + name,
        mode_switcher_page: '/' + name,

        title: `${type} ${name}`,

        // style: '<link rel="stylesheet/less" type="text/css" href="static/plot/plot.less" />',
        style: name,
        datasets: await getDatasets(layoutVariables.type)
        // datasets: []
      }
      // console.log(values)
      return h.view(`routes/${name}/${name}`, values)
    }
});
}