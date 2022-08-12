const grids = document.querySelectorAll(".grid");
const percentage = document.getElementById("grid-input");
const totalBill = document.getElementById("total-amount");
const alertText = document.querySelector(".alert");
const peopleNum = document.getElementById("number-of-people");
const tipValue = document.querySelector(".tip-value");
const totalValue = document.querySelector(".total-value");
const resetBtn = document.querySelector(".reset-btn");

const mainContainer = document.querySelector(".main-container");

// ===========grid click ,give class and activate calc function if all is true =======
grids.forEach(function (grid) {
  grid.addEventListener("click", function () {
    grids.forEach(function (item) {
      if (item !== grid) {
        item.classList.remove("grid-selected");
      }
      grid.classList.add("grid-selected");
      percentage.value = "";
      calcFunction();
    });
  });
});

// ================main container on any input change we want to activate the calc function also if the values are true we want to give reset btn in responsive class
mainContainer.addEventListener("input", function () {
  // ==========reset Btn activation============
  if (totalBill.value > 0 || percentage.value > 0 || peopleNum.value > 0) {
    resetBtn.classList.add("reset-btn-active");
  } else {
    resetBtn.classList.remove("reset-btn-active");
  }

  calcFunction();
});
// ==========TOTAL BILL ADJUSTEMENT FOR PROBABLE MISTAKE ======
totalBill.addEventListener("input", function () {
  blockTotalInput();
});

// ==========PERCENTAGE INPUT =============
percentage.addEventListener("input", function () {
  if (percentage.value.length > 3 || percentage.value > 100) {
    percentage.value = "";
  }
});

// ========PEOPLE NUM ALERT ON INPUT =========
peopleNum.addEventListener("input", function () {
  alert();
});

// ========reset btn ==================

resetBtn.addEventListener("click", function () {
  if (resetBtn.classList.contains("reset-btn-active")) {
    tipValue.textContent = `$0.00`;
    totalValue.textContent = `$0.00`;
    totalBill.value = "";
    peopleNum.value = "";
    percentage.value = "";
    grids.forEach(function (grid) {
      grid.classList.remove("grid-selected");
    });
    resetBtn.classList.remove("reset-btn-active");
    // calcFunction();
  }
});

//  alert function for people num to be > 0 and not a string cz we can put e
function alert() {
  if (peopleNum.value == 0) {
    alertText.style.opacity = 1;
    peopleNum.style.outlineColor = "red";
  } else if (peopleNum.value > 0) {
    alertText.style.opacity = 0;
    peopleNum.style.outlineColor = "var(--Strongcyan)";
  }
  setTimeout(() => {
    alertText.style.opacity = 0;
    peopleNum.style.outlineColor = "var(--Strongcyan)";
  }, 3000);
}

// ==============function to block total input in case value in not a number
function blockTotalInput() {
  if (totalBill.value == 0) {
    totalBill.value = "";
  }
}

// ==========round price function ===========
function roundPrice(rnum, rlength) {
  var newnumber =
    Math.ceil(rnum * Math.pow(10, rlength - 1)) / Math.pow(10, rlength - 1);
  var toTenths = newnumber.toFixed(rlength);
  return toTenths;
}

// ===========overall calc function =============
function calcFunction() {
  if (totalBill.value > 0 && peopleNum.value > 0) {
    let totalBillNumber = parseInt(totalBill.value);
    let peopleNumber = parseInt(peopleNum.value);

    grids.forEach(function (grid) {
      if (grid.classList.contains("grid-selected")) {
        let gridPercentage = parseInt(grid.id);
        let tipPerPerson =
          (totalBillNumber * gridPercentage) / 100 / peopleNumber;
        let totalPerPerson = totalBillNumber / peopleNumber + tipPerPerson;
        tipValue.textContent = `$${roundPrice(tipPerPerson, 2)}`;
        totalValue.textContent = `$${roundPrice(totalPerPerson, 2)}`;

        if (grid.id === "grid-input") {
          let tipPerPerson =
            (totalBillNumber * percentage.value) / 100 / peopleNumber;
          let totalPerPerson = totalBillNumber / peopleNum + tipPerPerson;
          totalValue.textContent = `$${roundPrice(totalPerPerson, 2)}`;
          tipValue.textContent = `$${roundPrice(tipPerPerson, 2)}`;
        }
      }
    });
  }
}
