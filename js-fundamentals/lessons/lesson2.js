// Concatination and Interpolation
var price = 50
var itemName = "Cup"

var messageToPrint1 = "The price for your " + itemName + " is " + price + " dollars" // concatination
console.log(messageToPrint1)

var messageToPrint2 = `The price for your ${itemName} is ${price} dollars` // interpolation
console.log(messageToPrint2)