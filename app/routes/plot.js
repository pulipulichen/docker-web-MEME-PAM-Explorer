
module.exports = function (server) {
  server.route({
    method: 'GET',
    path: '/plot',
    handler: async (request, h) => {
        return h.view('index', {
            title: 'My Website',
            name: 'John'
        })
    }
});
}