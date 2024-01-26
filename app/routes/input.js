const Path = require('path');

module.exports = function (server) {
  // Serve static files from a directory (e.g., 'public')  
  server.route({
      method: 'GET',
      path: '/input/{param*}',
      handler: {
          directory: {
              path: '/opt/input/',
              redirectToSlash: true
          }
      }
  });
}