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
        if (handleErrors()) return;
        displayed = displayed.filter(n => n !== ''); //removes all spaces stored in array due to .split()    
        display.value = getOperations(displayed);
     }
    else if (button.value === regexNum || regexOp) { //if any number or operator is pressed (except "=")
        display.value += button.value;
        displayed = display.value.split(regexOp); //makes an array of the display values,
                                                //separating the numbers with the operators 
                                                //& storing both (number & operator) in the array
        if (handleErrors()) return;
    }
}
 
let result;

function getOperations(displayed) { //self note: i = 1 starts on operator (check try/catch if 1st button pressed is an operator)
    let numBeforeOp, numAfterOp, operator;
    for (let i = 1; i < displayed.length; i = i + 2) { //sweep wiht +2, so operator = displayed[i], always
        numBeforeOp = Number(displayed[i - 1]);  //convert to number
        numAfterOp = Number(displayed[i + 1]);
        operator = displayed[i];
        result = operate(numBeforeOp, numAfterOp, operator);
        result = result.toFixed(3); //convert result to string with 3 decimals
        displayed[i + 1] = result; //store 1st operation result in 2nd operation, first operand
    }
    return result;
}

function handleErrors() { //checks if '=' button (displayed===undefined) or if an operator (displayed[0]==='') were 1st clicked
                          //Note: because of display.value.split(regexOp), if an operator its 1st clicked, displayed becomes
                          //      displayed = ['', operator, '']
    if ((displayed === undefined || displayed[0] === '')) {
        console.log('Please clear and enter a valid operation');
        return true; //theres been an error
    }
    else return false; //the operation is valid
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