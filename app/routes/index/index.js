
module.exports = function (server) {
  server.route({
    method: 'GET',
    path: '/',
    handler: async (request, h) => {
        return h.view('routes/index/index', {
            title: 'My Website',
            // header: '<h1>Welcome to My Website</h1>', 
            // content: '<h2>Hello, {{name}}!</h2>',
            // footer: '<p>&copy; 2024 My Website</p>',
            name: 'John'
        })
    }
});
}