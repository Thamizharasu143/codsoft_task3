
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');

let currentInput = '';
let previousInput = '';
let operator = '';
let activeOperatorButton = null; // To keep track of the active operator button

// Handle button clicks
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    if (button.classList.contains('operator')) {
      // Handle operator button
      if (currentInput === '') return; // Prevent setting operator without first input
      if (previousInput !== '') calculate(); // If there's already an input, calculate first

      operator = value;
      previousInput = currentInput;
      currentInput = '';

      // Highlight the active operator button
      if (activeOperatorButton) activeOperatorButton.classList.remove('active'); // Remove highlight from the previous button
      activeOperatorButton = button; // Set the new active operator button
      activeOperatorButton.classList.add('active');
    } else {
      // Handle numbers and decimal
      currentInput += value;
      updateDisplay();
    }
  });
});

// Handle clear button
clearButton.addEventListener('click', () => {
  currentInput = '';
  previousInput = '';
  operator = '';

  // Remove operator highlight
  if (activeOperatorButton) activeOperatorButton.classList.remove('active');
  activeOperatorButton = null;

  updateDisplay();
});

// Handle equals button
equalsButton.addEventListener('click', () => {
  if (currentInput === '' || previousInput === '') return;

  calculate();

  // Remove operator highlight after calculation
  if (activeOperatorButton) activeOperatorButton.classList.remove('active');
  activeOperatorButton = null;

  operator = '';
  updateDisplay();
});

// Update the display
function updateDisplay() {
  display.textContent = currentInput || previousInput || '0';
}

// Perform calculation
function calculate() {
  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);

  if (isNaN(num1) || isNaN(num2)) return;

  switch (operator) {
    case '+':
      currentInput = (num1 + num2).toString();
      break;
    case '-':
      currentInput = (num1 - num2).toString();
      break;
    case '*':
      currentInput = (num1 * num2).toString();
      break;
    case '/':
      currentInput = num2 !== 0 ? (num1 / num2).toString() : 'Error';
      break;
  }

  previousInput = '';
}
