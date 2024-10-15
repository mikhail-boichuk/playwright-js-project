
var customerFirstName = "John" // implicit declaration of type
var customerLastName: string = "Smith" // explicit declaration of type
var customerAge: number = 25

// customerFirstName = 10 // cannot assign number to a string in TS

// Type declaration
type Customer = {firstName: string, lastName: string, active: boolean}

var firstCustomer: Customer = {
    firstName: "Mary",
    lastName: "Johns",
    active: true
}