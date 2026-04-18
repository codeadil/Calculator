const display = document.getElementById('display');

// Append numbers or operators to the display
function appendToDisplay(input) {
    display.value += input;
}

// Clear the entire display
function clearDisplay() {
    display.value = "";
}

// Delete the last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Calculate the result
function calculate() {
    try {
        // eval() evaluates the string as a mathematical expression
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Error";
        setTimeout(clearDisplay, 1500);
    }
}

// KEYBOARD SUPPORT
document.addEventListener('keydown', (event) => {
    const key = event.key;
    const allowedKeys = '0123456789+-*/.';

    if (allowedKeys.includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});

// PASTE SUPPORT
document.addEventListener('paste', (event) => {
    const pasteData = (event.clipboardData || window.clipboardData).getData('text');
    // Allow only numbers and basic operators to be pasted
    if (/^[0-9+\-*/.]+$/.test(pasteData)) {
        display.value += pasteData;
    }
});