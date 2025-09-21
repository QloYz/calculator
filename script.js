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
            currentResult = null;
            operator = null;
            display.value = "";
        } 
        else if (ops.includes(value)) {
            if (currentExpression === "" && currentResult === null) return;


            if (operator !== null && currentResult !== null) {
                const parts = currentExpression.split(` ${operator} `);
                const secondNum = parseFloat(parts[1]);
                currentResult = operate(currentResult, operator, secondNum);
                currentExpression = currentResult + ` ${value} `;
            } else {
                currentResult = parseFloat(currentExpression);
                currentExpression += ` ${value} `;
            }

            operator = value;
            display.value = currentExpression;
        } 
        else if (button.id === "equals") {
            if (operator !== null && currentResult !== null) {
                const parts = currentExpression.split(` ${operator} `);
                const secondNum = parseFloat(parts[1]);
                currentResult = operate(currentResult, operator, secondNum);
                display.value = currentExpression + " = " + currentResult;
                currentExpression = "" + currentResult;
                operator = null;
            }
        } 
        else {
            currentExpression += value;
            display.value = currentExpression;
        }
    });
});


