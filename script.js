const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let ops = ['+', '-', '÷', 'x'];
let firstNum = null;
let secondNum = null;
let operator = null;
let waitingForSecond = false;
let currentExpression = "";
function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(x, op, y) {
    if (!ops.includes(op)) {
        throw Error("Not a valid operation")
    }

    if (op == '+') {
        return add(x, y)
    } 
    else if (op == '-') {
        return subtract(x, y)
    } 
    else if (op == 'x') {
        return multiply(x, y)
    }
    else if (op == '/') {
        return divide(x, y)
    }

}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (button.id === "clear") {
            currentExpression = "";
            firstNum = null;
            operator = null;
            waitingForSecond = false;
            display.value = "";
        } 
        else if (button.id === "equals") {
            if (firstNum !== null && operator && waitingForSecond) {
                
                const parts = currentExpression.split(` ${operator} `);
                const secondNum = parseFloat(parts[1]);
                const result = operate(firstNum, operator, secondNum);
                display.value = currentExpression + " = " + result;
                currentExpression = "" + result;
                firstNum = result;
                operator = null;
                waitingForSecond = false;
            }
        } 
        else if (ops.includes(value)) {
            if (!waitingForSecond) {
                operator = value;
                firstNum = parseFloat(currentExpression);
                waitingForSecond = true;
                currentExpression += ` ${value} `;
                display.value = currentExpression;
            }
        } 
        else {
            currentExpression += value;
            display.value = currentExpression;
        }
    });
});


