const R = require('../../helpers/db.js');

async function getURL(type, item_id) {

  try {
    // let items = await R.getAll('item', 'type = ?', ['visual-patterns'])
        
    let results = await R.getAll(`SELECT url, image FROM item WHERE type = '${type}' and item_id = '${item_id}'`)

    if (results && results.rows) {
      results = results.rows
    }
 
    return results[0]
  }
  catch (e) {
    return false
  }
}

module.exports = function (server) {
  let name = 'post'

  server.route({
    method: 'GET',
    path: `/${name}/{type}/{item_id}`,
    handler: async (request, h) => {
      let layoutVariables = await require('../../helpers/getLayoutVariables.js')(request, name)
      let data = await getURL(layoutVariables.type, request.params.item_id) 
      let item_id = request.params.item_id

      let url =  data.url
      let encodedURL = encodeURI(url)
      let isTwitter = url.startsWith('https://twitter.com')
      // https://twitter.com/Garde_Y2E/status/1638748614091501568
      return h.view(`routes/${name}/${name}`, {  
        ...layoutVariables,
        page: '/' + name,
        title: `${item_id}`,
 
        // style: '<link rel="stylesheet/less" type="text/css" href="static/plot/plot.less" />',
        style: name,
        url,
        encodedURL,
        isTwitter,
        image: data.image
      }, { layout: 'popup' })
    }
});
}