const R = require('../../helpers/db.js');

module.exports = function (server) {
  server.route({
    method: 'GET',
    path: '/plot',
    handler: async (request, h) => {
        let items = await R.find('item', 'type = ?', ['visual-patterns'])
        items = items.map(({x, y, pattern}) => {
            return {x, y, pattern}
        })
        // console.log(items)  

        return h.view('routes/plot/plot', {
            items
        })
    }
});
}