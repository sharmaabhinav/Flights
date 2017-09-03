var $ = require('jquery')
var _ = require('lodash')
var actions = require('./actions')
var store = require('./store')
var Handlebars = require('handlebars')
var templates = require('./templates/templates')
var formatters = require('./formatter')
var filters = require('./filters')
var utils = require('./utils')


var handler = (function () {
  var ongoingFlightContainer
  var returnFlightContainer
  var ongoingSortLinks
  var returnSortLinks
  var totalPriceSection
  var ongoingFare = 0
  var returnFare = 0
  var ongoingFlightLinks
  var returnFlightLinks
  var filterShowBtn
  var filterSection
  var displaySection

  var handlerListeners = {
    'fetchDataSuccess': displayFlights,
    'sortOngoing': displayOngoingFlights,
    'sortReturn': displayReturnFlights,
    'fetchFilterSuccess': displayFilters
  }

  function init () {
    actions.fetchData()
    setupStoreListener()
    setupDomElements()
    setupUIListeners()
  }

  function setupDomElements () {
    ongoingFlightContainer = $('#trip1-list')
    returnFlightContainer = $('#trip2-list')
    ongoingSortLinks = $('.sort-trip1')
    returnSortLinks = $('.sort-trip2')
    totalPriceSection = $('#totalfare')
    filterShowBtn = $('#filter-show')
    filterSection = $('#filter')
    displaySection = $('#display')
  }


  function setupStoreListener() {
    store.listen (function (data) {
      if (data.type) {
        handlerListeners[data.type](data.data)
      }
    })
  }

  function setupUIListeners () {
    ongoingSortLinks.on('click', {type: 'sortOngoing', links: ongoingSortLinks} , handleSort)
    returnSortLinks.on('click', {type: 'sortReturn', links: returnSortLinks} , handleSort)
    ongoingFlightContainer.on('click', 'li', {type: 'ongoing'}, handleFlightSelection)
    returnFlightContainer.on('click', 'li', {type: 'return'}, handleFlightSelection)
    filterShowBtn.on('click', handleFilterShow)
    filterSection.on('click', '#applyFilter', handleFilterApply)
  }

  function handleFilterShow () {
    filterSection.removeClass('hide')
    displaySection.addClass('hide')
  }

  function handleFilterApply () {
    filterSection.addClass('hide')
    displaySection.removeClass('hide')

    var appliedFilters = filters.get(filterSection)
    actions.filterData(appliedFilters)

    resetOngoingSelection()
    resetReturnFlightSelection()
  }

  function handleSort (event) {
    var params = event.data
    params.links.removeClass('selected')

    var elem = $(this)
    elem.addClass('selected')

    var sortBy = elem.data('sort')
    actions.sortData(sortBy, params.type)

    if (params.type === 'sortOngoing') {
      resetOngoingSelection()
    } else {
      resetReturnFlightSelection()
    }
  }

  function resetOngoingSelection (){
    actions.ongoingSelection('')
    ongoingFare = 0
    updateTotalPrice(ongoingFare, returnFare)
  }

  function resetReturnFlightSelection () {
    actions.returnSelection('')
    returnFare = 0
    updateTotalPrice(ongoingFare, returnFare)
  }

  function handleFlightSelection (event) {
    var params = event.data
    var elem = $(this)

    if (params.type === 'ongoing') {
      ongoingFlightLinks.removeClass('selected')
      ongoingFare = elem.data('cost')
      actions.ongoingSelection(elem.data('name'))
    } else {
      returnFlightLinks.removeClass('selected')
      actions.returnSelection(elem.data('name'))
      returnFare = elem.data('cost')
    }
    elem.addClass('selected')
    updateTotalPrice(ongoingFare, returnFare)
  }

  function updateTotalPrice (ongoingFare, returnFare) {
    var newFare = ongoingFare + returnFare
    var oldFare = parseInt(totalPriceSection.html())
    utils.cashRegisterEffect(oldFare, newFare, totalPriceSection)
  }

  function displayFlights (data) {
    displayOngoingFlights(data.ongoing)
    displayReturnFlights(data.return)
  }

  function displayFilters (data) {
    filters.display(data, templates.filters, filterSection)
  }

  function displayOngoingFlights (data) {
    var flights = getFlightsDisplayDetails(data)
    var html = templates.flights({ flights: flights })
    ongoingFlightContainer.html(html)
    ongoingFlightLinks = ongoingFlightContainer.find('li')
  }

  function displayReturnFlights (data) {
    var flights = getFlightsDisplayDetails(data)
    var html = templates.flights({ flights: flights })
    returnFlightContainer.html(html)
    returnFlightLinks = returnFlightContainer.find('li')
  }

  function getFlightsDisplayDetails (data) {
    return _.map(data, function (flightInfo) {
      return getFlightDisplayDetails(flightInfo)
    })
  }


  function getFlightDisplayDetails (flightInfo) {
    return {
      airLineName: flightInfo.airLineName,
      flightName: flightInfo.flightName,
      duration: formatters.duration(flightInfo.endTimeInMin - flightInfo.startTimeInMin),
      displayCost: formatters.cost(flightInfo.cost),
      cost: flightInfo.cost,
      startTime: formatters.time(flightInfo.startTimeInMin),
      endTime: formatters.time(flightInfo.endTimeInMin)
    }
  }

  return {
    init: init
  }

})()
module.exports = handler