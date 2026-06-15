const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const calculateBtn = document.getElementById("calculate-btn");
const bmiValue = document.getElementById("bmi-value");
const bmiStatus = document.getElementById("bmi-status");

calculateBtn.addEventListener("click", () => {

    const height = Number(heightInput.value);
    const weight = Number(weightInput.value);

    if(!height || !weight){

        bmiValue.textContent = "--";
        bmiStatus.textContent = "Please fill all fields";
        return;
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    bmiValue.textContent = bmi.toFixed(1);

    if(bmi < 18.5){
        bmiStatus.textContent = "Underweight";
    }

    else if(bmi < 25){
        bmiStatus.textContent = "Healthy Weight";
    }

    else if(bmi < 30){
        bmiStatus.textContent = "Overweight";
    }

    else{
        bmiStatus.textContent = "Obese";
    }

});