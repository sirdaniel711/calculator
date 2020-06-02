// JavaScript calculator version 1.1
// By: sirdaniel711
// Linked files: index.html, styles.css
// Note: Does not currently support decimal numbers, only whole numbers for now
// Note: Could add a limit to the number of digits (maybe 16)
// To do:
// Improve the layout of the code and make it more readable
// Put a limit to the number of digits
// Maybe add a decimal and negative/positive button, as well as adding support for decimal numbers
// And more

const button = document.querySelector('.button');
let output = document.querySelector('.display');
let output2 = document.querySelector('.display-operator');
let currentNumber = 0;
let savedNumber = 0;
let operator = "";
document.querySelector('.calc').addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
        switch(event.target.innerText) {
        case "1":
            if (currentNumber === 0) {
                currentNumber = 1;
                output.innerText = 1;
            }
            else {
                currentNumber = (currentNumber * 10) + 1;
                output.innerText = currentNumber;
            }
            break;
        case "2":
            if (currentNumber === 0) {
                currentNumber = 2;
                output.innerText = 2;
            }
            else {
                currentNumber = (currentNumber * 10) + 2;
                output.innerText = currentNumber;
            }
            break;
        case "3":
            if (currentNumber === 0) {
                currentNumber = 3;
                output.innerText = 3;
            }
            else {
                currentNumber = (currentNumber * 10) + 3;
                output.innerText = currentNumber;
            }
            break;
        case "4":
            if (currentNumber === 0) {
                currentNumber = 4;
                output.innerText = 4;
            }
            else {
                currentNumber = (currentNumber * 10) + 4;
                output.innerText = currentNumber;
            }
            break;
        case "5":
            if (currentNumber === 0) {
                currentNumber = 5;
                output.innerText = 5;
            }
            else {
                currentNumber = (currentNumber * 10) + 5;
                output.innerText = currentNumber;
            }
            break;
        case "6":
            if (currentNumber === 0) {
                currentNumber = 6;
                output.innerText = 6;
            }
            else {
                currentNumber = (currentNumber * 10) + 6;
                output.innerText = currentNumber;
            }
            break;
        case "7":
            if (currentNumber === 0) {
                currentNumber = 7;
                output.innerText = 7;
            }
            else {
                currentNumber = (currentNumber * 10) + 7;
                output.innerText = currentNumber;
            }
            break;
        case "8": 
            if (currentNumber === 0) {
                currentNumber = 8;
                output.innerText = 8;
            }
            else {
                currentNumber = (currentNumber * 10) + 8;
                output.innerText = currentNumber;
            }
            break;
        case "9":
            if (currentNumber === 0) {
                currentNumber = 9;
                output.innerText = 9;
            }
            else {
                currentNumber = (currentNumber * 10) + 9;
                output.innerText = currentNumber;
            }
            break;
        case "0":
            if (currentNumber !== 0) {
                currentNumber = currentNumber * 10;
                output.innerText = currentNumber;
            }
            break;
        case "C":
            currentNumber = 0;
            savedNumber = 0;
            operator = "";
            output.innerText = 0;
            output2.innerText = "";
            break;
        case "+":
            if (currentNumber !== 0) {
                savedNumber = perform();
                currentNumber = 0;
                operator = "+";
                output.innerText = savedNumber;
            } else {
                if (operator !== "") {
                    operator = "+";
                }  
            }
            output2.innerText = "+";
            break;
        case "-":
            if (currentNumber !== 0) {
                savedNumber = perform();
                currentNumber = 0;
                operator = "-";
            } else {
                if (operator !== "") {
                    operator = "-";
                }
            }
            output2.innerText = "-";
            break;
        case "×":
            if (currentNumber !== 0) {
                savedNumber = perform();
                currentNumber = 0;
                operator = "*";
            } else {
                if (operator !== "") {
                    operator = "*";
                }
            }
            output2.innerText = "×";
            break;
        case "÷":
            if (currentNumber !== 0) {
                savedNumber = perform();
                currentNumber = 0;
                operator = "/";
            } else {
                if (operator !== "") {
                    operator = "/";
                }
            }
            output2.innerText = "÷";
            break;
        case "←":
            if ((currentNumber > 0 && currentNumber < 10) || (currentNumber < 0 && currentNumber > -10)) {
                currentNumber = 0;
                output.innerText = currentNumber;
            }
            if (currentNumber > 9 || currentNumber < -9) {
                currentNumber = Math.floor(currentNumber / 10);
                output.innerText = currentNumber;
            }
            break;
        default: // case "="
            if (operator !== "") {
                currentNumber = perform();
                savedNumber = 0;
                operator = "";
                output.innerText = currentNumber;
                output2.innerText = "";
            }
            break;
        }
    }
});

function perform() {
    let result = 0;
    switch(operator) {
        case "-":
            result = savedNumber - currentNumber;
            break;
        case "*":
            result = savedNumber * currentNumber;
            break;
        case "/":
            result = Math.floor(savedNumber / currentNumber); // No need to worry about divide by 0 error here yet. Currently, this function will not be called unless currentNumber !== 0
            break;
        default:
            result = savedNumber + currentNumber; // Works for both case "+" and case ""
            break;
    }
    return result;
}

// Version 1.0
// *Initial version
// Version 1.1
// *Added a mini-display for the current operator