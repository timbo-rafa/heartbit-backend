const nconf = require('nconf')

// Load arguments from argv (highest priority)
nconf.argv()
// Load from shell environment
nconf.env()
// Load from config.json (lowest priority)
nconf.defaults(require('./config'))

module.exports = nconf