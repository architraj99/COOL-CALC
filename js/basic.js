const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

const historyList = document.getElementById("history-list");
const themeToggle = document.getElementById("theme-toggle");

let expression = "";

function updateDisplay(value){
    display.textContent = value || "0";
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

        if(action === "percent"){

            try{
                expression = String(eval(expression) / 100);
                updateDisplay(expression);

            }catch{
                updateDisplay("Error");
                expression = "";
            }
            return;
        }

        if(action === "sqrt"){

            try{
                expression = String(Math.sqrt(eval(expression)));
                updateDisplay(expression);

            }catch{
                updateDisplay("Error");
                expression = "";
            }
            return;
        }

        if(action === "equals"){

            try{
                const answer = eval(expression);

                addHistory( `${expression} = ${answer}` );

                expression = String(answer);
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

    const allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        ".", "+", "-", "*", "/"
    ];

    if(allowedKeys.includes(key)){

        expression += key;
        updateDisplay(expression);
    }

    if(key === "Enter"){

        try{
            const answer = eval(expression);
            addHistory( `${expression} = ${answer}` );
            expression = String(answer);
            updateDisplay(expression);

        }
        catch{
            updateDisplay("Error");
            expression = "";
        }
    }

    if(key === "Backspace"){

        expression = expression.slice(0,-1);
        updateDisplay(expression);
    }

    if(key === "Escape"){

        expression = "";
        updateDisplay("");
    }

});

function addHistory(item){

    let history = JSON.parse(localStorage.getItem("basicHistory")) || [];

    history.unshift(item);
    history = history.slice(0,5);

    localStorage.setItem("basicHistory", JSON.stringify(history));
    renderHistory();
}

function renderHistory(){

    const history = JSON.parse(localStorage.getItem("basicHistory")) || [];
    historyList.innerHTML = "";

    if(history.length === 0){

        historyList.innerHTML = "<li>No history yet</li>";
        return;
    }

    history.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;

        historyList.appendChild(li);
    });

}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");
    localStorage.setItem("basicTheme", document.body.classList.contains("light-mode"));
});

if(localStorage.getItem("basicTheme") === "true"){
    document.body.classList.add("light-mode");
}

renderHistory();