const Path = require('path');

module.exports = function (server) {
  server.views({
      engines: {
          html: require('handlebars')
      },
      relativeTo: Path.join(__dirname, '../'),
      path: 'templates',
      helpersPath: 'helpers',
      layout: 'layout', // Specify the layout file
      layoutPath: 'templates/layout', // Specify the layout file 
  });
}