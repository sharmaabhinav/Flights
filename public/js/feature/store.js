var Reflux = require('reflux')
var $ = require('jquery')
var _ = require('lodash')
var actions = require('./actions')
var filterUtility = require('./filters')

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
      this.trigger({data: data.filters, type: 'fetchFilterSuccess'})
    }.bind(this))
  },

  onSortData: function (field, type) {
    var data = type === 'sortOngoing' ? this.data['ongoing'] : this.data['return']

    var sortedData = _.sortBy(data, field)
    this.trigger({ data: sortedData, type: type})
  },

  onFilterData: function (filters) {
    var ongoingFlights = filterUtility.filter(this.data.ongoing, filters)
    var returnFlights = filterUtility.filter(this.data.return, filters)
    this.trigger(
        {
          data: {
            ongoing: ongoingFlights,
            return: returnFlights
          },
          type: 'fetchDataSuccess'
        }
    )
  }
})

module.exports = Store