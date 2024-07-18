const outputField = document.getElementById('output-field');
const calculationLog = document.getElementById('calculation-log');
const keys = document.querySelectorAll('button');

let currentInput = '';
let previousOperation = '';

keys.forEach(key => {
    key.addEventListener('click', (e) => {
        const keyValue = e.target.dataset.key;
        const displayText = e.target.innerText;

        if (keyValue === 'CLR') {
            currentInput = '';
            previousOperation = '';
            calculationLog.textContent = '';
            outputField.value = '';
        } else if (keyValue === '=') {
            try {
                previousOperation = currentInput + '=';
                calculationLog.textContent = previousOperation;
                currentInput = new Function('return ' + currentInput)().toString();
                outputField.value = currentInput;
            } catch (error) {
                outputField.value = 'Math Error';
                setTimeout(() => {
                    outputField.value = currentInput;
                }, 1500);
            }
        } else {
            currentInput += keyValue;
            outputField.value = currentInput;
        }

        key.classList.add('activated');
        setTimeout(() => {
            key.classList.remove('activated');
        }, 100);
    });
});

document.addEventListener('keydown', (e) => {
    const pressedKey = e.key;
    const keyButton = document.querySelector(`button[data-key="${pressedKey}"]`);
    if (keyButton) {
        keyButton.click();
    } else if (pressedKey === 'Enter') {
        document.querySelector('button[data-key="="]').click();
    } else if (pressedKey === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        outputField.value = currentInput;
    }
});