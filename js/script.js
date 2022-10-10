const buttons = document.querySelectorAll('.button');

buttons.forEach(button => {  //add event listener to buttons
    button.addEventListener('click', () => toDisplay(button))
});

const display = document.querySelector('#answer');
let displayed; //variable to save displayed content
const regexOp = /(\+|\-|\*|\/)+/; //regular expression for +,-,*,/ operators
const regexNum = /^[0-9]+$/; //regular exprression for numbers

function toDisplay(button) {  //adds the value of the button to the display
    if (button.value === 'C') {
        display.value = '';
        displayed = display.value;
    }
    else if (button.value == "=") { //when the "=" button is pressed
        displayed = displayed.filter(n => n !== ''); //removes all spaces stored in array due to .split()    
        console.log(displayed);
        display.value = getOperations(displayed);
     }
    else if (button.value === regexNum || regexOp) { //if any number or operator is pressed (except "=")
        display.value += button.value;
        displayed = display.value.split(regexOp); //makes an array of the display values,
                                                //separating the numbers with the operators 
                                                //& storing both (number & operator) in the array
        console.log(displayed);
    }
}
 
let temp;

function getOperations(displayed) { //self note: i = 1 starts on operator (check try/catch if 1st button pressed is an operator)
    let numBeforeOp, numAfterOp, operator;
    for (let i = 1; i < displayed.length; i = i + 2) { //sweep wiht +2, so operator = displayed[i], always
        numBeforeOp = Number(displayed[i - 1]);  //convert to number
        numAfterOp = Number(displayed[i + 1]);
        operator = displayed[i];
        temp = operate(numBeforeOp, numAfterOp, operator); //store 1st operation result in 2nd operation, first operand
        displayed[i + 1] = temp;
    }
    return temp;
}

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