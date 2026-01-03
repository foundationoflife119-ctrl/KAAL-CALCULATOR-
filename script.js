/* Landing → Auto Open Calculator */

setTimeout(() => {

  document.getElementById("landing").style.display = "none";

  document.getElementById("app").classList.remove("hidden");

}, 1800);

/* Calculator Logic */

const result = document.getElementById("result");

const history = document.getElementById("history");

const buttons = document.querySelectorAll("button");

let current = "";

let previous = "";

let operator = null;

function updateDisplay() {

  result.textContent = current || "0";

  history.textContent = previous + (operator || "");

}

function calculate() {

  let a = parseFloat(previous);

  let b = parseFloat(current);

  if (isNaN(a) || isNaN(b)) return;

  switch (operator) {

    case "+": current = (a + b).toString(); break;

    case "−": current = (a - b).toString(); break;

    case "×": current = (a * b).toString(); break;

    case "÷": current = b === 0 ? "Error" : (a / b).toString(); break;

  }

  operator = null;

  previous = "";

}

buttons.forEach(btn => {

  btn.onclick = () => {

    const value = btn.textContent;

    if (!isNaN(value) || value === ".") {

      if (value === "." && current.includes(".")) return;

      current += value;

    }

    else if (value === "AC") {

      current = ""; previous = ""; operator = null;

    }

    else if (value === "DEL") {

      current = current.slice(0, -1);

    }

    else if (value === "%") {

      current = (parseFloat(current) / 100).toString();

    }

    else if (value === "=") {

      calculate();

    }

    else {

      if (current === "") return;

      if (previous !== "") calculate();

      operator = value;

      previous = current;

      current = "";

    }

    updateDisplay();

  };

});

updateDisplay();