// Objects
var customer = {
    firstName: "John",
    lastName: "Smith",
    cars: ["Volvo", "Toyota", "Tesla"] // array inside object
}

console.log(customer)

// Dot notation
customer.firstName = "Mike"

// Bracket Notation
customer['lastName'] = "Silver"

console.log(customer.firstName)
console.log(customer['lastName'])
console.log(`${customer.firstName} ${customer.lastName}`)

// Arrays
var cars = ["Volvo", "Toyota", "Tesla"]

cars[1] = "BMW"

console.log(cars[0])
console.log(cars[1])
console.log(customer.cars[2])