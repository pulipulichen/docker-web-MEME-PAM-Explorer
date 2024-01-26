const Path = require('path');

module.exports = function (server) {
  server.views({
      engines: {
          html: require('handlebars')
      },
      relativeTo: Path.join(__dirname, '../'),
      path: '.',
      helpersPath: 'helpers',
      layout: 'standard', // Specify the layout file
      layoutPath: 'layout', // Specify the layout file 
  });
}