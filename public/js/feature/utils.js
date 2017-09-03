function cashRegisterEffect (oldValue, newValue, displayNode) {
  var counter = oldValue > newValue ? -20 : 20
  var timer = setInterval(function () {
    var absDiff = Math.abs(oldValue - newValue)
    var absCounter = Math.abs(counter)
    var valueToDisplay = oldValue

    if (absDiff <= absCounter){
      clearInterval(timer)
      valueToDisplay = newValue
    }

    displayNode.html(valueToDisplay)
    oldValue += counter
  },0)
}

module.exports = { cashRegisterEffect: cashRegisterEffect }