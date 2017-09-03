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
    this.filters = {}
  },

  onOngoingSelection: function (selection) {
    this.ongoingSelection = selection
  },

  setFilters: function (filters) {
    this.filters = filters
  },

  getFilters: function () {
    return this.filters
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

    data = filterUtility.filter(_.sortBy(data, field), this.getFilters())
    this.trigger({ data: data, type: type})
  },

  onFilterData: function (filters) {
    this.setFilters(filters)
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