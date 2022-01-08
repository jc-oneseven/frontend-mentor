// Ref. of Calculator Display
const outputDisplay = document.getElementById("js-display");

// Ref. of reset button
const btnReset = document.getElementById("js-btn-reset");

// Ref. of numbers and dot button
const btnNumbs = document.getElementsByClassName("js-btn-numbs");

// Ref. of operators
const btnOperators = document.getElementsByClassName("js-btn-operator");

// Ref. of equalTo button
const btnEqualTo = document.getElementById("js-btn-equalTo");

// Ref. of delete button
const btnDelete = document.getElementById("js-btn-del");

// Variable to handle actions
let valA = "";
let valB = "";
let operator = null;
let operations = [0, "", ""];
let isCalcReset = true;

// function to print on display
const displayToPrint = () => (outputDisplay.innerText = operations.join(" "));

// function to reset the calculator
const reset = () => {
  valA = "";
  valB = "";
  operator = null;
  isCalcReset = true;
  operations = [0, "", ""];
  displayToPrint();
};

reset();

// function to perform calculation
const calculation = () => {
  switch (operator) {
    case "+":
      valA = parseInt(valA) + parseInt(valB);
      break;
    case "-":
      valA = parseInt(valA) - parseInt(valB);
      break;
    case "x":
      valA = parseInt(valA) * parseInt(valB);
      break;
    case "/":
      if (parseInt(valB) === 0) {
        debugger;
        alert("Cannot divide by zero");
        return false;
      } else {
        valA = parseInt(valA) / parseInt(valB);
      }
      break;
  }
  return true;
};

// Reset calc on click of reset button
btnReset.addEventListener("click", () => {
  reset();
});

// Manage click of all the numbers on the calc
for (btnNum of btnNumbs) {
  btnNum.addEventListener("click", (e) => {
    // debugger;

    inputNumber = e.target.innerText;

    if (operator == null) {
      valA += inputNumber;
      operations[0] = parseInt(valA).toLocaleString();
    } else {
      valB += inputNumber;
      operations[2] = parseInt(valB).toLocaleString();
    }

    displayToPrint();

    isCalcReset = false;
  });
}

// Manage click of all the operators on the calc
for (btnOperator of btnOperators) {
  btnOperator.addEventListener("click", (e) => {
    if (!isCalcReset) {
      let inputOperator = e.target.innerText;
      operations[1] = inputOperator;

      if (valB == "") {
        displayToPrint();
      } else {
        calculation();

        operations[0] = parseInt(valA).toLocaleString();
        operations[1] = inputOperator;
        operations[2] = "";
        displayToPrint();

        // Reset the value of 2nd variable
        valB = "";
      }
      operator = inputOperator;
    }
  });
}

// Manage click of equalTo button
btnEqualTo.addEventListener("click", (e) => {
  if (!isCalcReset || valB != "") {
    calculation();
    operations[0] = parseInt(valA).toLocaleString();
    operations[1] = "";
    operations[2] = "";
    displayToPrint();
    operator = null;
    valB = "";
  }
});

// Manage click of delete button
btnDelete.addEventListener("click", (e) => {
  if (operator == null) {
    valA = valA.slice(0, -1);
    valA == "" ? reset() : (operations[0] = parseInt(valA).toLocaleString());
  } else if (valB == "") {
    operator = null;
    operations[1] = "";
  } else {
    valB = valB.slice(0, -1);
    valB == ""
      ? (operations[2] = "")
      : (operations[2] = parseInt(valB).toLocaleString());
  }

  displayToPrint();
});

// Manage themes

const [bodyElement] = document.getElementsByTagName("body");

const [themeDark, themeLight, themeCustom] = document.getElementsByClassName(
  "btn-theme-selections"
);

const changeTheme = (theme) => {
  let setTheme;
  switch (theme) {
    case "light":
      setTheme = themeLight;
      break;
    case "dark":
      setTheme = themeDark;
      break;

    default:
      setTheme = themeCustom;
      break;
  }
  bodyElement.className = `${theme}-theme`;
  setTheme.checked = true;
};

themeLight.addEventListener("change", function (e) {
  changeTheme("light");
});
themeDark.addEventListener("change", function (e) {
  changeTheme("dark");
});
themeCustom.addEventListener("change", function (e) {
  changeTheme("custom");
});

// System (OS) specific theme management
const userPrefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const userPrefersLight =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches;

if (userPrefersDark) {
  changeTheme("dark");
} else if (userPrefersLight) {
  changeTheme("light");
} else {
  changeTheme("custom");
}

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    debugger;
    const newColorScheme = event.matches ? "dark" : "light";
    console.log(newColorScheme);
    changeTheme(newColorScheme);
  });
