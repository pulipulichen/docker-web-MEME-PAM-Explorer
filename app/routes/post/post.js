const R = require('../../helpers/db.js');

async function getURL(type, item_id) {

    // let items = await R.getAll('item', 'type = ?', ['visual-patterns'])
    
    let results = await R.getAll(`SELECT url FROM item WHERE type = '${type}' and item_id = '${item_id}'`)

    if (results && results.rows) {
      results = results.rows
    }

    return results[0].url
}

module.exports = function (server) {
  let name = 'post'

  server.route({
    method: 'GET',
    path: `/${name}/{type}/{item_id}`,
    handler: async (request, h) => {
      let layoutVariables = await require('../../helpers/getLayoutVariables.js')(request, name)
      return h.view(`routes/${name}/${name}`, {  
        ...layoutVariables,
        page: '/' + name,

        // style: '<link rel="stylesheet/less" type="text/css" href="static/plot/plot.less" />',
        style: name,
        url: await getURL(layoutVariables.type, request.params.item_id)
      }, { layout: 'popup' })
    }
});
}