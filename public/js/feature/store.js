var Reflux = require('reflux')
var $ = require('jquery')
var _ = require('lodash')
var actions = require('./actions')

var Store = Reflux.createStore({
  init: function () {
    this.listenToMany(actions)
    this.data = {ongoing: [], return: []}
    this.ongoingSelection = ''
    this.returnSelection = ''
  },

  onOngoingSelection: function (selection) {
    this.ongoingSelection = selection
  },

  onReturnSelection: function (selection) {
    this.returnSelection = selection
  },

  setData: function (data) {
    this.data = data
  },

  onFetchData: function (){
    $.getJSON('data.json').done(function (data) {
      this.setData(data)
      this.trigger({ data: data, type: 'fetchDataSuccess'})
    }.bind(this))
  },

  onSortData: function (field, type) {
    var data = type === 'sortOngoing' ? this.data['ongoing'] : this.data['return']

    var sortedData = _.sortBy(data, field)
    this.trigger({ data: sortedData, type: type})
  }
})

module.exports = Store