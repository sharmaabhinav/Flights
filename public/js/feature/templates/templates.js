var Handlebars = require('handlebars')
var templates = {

  flights: Handlebars.compile(require('./flights')),
  filters: Handlebars.compile(require('./filters'))
}

module.exports = templates