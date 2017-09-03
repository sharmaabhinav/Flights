var template = '<div class="settingsArea">\
  {{#each filters}}\
    <legend>{{displayName}}</legend>\
    <fieldset class="filter ">\
      {{#each values}}\
        <label for="{{value}}">\
          <input id="{{value}}" type="checkbox" class="filterInput" value="{{value}}" name="{{../name}}">\
          <span class="airlogo"></span>\
          <span>{{displayName}}</span>\
        </label>\
      {{/each}}\
    </fieldset>\
  {{/each}}\
</div>\
<p class="action"><button type="button" id="applyFilter" >Filter flights</button></p>'

module.exports = template