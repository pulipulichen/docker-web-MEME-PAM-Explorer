const R = require('../../helpers/db.js');

async function getDatasets () {
    // let items = await R.getAll('item', 'type = ?', ['visual-patterns'])
    let items = await R.getAll(`SELECT pattern, x, y, item_id, centroid_distance, image, url FROM item WHERE type = 'visual-patterns' ORDER BY centroid_distance DESC`)

    let patterns = {}
    // console.log(items)
    items.rows.forEach(item => {
        let pattern = item.pattern

        if (!patterns[pattern]) {
            patterns[pattern] = []
        }
        patterns[pattern].push(item)
    })

    let datasets = Object.keys(patterns).map(label => {
        return {
            label,
            data: patterns[label].map(({x, y, item_id, centroid_distance, image, url, pattern}) => {
                return {x, y, item_id, centroid_distance, image, url, pattern}
            }),
            // backgroundColor: 'blue',
            pointRadius: 5, 
        }
    })
    datasets = JSON.stringify(datasets)

    return datasets
}

module.exports = function (server) {
  server.route({
    method: 'GET',
    path: '/plot',
    handler: async (request, h) => {
        
        return h.view('routes/plot/plot', {  
            style: '<link rel="stylesheet/less" type="text/css" href="static/plot/plot.less" />',
            datasets: await getDatasets()
        })
    }
});
}