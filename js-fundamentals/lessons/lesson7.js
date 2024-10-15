// Loops

// for (statement1; statement2; statement3) {

// }

for (let i = 0; i < 5; i++) {
    console.log("Hello World! " + i)
}

var cars = ["Volvo", "Toyota", "Tesla"]

// ES5 syntax for each
for (let car of cars) {
    console.log(car) 
    if (car == "Toyota") {
        break
    }
}

//ES6 syntax for each
cars.forEach(car => {
    console.log(car) 
})