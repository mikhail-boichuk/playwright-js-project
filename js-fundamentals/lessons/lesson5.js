// Logical "AND"
console.log(true && true) // all values have to be true for expression to be true
console.log(true && false) // all values have to be true for expression to be true

// Logical "OR"
console.log(true || true) // any value have to be true for expression to be true
console.log(true || false) // any value have to be true for expression to be true
console.log(false || false) // any value have to be true for expression to be true

var ageIsMoreThanEighteen = true
var isUSCitizen = true

var eligibilityForDriverLicense = ageIsMoreThanEighteen && isUSCitizen
console.log('This customer is eligible for DL: ' + eligibilityForDriverLicense)

// Logical "NOT"
console.log(!true)
console.log(6 != 10)