var Handlebars = require('handlebars')
var templates = {

  flight: Handlebars.compile(require('./flight'))
}

module.exports = templates