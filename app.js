const grid = document.querySelectorAll(".drig");
const percentage = document.getElementById("grid-input");
const totalBill = document.getElementById("total-amount");
const alertText = document.querySelector(".alert");
const peopleNum = document.getElementById("number-of-people");
const tipValue = document.querySelector(".tip-value");
const totalValue = document.querySelector(".total-value");
const resetBtn = document.querySelector(".reset-btn");

const mainContainer = document.querySelector(".main-container");

mainContainer.addEventListener("input", function () {
  console.log("me");
});
// ==========TOTAL BILL ADJUSTEMENT FOR PROBABLE MISTAKE ======
totalBill.addEventListener("input", function () {
  blockTotalInput();
});

percentage.addEventListener("input", function () {
  if (percentage.value.length > 3 || percentage.value > 100) {
    percentage.value = "";
  }
});

// ========PEOPLE NUM ALERT ON INPUT =========
peopleNum.addEventListener("input", function () {
  alert();
});

//  alert function for people num to be > 0 and not a string cz we can put e
function alert() {
  if (peopleNum.value == 0) {
    alertText.style.opacity = 1;
    peopleNum.style.outlineColor = "red";
  } else if (peopleNum.value > 0) {
    alertText.style.opacity = 0;
    peopleNum.style.outlineColor = "transparent";
  }
}
function blockTotalInput() {
  if (totalBill.value == 0) {
    totalBill.value = "";
  }
}
