// Declarative function
function helloOne() {
    console.log("Hello One!")
}

helloOne(); // will works anywhere in the script

// Anonymus function
var helloTwo = function() {
    console.log("Hello Two!")
}

helloTwo() // will work only after helloTwo variable declaration

//ES6 function syntax or arrow function
var helloThree = () => {
    console.log("Hello Three!")
}

helloThree(); // will work only after helloThree variable declaration

// Functions with argumants
function printName(name, lastName) {
    console.log(`${name} ${lastName}`)
}

printName("John", "Smith")

// Fuction with return
function multiplyByTwo(number) {
    var result = number * 2
    return result
}

console.log(multiplyByTwo(5))

// Import function
import { printAge } from '../helpers/printHelper.js'
printAge(5)

// Import everything
import * as helper from "../helpers/printHelper.js"
helper.printAge(10)