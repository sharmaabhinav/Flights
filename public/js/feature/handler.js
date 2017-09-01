var $ = require('jquery')
var _ = require('lodash')
var actions = require('./actions')
var store = require('./store')
var Handlebars = require('handlebars')
var templates = require('./templates/templates')


var handler = (function () {


  function init () {
    actions.fetchData()
    console.log(templates.flight({ airLineName: 'indigo1' }))
  }


  return {
    init: init
  }

})()
module.exports = handler