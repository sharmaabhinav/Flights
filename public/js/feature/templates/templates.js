var Handlebars = require('handlebars')
var templates = {

  flights: Handlebars.compile(require('./flights'))
}

module.exports = templates