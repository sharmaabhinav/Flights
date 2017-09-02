var $ = require('jquery')
var _ = require('lodash')
var actions = require('./actions')
var store = require('./store')
var Handlebars = require('handlebars')
var templates = require('./templates/templates')
var formatters = require('./formatter')


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

  var handlerListeners = {
    'fetchDataSuccess': displayFlights,
    'sortOngoing': displayOngoingFlights,
    'sortReturn': displayReturnFlights
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
  }

  function handleSort (event) {
    var params = event.data
    params.links.removeClass('selected')

    var elem = $(this)
    elem.addClass('selected')

    var sortBy = elem.data('sort')
    actions.sortData(sortBy, params.type)
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
    var displayFare = formatters.costFormatter(ongoingFare + returnFare)
    $('#totalfare').html(displayFare)
  }

  function displayFlights (data) {
    displayOngoingFlights(data.ongoing)
    displayReturnFlights(data.return)
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
      duration: formatters.durationFormater(flightInfo.endTimeInMin - flightInfo.startTimeInMin),
      displayCost: formatters.costFormatter(flightInfo.cost),
      cost: flightInfo.cost,
      startTime: formatters.timeFormatter(flightInfo.startTimeInMin),
      endTime: formatters.timeFormatter(flightInfo.endTimeInMin)
    }
  }

  return {
    init: init
  }

})()
module.exports = handler