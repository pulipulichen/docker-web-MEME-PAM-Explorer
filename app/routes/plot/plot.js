
module.exports = function (server) {
  server.route({
    method: 'GET',
    path: '/plot',
    handler: async (request, h) => {
        return h.view('routes/plot/plot', {
            title: 'My Website',
            name: 'John'
        })
    }
});
}