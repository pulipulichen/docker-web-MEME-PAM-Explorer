
module.exports = function (server) {
  server.route({
    method: 'GET',
    path: '/{type?}',
    handler: async (request, h) => {
        let layoutVariables = await require('./../../helpers/getLayoutVariables')(request, '/')
        return h.redirect(`/plot/${layoutVariables.type}`);

        // return h.view('routes/index/index', {
        //     ...(await require('./../../helpers/getLayoutVariables')(request)),
        //     page: '',
        //     // header: '<h1>Welcome to My Website</h1>',  
        //     // content: '<h2>Hello, {{name}}!</h2>',
        //     // footer: '<p>&copy; 2024 My Website</p>',
        //     name: 'John',
            
        // })
    }
});
}