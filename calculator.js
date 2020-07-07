// JavaScript calculator version 1.8
// By: sirdaniel711
// Linked files: index.html, styles.css
// To do:
// Add support for scientific/exponential notation, along with an exponential button
// Improve some of the code efficiency
// Add some shortcuts (for example, pressing "6" then "x" then "=" would register as 6 x 6 = 36)
// And more
// Note: The modulus button is currently using the symbol normally used for a percentage button (%). Normally, the symbol for a modulus button is (mod).

const DIGIT_LIMIT = 15;
let screen = document.querySelector('.display');
let operatorScreen = document.querySelector('.display-operator');
let memoryScreen = document.querySelector('.display-memory');
let estimateScreen = document.querySelector('.display-estimate');
let currentNumber = "0";
let savedNumber = "0";
let currentOperator = "";
let equalsTrigger = false;
let operatorTrigger = false;
let estimateTrigger = false;
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
            clearFocus();
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
    clearFocus();
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
    if (equalsTrigger) {
        reset();
    }
    if (operatorTrigger) {
        operatorTrigger = false;
    }
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
            reset();
            break;
        case "←":
            let number = parseFloat(currentNumber);
            if (currentNumber !== "0") {
                if ((!currentNumber.includes(".") && number > -10 && number < 10) || (currentNumber === "0.") || (currentNumber === "-0.")) {
                    currentNumber = "0";
                } else {
                    currentNumber = currentNumber.substring(0, currentNumber.length - 1);
                }
                updateDisplay(currentNumber);
            }
            break;
        case ".":
            if (equalsTrigger) {
                reset();
            }
            if (operatorTrigger) {
                operatorTrigger = false;
            }
            if (currentNumber.length < DIGIT_LIMIT - 1 && !currentNumber.includes(".")) {
                currentNumber += ".";
                updateDisplay(currentNumber);
            }
            break;
        case "+/-":
            if (currentNumber !== "0") {
                if (currentNumber.includes("-")) {
                    currentNumber = currentNumber.substring(1, currentNumber.length);
                } else {
                    currentNumber = "-" + currentNumber;
                }
                updateDisplay(currentNumber);
            }
            break;
        case "=":
            if (currentOperator !== "" ) {
                if (operatorTrigger) {
                    operatorTrigger = false;
                }
                if (!equalsTrigger) {
                    let result = performOperation();
                    savedNumber = currentNumber;
                    currentNumber = result;
                    equalsTrigger = true;
                    updateOperatorDisplay("");
                    updateMemoryDisplay("");
                } else {
                    currentNumber = performOperation();
                    updateOperatorDisplay(currentOperator);
                    updateMemoryDisplay(savedNumber);
                }
                updateDisplay(currentNumber);
            }
            break;
        default: // default here means the case is an operator
            handleOperator(symbol);
            break;
    }
}

function handleOperator(operator) {
    if (operator === "+" || operator === "-" || operator === "×" || operator === "÷" || operator === "%") {
        if (operatorTrigger) {
            currentOperator = operator;
            updateOperatorDisplay(currentOperator);
        } else {
            if (equalsTrigger) {
                savedNumber = currentNumber;
                equalsTrigger = false;
            } else {
                savedNumber = performOperation();
            }
            currentNumber = "0";
            currentOperator = operator;
            operatorTrigger = true;
            updateDisplay(currentNumber);
            updateOperatorDisplay(currentOperator);
            updateMemoryDisplay(savedNumber);
        }
    }
}

function performOperation() {
    let result = "0";
    switch(currentOperator) {
        case "-":
            if (equalsTrigger) {
                result = (parseFloat(currentNumber) - parseFloat(savedNumber)).toString();
            } else {
                result = (parseFloat(savedNumber) - parseFloat(currentNumber)).toString();
            }
            break;
        case "×":
            result = (parseFloat(savedNumber) * parseFloat(currentNumber)).toString();
            break;
        case "÷":
            if (equalsTrigger) {
                if (parseFloat(savedNumber) == 0) {
                    result = "DivideByZero";
                } else {
                    result = (parseFloat(currentNumber) / parseFloat(savedNumber)).toString();
                }
            } else {
                if (parseFloat(currentNumber) == 0) {
                    result = "DivideByZero";
                } else {
                    result = (parseFloat(savedNumber) / parseFloat(currentNumber)).toString();
                }
            }
            break;
        case "%":
            if (equalsTrigger) {
                result = (parseFloat(currentNumber) % parseFloat(savedNumber)).toString();
            } else {
                result = (parseFloat(savedNumber) % parseFloat(currentNumber)).toString();
            }
            break;
        default:
            result = (parseFloat(savedNumber) + parseFloat(currentNumber)).toString();
            break;
    }
    return result;
}

