# JavaScript Calculator Project (version 1.7)

This is a JavaScript calculator project for the Frontend Masters course [Intro to Web Development](https://bthold.github.io/intro-to-web-dev-v2/).

**[Try the calculator here](https://sirdaniel711.github.io/calculator/)**

## To-Do List:
- Add the ability for repeated "=" clicks to reapply the current operation
- Add support for scientific/exponential notation, along with an exponential button
- Currently, the enter key on a keyboard is set to register as "=". However, if a button on the calculator is in focus, then this will also cause that button to trigger. Currently, the user needs to make sure none of the calculator's buttons are in focus before hitting the enter key. Need to look into this more.

## Updates:
- Version 1.7
    * Fixed a few errors where the backspace would not work properly 
    * Updated the button layout
- Version 1.6
    * Added a decimal button, modulus button, and toggle button for switching a number between positive/negative
- Version 1.5
    * Improved the layout of the code to make it a little more readable and efficient
    * Added extra keyboard support for enter and lower case c
    * Fixed a few bugs, including:
        - Dividing by 0 would cause the result to be infinity
        - The overflow message would not display for full numbers that are too large to fit on the display
        - Hitting backspace or the back button on a decimal number would make it 0 isntead of removing the last digit
- Version 1.4
    * Added keyboard support as an input option
- Version 1.3
    * Added support for decimal numbers (still need to add a decimal button)
    * Added a limit to the number of digits to fit in the display (does not currently support scientific/exponential notation)
- Version 1.1
    * Added a mini-display for the current operator
- Version 1.0
    * Initial version

