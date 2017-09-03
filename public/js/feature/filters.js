var $ = require('jquery')
var _ = require('lodash')

var filterUtility = {

  displayFilters: function (data, template, mountNode) {
    var html = template({ filters: data })
    mountNode.html(html)
  },

  getFilters: function (mountNode) {
    var appliedValues = {}
    mountNode.find('input.filterInput').each(function (index, element) {
      element = $(element)
      var name = element.attr('name')
      var isSelected = element.is(':checked')

      if (!appliedValues[name] && isSelected) {
        appliedValues[name] = []
      }

      isSelected && appliedValues[name].push(element.val())
    })
    return appliedValues
  },

  filter: function (data, filters) {
    return _.filter(data, function (dataValue) {
      var include = true
      _.forEach(filters, function (filterValue, filterType) {
        if (_.includes(filterValue, dataValue[filterType]) === false) {
          include = false
        }
      })
      return include
    })
  }
}

module.exports = filterUtility