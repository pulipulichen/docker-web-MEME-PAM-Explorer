const Path = require('path');
const lessMiddleware = require('less-middleware');

module.exports = {
    plugin: lessMiddleware,
    options: {
      src: Path.join(__dirname, '../static'), // The directory containing your .less files
      dest: Path.join(__dirname, '../static/dest'), // The directory where the compiled .css files will be stored
      prefix: '/styles', // URL prefix for serving CSS
    }
}