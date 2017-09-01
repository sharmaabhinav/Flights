var template = '<li> \
  <div class="flight-icons {{airLineName}}"> \
  </div> \
  <div class="flight-details"> \
      <div class="time">{{startTime}} - {{endTime}}</div>\
      <div class="name">{{flightName}}</div>\
      <div class="duration">{{duration}}</div>\
  </div>\
  <div class="trip-fare">Rs. {{cost}}</div>\
</li>'

module.exports = template