var formatters = {
  duration : function (val) {
    var hours = Math.floor(val / 60)
    var min = val % 60
    return hours + "h :" + min + "m"
  },
  cost: function (val) {
    var formatedVal
    try {
      formatedVal = val.toLocaleString('hi-IN')
    } catch (e) {
      formatedVal = val
    }
    return formatedVal
  },
  time: function (val) {
    var hours = Math.floor(val / 60)
    var min = val % 60
    return hours + ":" + min
  }
}

module.exports = formatters