const ExtensionReloader  = require('webpack-extension-reloader');
const path = require('path');

module.exports = {
  mode: "development", // The plugin is activated only if mode is set to development
  watch: true,
  entry: {
    'content-script': path.join(__dirname, 'extension', 'src', 'content.js'),
    background: path.join(__dirname, 'extension', 'src', 'background.js')
  },
  plugins: [
    new ExtensionReloader({
      port: 9090, // Which port use to create the server
      reloadPage: true, // Force the reload of the page also
      entries: { // The entries used for the content/background scripts or extension pages
        contentScript: 'content-script',
        background: 'background',
      }
    })
  ]
}