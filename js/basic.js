const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let expression = "";

function updateDisplay(value) {
    display.textContent = value || "0";
}

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.dataset.value;
        const action = button.dataset.action;

        if(value) {
            expression += value;
            updateDisplay(expression);
            return;
        }

        if(action === "clear") {
            expression = "";
            updateDisplay(expression);
            return;
        }

        if(action === "delete") {
            expression = expression.slice(0, -1);
            updateDisplay(expression);
            return;
        }

        if(action === "percent") {

            try{
                expression = String(eval(expression) / 100);
                updateDisplay(expression);
            }
            catch{
                updateDisplay("Error");
                expression = "";
            }
            return;
        }

        if(action === "sqrt") {

            try{
                expression = String(Math.sqrt(eval(expression)));
                updateDisplay(expression);
            }
            catch{
                updateDisplay("Error");
                expression = "";
            }
            return;
        }

        if(action === "equals") {

            try{
                expression = String(eval(expression));
                updateDisplay(expression);
            }
            catch{
                updateDisplay("Error");
                expression = "";
            }
            return;
        }

    });
});

document.addEventListener("keydown", event => {

    const key = event.key;

    const allowedKeys = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        ".", "+", "-", "*", "/"
    ];

    if(allowedKeys.includes(key)) {

        expression += key;
        updateDisplay(expression);
    }

    if(key === "Enter") {

        try{
            expression = String(eval(expression));
            updateDisplay(expression);
        }
        catch{
            updateDisplay("Error");
            expression = "";
        }
    }

    if(key === "Backspace") {

        expression = expression.slice(0, -1);
        updateDisplay(expression);
    }

    if(key === "Escape") {

        expression = "";
        updateDisplay(expression);
    }

});