function updateDisplay(numberToDisplay) {
    var currentDigitLimit;
    if (numberToDisplay.includes('-')) {
        currentDigitLimit = DIGIT_LIMIT + 1;
    } else {
        currentDigitLimit = DIGIT_LIMIT;
    }
    if (numberToDisplay.length > currentDigitLimit) {
        if (numberToDisplay.indexOf('.') >= currentDigitLimit || numberToDisplay.includes('e') || !numberToDisplay.includes('.')) {
            displayError("Overflow");
        } else {
            numberToDisplay = (numberToDisplay.substring(0, currentDigitLimit));
            screen.innerText = numberToDisplay;
            if (equalsTrigger) {
                currentNumber = numberToDisplay;
            } else {
                savedNumber = numberToDisplay;
            }
            estimateTrigger = true;
            updateEstimateDisplay();
        }
    } else if (numberToDisplay.includes("DivideByZero")) {
        displayError("DivideByZero");
    } else {
        screen.innerText = numberToDisplay;
    }
}

function updateOperatorDisplay(operator) {
    operatorScreen.innerText = operator;
}

function updateMemoryDisplay(numberToDisplay) {
    var currentDigitLimit;
    if (numberToDisplay.includes('-')) {
        currentDigitLimit = DIGIT_LIMIT + 1;
    } else {
        currentDigitLimit = DIGIT_LIMIT;
    }
    if (numberToDisplay.length > currentDigitLimit) {
        if (numberToDisplay.indexOf('.') >= currentDigitLimit || numberToDisplay.includes('e') || !numberToDisplay.includes('.')) {
            displayError("Overflow");
        } else {
            numberToDisplay = (numberToDisplay.substring(0, currentDigitLimit));
            memoryScreen.innerText = numberToDisplay;
            savedNumber = numberToDisplay;
            estimateTrigger = true;
            updateEstimateDisplay();
        }
    } else if (numberToDisplay.includes("DivideByZero")) {
        displayError("DivideByZero");
    } else {
        memoryScreen.innerText = numberToDisplay;
    }
}

function updateEstimateDisplay() {
    if (estimateTrigger) {
        estimateScreen.innerText = "~";
    } else {
        estimateScreen.innerText = "";
    }
}

function displayError(message) {
    currentNumber = "0";
    savedNumber = "0";
    currentOperator = "";
    operatorTrigger = false;
    equalsTrigger = false;
    estimateTrigger = false;
    screen.innerText = "*" + message + "*";
    operatorScreen.innerText = "";
    memoryScreen.innerText = "";
    estimateScreen.innerText = "";
}

function reset() {
    currentNumber = "0";
    savedNumber = "0";
    currentOperator = "";
    operatorTrigger = false;
    equalsTrigger = false;
    estimateTrigger = false;
    updateDisplay(currentNumber);
    updateOperatorDisplay(currentOperator);
    memoryScreen.innerText = "";
    updateEstimateDisplay();
}

function clearFocus() {
    let buttons = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "decimal", "toggle", "clear", "back", "add", "subtract", "multiply", "divide", "modulus", "equal"];
    for (let i = 0; i < buttons.length; i++) {
        document.querySelector('.' + buttons[i]).blur();
    }
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
// Version 1.6
// *Added a decimal button, modulus button, and toggle button for switching a number between positive/negative
// Version 1.7
// *Fixed a few errors where the backspace would not work properly
// *Updated the button layout
// Version 1.8
// *Added the ability for repeated "=" clicks to reapply the current operation
// *Added a display for the approximate symbol "~" to show whenever a number is estimated to 15 digits due to screen space limitations
// *Added a display for the number stored in memory
// *Fixed an issue where small decimal numbers were not rounding correctly to 15 digits
// *Fixed the issue with the buttons being in focus
