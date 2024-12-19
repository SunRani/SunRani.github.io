document.addEventListener("click", handleClick);
var display = "";
function handleClick(event) {
  const value = event.target.textContent;
  switch (value) {
    case "=":
      calculate();
      break;
    case "AC":
      clearDisplay();
      break;
    default:
      updateDisplay(value);
  }
}

function updateDisplay(value) {
  var expression = value;
  if (expression.length == 1) {
    document.getElementById("eval").textContent += expression;
    display += expression;
    document.getElementById("eval").textContent = document
      .getElementById("eval")
      .textContent.replace(/(\.\d*)\./g, "$1");
    document.getElementById("eval").textContent = document
      .getElementById("eval")
      .textContent.replace(/0{2,}/g, "0");
    display = display.replace(/(\.\d*)\./g, "$1");
    display = display.replace(/0{2,}/g, "0");

    if (expression == "+") {
      document.getElementById("display").textContent = "+";
      display = "";
    } else if (expression == "-") {
      document.getElementById("display").textContent = "-";
      display = "";
    } else if (expression == "*") {
      document.getElementById("display").textContent = "*";
      display = "";
    } else if (expression == "/") {
      document.getElementById("display").textContent = "/";
      display = "";
    } else {
      document.getElementById("display").textContent = display;
    }
  }
}

function calculate() {
  console.log(document.getElementById("eval").textContent);
  if (document.getElementById("eval").innerHTML == "&nbsp;") {
    clearDisplay();
  } else {
    document.getElementById("eval").innerHTML = document
      .getElementById("eval")
      .innerHTML.replace(/&nbsp;/g, "");
    const expression = document.getElementById("eval").textContent;
    var result = safeEval(expression);

    if (result !== null) {
      document.getElementById("display").textContent = result;
      document.getElementById("eval").textContent = result;
    }
  }
}

function clearDisplay() {
  document.getElementById("eval").innerHTML = "&nbsp;";
  document.getElementById("display").textContent = 0;
  display = "";
}

function safeEval(expression) {
  try {
    const mathRegex = /^(-?\d+(\.\d+)?(\s*[+\-*/]\s*-?\d+(\.\d+)?\s*)*)*$/;
    if (mathRegex.test(expression) === true) {
      return eval(expression);
    } else {
      var string = "";
      const digit = /^\d+(\.\d+)?$/;
      const operator = /^[+\-*/]$/;
      var one = 0;
      var two = 0;
      for (let i = 0; i < expression.length; i++) {
        if (!digit.test(expression[i])) {
          one = i;
          break;
        }
      }

      string += expression.substring(0, one);
      for (let i = one; i < expression.length; i++) {
        if (digit.test(expression[i])) {
          two = i;
          break;
        }
      }
      if (operator.test(expression[two - 1])) {
        string += expression.substring(two - 1);
      }
      console.log(string);
      return eval(string);
    }
  } catch (error) {
    return null;
  }
}
