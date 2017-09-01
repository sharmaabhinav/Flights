var Reflux = require('reflux')
var $ = require('jquery')
var lodash = require('lodash')
var actions = require('./actions')

var Store = Reflux.createStore({
  init: function () {
    this.listenToMany(actions)
  },
  onFetchData: function (){
    $.getJSON('data.json').done(function (data) {
      console.log(data)
    })
  }
})

module.exports = Store