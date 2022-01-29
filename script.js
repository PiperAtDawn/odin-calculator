const display = document.querySelector("#display-current");
const history = document.querySelector("#display-history");
const numbers = document.querySelectorAll(".number");
const dot = document.querySelector("#dot");
const operators = document.querySelectorAll(".operator");
const erase = document.querySelector("#erase");
const clear = document.querySelector("#clear");
const equals = document.querySelector("#equals");

const add = () => (+values[0] + +values[1]).toString();
const subtract = () => (+values[0] - +values[1]).toString();
const multiply = () => (Math.round(((values[0] * values[1]) * 10000)) / 10000).toString();
const divide = () => (Math.round((values[0] / values[1]) * 10000) / 10000).toString();

let values = ["", ""];
let operator = "";
let result = "";
let activeValue = 0;

const setActiveValue = (str, concat = false) => {
    if (concat) values[activeValue] += str;
    else values[activeValue] = str;
    display.textContent = values[activeValue];
};

const calculate = () => {
    switch (operator) {
        case "+":
            result = add();
            break;
        case "-":
            result = subtract();
            break;
        case "x":
            result = multiply();
            break;
        case "÷":
            if (+values[1] === 0) {
                eraseAll();
                alert("Nice try!");
                return false;
            }
            result = divide();
            break;
        default:
            alert("Error!");
    };
    history.textContent = `${values[0]} ${operator} ${values[1]}`;
    activeValue = 0;
    values[1] = "";
    setActiveValue(result);
    return true;
};

equals.addEventListener("click", () => {
    if (!values[0] || !values[1]) return;
    calculate();
    operator = "";
});

operators.forEach(op => {
    op.addEventListener("click", () => {
        if (!values[0]) return;
        if (values[1]) {
            if (calculate()) operator = op.textContent;
        }
        else {
            operator = op.textContent;
            history.textContent = `${values[0]} ${operator}`;
            activeValue = 1;
        };
    });
});

const eraseAll = () => {
    display.textContent = history.textContent = result = values[0] = values[1] = operator = "";
    activeValue = 0;
};

numbers.forEach(number => {
    number.addEventListener("click", () => {
        if (result && !operator) eraseAll();
        if (operator) activeValue = 1;
        setActiveValue(number.textContent, true);
    });
});

dot.addEventListener("click", () => {
    if (operator && !values[1]) {
        activeValue = 1;
        setActiveValue("0.");
    }
    if (display.textContent.includes(".")) return;
    if (result && !operator) eraseAll();
    if (!values[activeValue]) setActiveValue("0.");
    else setActiveValue(".", true);
});

clear.addEventListener("click", eraseAll);

erase.addEventListener("click", () => setActiveValue(values[activeValue].slice(0, -1)));

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        equals.dispatchEvent(new Event("click"));
        return;
    };
    const buttons = document.querySelectorAll(".button");
    buttons.forEach(button => {
        if (e.key === button.dataset.key) {
            button.dispatchEvent(new Event("click"));
            return;
        };
    });
});