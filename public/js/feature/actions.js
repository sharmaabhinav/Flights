var Reflux = require('reflux')

var Actions = Reflux.createActions([
  'fetchData',
  'sortData',
  'ongoingSelection',
  'returnSelection',
  'filterData'
])

module.exports = Actions