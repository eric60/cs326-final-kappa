const path = require('path')

module.exports = {
  entry: './static/js/client.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'static/src')
  }
}