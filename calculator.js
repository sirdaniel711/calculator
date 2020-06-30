// JavaScript calculator version 1.5
// By: sirdaniel711
// Linked files: index.html, styles.css
// To do:
// Maybe add a decimal and negative/positive button
// Add the ability for repeated "=" clicks to reapply the current operation
// Add support for scientific/exponential notation, along with an exponential button
// Needs more testing with negative numbers
// And more

const DIGIT_LIMIT = 15;
let screen = document.querySelector('.display');
let operatorScreen = document.querySelector('.display-operator');
let currentNumber = "0";
let savedNumber = "0";
let currentOperator = "";
document.querySelector('.calc').addEventListener('click', buttonListener);
document.addEventListener('keydown', convertKeyboardInput);

function convertKeyboardInput(event) {
    var request = event.key;
    switch(request) {
        case "Backspace":
            request = "←";
            break;
        case "*":
            request = "×";
            break;
        case "/":
            request = "÷";
            break;
        case "Enter":
            request = "=";
            break;
        case "c":
            request = "C";
            break;
    }
    if (isNaN(parseInt(request))) {
        handleSymbol(request);
    } else {
        handleNumber(request);
    }
}

function buttonListener(event) {
    if (event.target.tagName === 'BUTTON') {
        var request = event.target.innerText;
        if (isNaN(parseInt(request))) {
            handleSymbol(request);
        } else {
            handleNumber(request);
        }
    }
}

function handleNumber(digit) {
    if (currentNumber.length < DIGIT_LIMIT) {
        if (currentNumber === "0") {
            currentNumber = digit;
        } else {
            currentNumber += digit;
        }
        updateDisplay(currentNumber);
    }
}

function handleSymbol(symbol) {
    switch(symbol) {
        case "C":
            currentNumber = "0";
            savedNumber = "0";
            currentOperator = "";
            updateDisplay(currentNumber);
            updateOperatorDisplay();
            break;
        case "←":
            let number = parseFloat(currentNumber);
            if (currentNumber.length <= 2 && ((number > 0 && number < 10) || (number < 0 && number > -10))) {
                currentNumber = "0";
            } 
            if (currentNumber.length > 2 || number >= 10) {
                currentNumber = currentNumber.substring(0, currentNumber.length - 1);
            }
            updateDisplay(currentNumber);
            break;
        case "=":
            if (currentOperator !== "" ) {
                currentNumber = performOperation();
                savedNumber = "0";
                currentOperator = "";
                updateDisplay(currentNumber);
                updateOperatorDisplay();
            }
            break;
        default: // default here means the case is an operator
            handleOperator(symbol);
            break;
    }
}

function handleOperator(operator) {
    if (operator === "+" || operator === "-" || operator === "×" || operator === "÷") {
        if (parseFloat(currentNumber) !== 0) {
            savedNumber = performOperation();
            currentNumber = "0";
            currentOperator = operator;
            updateDisplay(savedNumber);
            updateOperatorDisplay();
        } else {
            if (currentOperator !== "") {
                currentOperator = operator;
                updateOperatorDisplay();
            }
        }
    }
}

function performOperation() {
    let result = "0";
    switch(currentOperator) {
        case "-":
            result = (parseFloat(savedNumber) - parseFloat(currentNumber)).toString();
            break;
        case "×":
            result = (parseFloat(savedNumber) * parseFloat(currentNumber)).toString();
            break;
        case "÷":
            if (parseFloat(currentNumber) == 0) {
                result = "DivideByZero";
            } else {
                result = (parseFloat(savedNumber) / parseFloat(currentNumber)).toString();
            }
            break;
        default:
            result = (parseFloat(savedNumber) + parseFloat(currentNumber)).toString();
            break;
    }
    return result;
}

function updateDisplay(numberToDisplay) {
    if (numberToDisplay.length >= DIGIT_LIMIT) {
        if (numberToDisplay.indexOf('.') >= DIGIT_LIMIT || numberToDisplay.includes('e') || !numberToDisplay.includes('.')) {
            displayError("Overflow");
        } else {
            numberToDisplay = (parseFloat(numberToDisplay).toPrecision(DIGIT_LIMIT - 1)).toString();
            screen.innerText = numberToDisplay;
            if (currentOperator === "") {
                currentNumber = numberToDisplay;
            } else {
                savedNumber = numberToDisplay;
            }
        }
    } else if (numberToDisplay.includes("DivideByZero")) {
        displayError("DivideByZero");
    } else {
        screen.innerText = numberToDisplay;
    }
}

function updateOperatorDisplay() {
    operatorScreen.innerText = currentOperator;
}

function displayError(message) {
    currentNumber = "0";
    savedNumber = "0";
    currentOperator = "";
    screen.innerText = "*" + message + "*";
    operatorScreen.innerText = "";
}

// Version 1.0
// *Initial version
// Version 1.1
// *Added a mini-display for the current operator
// Version 1.3
// *Added support for decimal numbers (still need to add a decimal button)
// *Added a limit to the number of digits to fit in the display (does not currently support scientific/exponential notation)
// Version 1.4
// *Added keyboard support as an input option
// Version 1.5
// *Improved the layout of the code to make it a little more readable and efficient
// *Added extra keyboard support for enter and lower case c
// *Fixed a few bugs, including:
//   -Dividing by 0 would cause the result to be infinity
//   -The overflow error message would not display for full numbers that are too large to fit on the display
//   -Hitting backspace or the back button on a decimal number would make it 0 instead of removing the last digit
