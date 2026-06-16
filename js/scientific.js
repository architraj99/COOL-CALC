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

        try{

            if(action === "pi"){
                expression += Math.PI.toFixed(8);
            }

            else if(action === "e"){
                expression += Math.E.toFixed(8);
            }

            else if(action === "sqrt"){
                expression = String(Math.sqrt(eval(expression)));
            }

            else if(action === "square"){
                expression = String(Math.pow(eval(expression),2));
            }

            else if(action === "log"){
                expression = String(Math.log10(eval(expression)));
            }

            else if(action === "sin"){
                expression = String(Math.sin(eval(expression) * Math.PI / 180));
            }

            else if(action === "cos"){
                expression = String(Math.cos(eval(expression) * Math.PI / 180));
            }

            else if(action === "tan"){
                expression = String(Math.tan(eval(expression) * Math.PI / 180));
            }

            else if(action === "equals"){

                const answer = eval(expression);

                addHistory( `${expression} = ${answer}` );
                expression = String(answer);
            }
            updateDisplay(expression);
        }
        catch{
            updateDisplay("Error");
            expression = "";
        }
    });

});

function addHistory(item){

    let history = JSON.parse(localStorage.getItem("scientificHistory")) || [];
    history.unshift(item);
    history = history.slice(0,5);
    localStorage.setItem("scientificHistory", JSON.stringify(history));

    renderHistory();
}

function renderHistory(){

    const history = JSON.parse(localStorage.getItem("scientificHistory")) || [];

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
    localStorage.setItem("scientificTheme", document.body.classList.contains("light-mode"));
});

if(localStorage.getItem("scientificTheme") === "true"){
    document.body.classList.add("light-mode");
}

renderHistory();