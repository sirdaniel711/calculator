// JavaScript calculator version 1.3
// By: sirdaniel711
// Linked files: index.html, styles.css
// To do:
// Improve the layout of the code and make it more readable
// Maybe add a decimal and negative/positive button
// Add the ability for repeated "=" clicks to reapply the current operation
// Add support for scientific/exponential notation, along with an exponential button
// Needs more testing with negative numbers
// And more

const DIGIT_LIMIT = 15;
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
                if((`${currentNumber}`).length < DIGIT_LIMIT) {
                    currentNumber = (currentNumber * 10) + 1;
                    output.innerText = currentNumber;
                }
            }
            break;
        case "2":
            if (currentNumber === 0) {
                currentNumber = 2;
                output.innerText = 2;
            }
            else {
                if((`${currentNumber}`).length < DIGIT_LIMIT) {
                    currentNumber = (currentNumber * 10) + 2;
                    output.innerText = currentNumber;
                }
            }
            break;
        case "3":
            if (currentNumber === 0) {
                currentNumber = 3;
                output.innerText = 3;
            }
            else {
                if((`${currentNumber}`).length < DIGIT_LIMIT) {
                    currentNumber = (currentNumber * 10) + 3;
                    output.innerText = currentNumber;
                }
            }
            break;
        case "4":
            if (currentNumber === 0) {
                currentNumber = 4;
                output.innerText = 4;
            }
            else {
                if((`${currentNumber}`).length < DIGIT_LIMIT) {
                    currentNumber = (currentNumber * 10) + 4;
                    output.innerText = currentNumber;
                }
            }
            break;
        case "5":
            if (currentNumber === 0) {
                currentNumber = 5;
                output.innerText = 5;
            }
            else {
                if((`${currentNumber}`).length < DIGIT_LIMIT) {
                    currentNumber = (currentNumber * 10) + 5;
                    output.innerText = currentNumber;
                }
            }
            break;
        case "6":
            if (currentNumber === 0) {
                currentNumber = 6;
                output.innerText = 6;
            }
            else {
                if((`${currentNumber}`).length < DIGIT_LIMIT) {
                    currentNumber = (currentNumber * 10) + 6;
                    output.innerText = currentNumber;
                }
            }
            break;
        case "7":
            if (currentNumber === 0) {
                currentNumber = 7;
                output.innerText = 7;
            }
            else {
                if((`${currentNumber}`).length < DIGIT_LIMIT) {
                    currentNumber = (currentNumber * 10) + 7;
                    output.innerText = currentNumber;
                }
            }
            break;
        case "8": 
            if (currentNumber === 0) {
                currentNumber = 8;
                output.innerText = 8;
            }
            else {
                if((`${currentNumber}`).length < DIGIT_LIMIT) {
                    currentNumber = (currentNumber * 10) + 8;
                    output.innerText = currentNumber;
                }
            }
            break;
        case "9":
            if (currentNumber === 0) {
                currentNumber = 9;
                output.innerText = 9;
            }
            else {
                if((`${currentNumber}`).length < DIGIT_LIMIT) {
                    currentNumber = (currentNumber * 10) + 9;
                    output.innerText = currentNumber;
                }
            }
            break;
        case "0":
            if (currentNumber !== 0) {
                if((`${currentNumber}`).length < DIGIT_LIMIT) {
                    currentNumber = currentNumber * 10;
                    output.innerText = currentNumber;
                }
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
                if ((`${savedNumber}`).length > DIGIT_LIMIT && ((`${savedNumber}`).indexOf(`.`) < 1 || (`${savedNumber}`).indexOf(`.`) >= DIGIT_LIMIT)) {
                    displayOverflow();
                } else {
                    if ((`${savedNumber}`).length > DIGIT_LIMIT) {
                        if ((`${savedNumber}`).indexOf(`.`) >= 1 && (`${savedNumber}`).indexOf(`.`) < DIGIT_LIMIT) {
                            savedNumber = parseFloat(savedNumber.toPrecision(DIGIT_LIMIT - 1));
                        } else {
                            savedNumber = parseFloat(savedNumber.toPrecision(DIGIT_LIMIT));
                        }
                    }
                    currentNumber = 0;
                    operator = "+";
                    output.innerText = savedNumber;
                    output2.innerText = "+";
                }
            } else {
                if (operator !== "") {
                    operator = "+";
                    output2.innerText = "+";
                }
            }
            break;
        case "-":
            if (currentNumber !== 0) {
                savedNumber = perform();
                if ((`${savedNumber}`).length > DIGIT_LIMIT && ((`${savedNumber}`).indexOf(`.`) < 1 || (`${savedNumber}`).indexOf(`.`) >= DIGIT_LIMIT)) {
                    displayOverflow();
                } else {
                    if ((`${savedNumber}`).length > DIGIT_LIMIT) {
                        if ((`${savedNumber}`).indexOf(`.`) >= 1 && (`${savedNumber}`).indexOf(`.`) < DIGIT_LIMIT) {
                            savedNumber = parseFloat(savedNumber.toPrecision(DIGIT_LIMIT - 1));
                        } else {
                            savedNumber = parseFloat(savedNumber.toPrecision(DIGIT_LIMIT));
                        }
                    }
                    currentNumber = 0;
                    operator = "-";
                    output.innerText = savedNumber;
                    output2.innerText = "-";
                }
            } else {
                if (operator !== "") {
                    operator = "-";
                    output2.innerText = "-";
                }
            }
            break;
        case "×":
            if (currentNumber !== 0) {
                savedNumber = perform();
                if ((`${savedNumber}`).length > DIGIT_LIMIT && ((`${savedNumber}`).indexOf(`.`) < 1 || (`${savedNumber}`).indexOf(`.`) >= DIGIT_LIMIT)) {
                    displayOverflow();
                } else {
                    if ((`${savedNumber}`).length > DIGIT_LIMIT) {
                        if ((`${savedNumber}`).indexOf(`.`) >= 1 && (`${savedNumber}`).indexOf(`.`) < DIGIT_LIMIT) {
                            savedNumber = parseFloat(savedNumber.toPrecision(DIGIT_LIMIT - 1));
                        } else {
                            savedNumber = parseFloat(savedNumber.toPrecision(DIGIT_LIMIT));
                        }
                    }
                    currentNumber = 0;
                    operator = "*";
                    output.innerText = savedNumber;
                    output2.innerText = "×";
                }
            } else {
                if (operator !== "") {
                    operator = "*";
                    output2.innerText = "×";
                }
            }
            break;
        case "÷":
            if (currentNumber !== 0) {
                savedNumber = perform();
                if ((`${savedNumber}`).length > DIGIT_LIMIT && ((`${savedNumber}`).indexOf(`.`) < 1 || (`${savedNumber}`).indexOf(`.`) >= DIGIT_LIMIT)) {
                    displayOverflow();
                } else {
                    if ((`${savedNumber}`).length > DIGIT_LIMIT) {
                        if ((`${savedNumber}`).indexOf(`.`) >= 1 && (`${savedNumber}`).indexOf(`.`) < DIGIT_LIMIT) {
                            savedNumber = parseFloat(savedNumber.toPrecision(DIGIT_LIMIT - 1));
                        } else {
                            savedNumber = parseFloat(savedNumber.toPrecision(DIGIT_LIMIT));
                        }
                    }
                    currentNumber = 0;
                    operator = "/";
                    output.innerText = savedNumber;
                    output2.innerText = "÷";
                }
            } else {
                if (operator !== "") {
                    operator = "/";
                    output2.innerText = "÷";
                }
            }
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
                if ((`${currentNumber}`).length > DIGIT_LIMIT && ((`${currentNumber}`).indexOf(`.`) < 1 || (`${currentNumber}`).indexOf(`.`) >= DIGIT_LIMIT)) {
                    displayOverflow();
                } else {
                    if ((`${currentNumber}`).length > DIGIT_LIMIT) {
                        if ((`${currentNumber}`).indexOf(`.`) >= 1 && (`${currentNumber}`).indexOf(`.`) < DIGIT_LIMIT) {
                            currentNumber = parseFloat(currentNumber.toPrecision(DIGIT_LIMIT - 1));
                        } else {
                            currentNumber = parseFloat(currentNumber.toPrecision(DIGIT_LIMIT));
                        }
                    }
                    savedNumber = 0;
                    operator = "";
                    output.innerText = currentNumber;
                    output2.innerText = "";
                }
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
            result = savedNumber / currentNumber; // No need to worry about divide by 0 error here yet. Currently, this function will not be called unless currentNumber !== 0
            break;
        default:
            result = savedNumber + currentNumber; // Works for both case "+" and case ""
            break;
    }
    return result;
}

function displayOverflow() {
    currentNumber = 0;
    savedNumber = 0;
    operator = "";
    output.innerText = "*Overflow*";
    output2.innerText = "";
}

// Version 1.0
// *Initial version
// Version 1.1
// *Added a mini-display for the current operator
// Version 1.3
// *Added support for decimal numbers (still need to add a decimal button)
// *Added a limit to the number of digits to fit in the display (does not currently support scientific/exponential notation)