// Get elements from the DOM
const display = document.querySelector('.user-input');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let operator = '';
let previousInput = '';

// Function to update the display
function updateDisplay(value) {
    display.textContent = value;
}

// Function to clear the display and reset variables
function clearDisplay() {
    currentInput = '';
    operator = '';
    previousInput = '';
    updateDisplay('0');
}

// Function to handle calculation
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay(currentInput);
}

// Event listeners for all buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;

        if (button.classList.contains('operator')) {
            if (currentInput !== '') {
                if (previousInput !== '') {
                    calculate();
                }
                operator = value;
                previousInput = currentInput;
                currentInput = '';
            }
        } else if (button.classList.contains('equal-sign')) {
            calculate();
        } else if (button.classList.contains('clear-sign')) {
            clearDisplay();
        } else {
            if (value === '.' && currentInput.includes('.')) return;
            currentInput += value;
            updateDisplay(currentInput);
        }
    });
});

// Initialize the display
clearDisplay();

