"use strict";

/*DOM elemnts and event listeners*/

var inputScreen = document.getElementById("operations-display");
var resultScreen = document.getElementById("result-display");
var buttonsContainer = document
  .getElementById("buttons-container")
  .addEventListener("click", handleImput);

window.addEventListener("load", clearcache);

/*functions*/
function clearcache() {
  localStorage.setItem("Results", JSON.stringify([]));
}

function handleImput(e) {
  var buttonPressed = e.target.innerText;
  //exit if is not a button
  if (buttonPressed.length > 3) {
    return;
  }

  //handle buttons
  if (buttonPressed.match(/[0-9]/)) {
    if (inputScreen.value === "0") {
      inputScreen.value = buttonPressed;
    } else {
      inputScreen.value += buttonPressed;
    }
  } else if (buttonPressed === "=") {
    Calculator.update(inputScreen.value);
    resultScreen.value = Calculator.calculate();
    inputScreen.value = "0";
    ChacheStorage.update(Calculator.calculate());
  } else if (buttonPressed.match(/[+×÷−]/)) {
    Calculator.update(buttonPressed);
    Calculator.update(inputScreen.value);
    inputScreen.value = "0";
  } else if (buttonPressed.match(/C/)) {
    inputScreen.value = "0";
    Calculator.reset();
    resultScreen.value = "";
  } else if (buttonPressed.match(/CE/)) {
    inputScreen.value = "0";
    resultScreen.value = "";
    localStorage.setItem("Results", JSON.stringify([]));
  } else if (buttonPressed.match(/DEL/)) {
    if (inputScreen.value)
      return (inputScreen.value = inputScreen.value.slice(0, -1));
  }
}

//calculator object
var Calculator = {
  operation: "",
  value1: 0,
  value2: 0,

  sum: function () {
    return this.value1 + this.value2;
  },
  substract: function () {
    return this.value1 - this.value2;
  },
  multiply: function () {
    return this.value1 * this.value2;
  },
  divide: function () {
    return this.value1 / this.value2;
  },
  reset: function () {
    this.operation = "";
    this.value1 = 0;
    this.value2 = 0;
  },
  update: function (input) {
    if (input.match(/[+×÷−]/)) {
      this.operation = input;
    } else {
      if (!this.value1) {
        this.value1 = new Number(input);
      } else {
        this.value2 = new Number(input);
      }
    }
  },
  calculate: function () {
    var result;
    if (this.operation === "÷") {
      result = this.divide();
    } else if (this.operation === "−") {
      result = this.substract();
    } else if (this.operation === "×") {
      result = this.multiply();
    } else {
      result = this.sum();
    }
    return result;
  },
};

//localStorage handler
var ChacheStorage = {
  update: function (value) {
    var results = JSON.parse(localStorage.getItem("Results"));
    results.push(value);
    localStorage.setItem("Results", JSON.stringify(results));
  },
};
