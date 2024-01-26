const Path = require('path');

module.exports = function (server) {
  // Serve static files from a directory (e.g., 'public')  
  server.route({
      method: 'GET',
      path: '/static/{param*}',
      handler: {
          directory: {
              path: Path.join(__dirname, '../public'),
              redirectToSlash: true
          }
      }
  });
}