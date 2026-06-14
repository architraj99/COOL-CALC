const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let expression = "";

function updateDisplay(value){
    display.textContent = value || "0";
}

function currentValue(){
    return Number(expression || 0);
}

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.dataset.value;
        const action = button.dataset.action;

        if(value){
            expression += value;
            updateDisplay(expression);
            return;
        }

        if(action === "clear"){
            expression = "";
            updateDisplay("");
            return;
        }

        if(action === "delete"){
            expression = expression.slice(0,-1);
            updateDisplay(expression);
            return;
        }

        if(action === "pi"){
            expression += Math.PI.toFixed(8);
            updateDisplay(expression);
            return;
        }

        if(action === "e"){
            expression += Math.E.toFixed(8);
            updateDisplay(expression);
            return;
        }

        try{

            if(action === "sqrt"){
                expression = String(Math.sqrt(eval(expression)));
            }

            if(action === "square"){
                expression = String(Math.pow(eval(expression),2));
            }

            if(action === "log"){
                expression = String(Math.log10(eval(expression)));
            }

            if(action === "sin"){
                expression = String(Math.sin(eval(expression) * Math.PI / 180));
            }

            if(action === "cos"){
                expression = String(Math.cos(eval(expression) * Math.PI / 180));
            }

            if(action === "tan"){
                expression = String(Math.tan(eval(expression) * Math.PI / 180));
            }

            if(action === "equals"){
                expression = String(eval(expression));
            }

            updateDisplay(expression);
        }
        catch{
            updateDisplay("Error");
            expression = "";
        }

    });

}); 