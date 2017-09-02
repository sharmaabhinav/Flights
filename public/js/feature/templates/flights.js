var template = '{{#each flights }}<li data-cost="{{cost}}"" data-name = "{{flightName}}"> \
  <div class="flight-icons {{airLineName}}"> \
  </div> \
  <div class="flight-details"> \
      <div class="time">{{startTime}} - {{endTime}}</div>\
      <div class="name">{{flightName}}</div>\
      <div class="duration">{{duration}}</div>\
  </div>\
  <div class="trip-fare">Rs. {{displayCost}}</div>\
  <div class="cb"><span class="cbid">0</span></div>\
</li>{{/each}}'

module.exports = template