const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {  //add event listener to buttons
    button.addEventListener('click', () => toDisplay(button))
});

const display = document.querySelector('#answer');
let operation; //variable to save display content
const regexpOp = /(\+|-|\*|\/)/; //regular expression for +,-,*,/ operators
const regexpNum = /^[0-9]*$/; //regular exprression for numbers

function toDisplay(button) {  //adds the value of the button to the display
    if (button.value === 'C')
        display.value = '';
    else if (button.value === regexpNum || regexpOp) { //if any number or operator is pressed (except "=")
        display.value += button.value;
        operation = display.value.split(regexpOp); //makes an array of the display values,
                                                //separating the numbers with the operators 
                                                //& storing both (number & operator) in the array
    }
    else { //when the "=" button is pressed
        operation = operation.filter(n => n !== ''); //removes all spaces stored in array due to .split()    
        compute();
    }
}

// function compute() {
    // for (let i = 0; i < operation.length; i++) {
        // console.log(operation[i]);
    // }
// }
// const operator = document.querySelectorAll('.operator');

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b; 
}

function divide (a, b) {
    return a / b;
}

function operate (a, b, operator) {
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: return 'not a valid operator';
    }
}