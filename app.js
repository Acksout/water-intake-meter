// Get DOM elements
const waterIntakeInput = document.getElementById("water-intake-input");
const intakeAmount = document.getElementById("intake-amount");
const intakeProgress = document.getElementById("intake-progress");
const submitBottleSize = document.getElementById("submit-bottle-size");
const plusBtn = document.getElementById("plus-btn");
const resetBtn = document.getElementById("reset-btn");

// Initialize variables
let userBottleSize;
let currentIntake = parseInt(localStorage.getItem("currentIntake"), 10) || 0;

// Update UI with current intake
const updateUI = () => {
  if (intakeProgress)
    intakeProgress.innerText = `You've consumed: ${currentIntake}ml`; // Update h1 element
};
updateUI();

// Handle bottle size input
waterIntakeInput.addEventListener("input", () => {
  userBottleSize = parseInt(waterIntakeInput.value, 10);
  if (isNaN(userBottleSize) || userBottleSize <= 0) {
    userBottleSize = undefined;
    console.warn("Invalid bottle size input.");
  } else {
    console.log(userBottleSize);
  }
});

// Save bottle size
submitBottleSize.addEventListener("click", () => {
  if (userBottleSize !== undefined) {
    localStorage.setItem("bottleSize", userBottleSize);
    console.log("Bottle size saved:", userBottleSize);
  } else {
    console.warn("Bottle size is invalid and not saved.");
  }
});

// Update intake amount
const updateIntakeAmount = () => {
  const bottleSize = parseInt(localStorage.getItem("bottleSize"), 10);
  if (!isNaN(bottleSize) && bottleSize > 0) {
    currentIntake += bottleSize;
    localStorage.setItem("currentIntake", currentIntake);
    updateUI();
  } else {
    console.warn("Bottle size is invalid or not set.");
  }
};

// Reset intake
const resetIntake = () => {
  localStorage.setItem("currentIntake", 0);
  window.location.reload();
};

// Event listeners
resetBtn.addEventListener("click", resetIntake);
plusBtn.addEventListener("click", updateIntakeAmount);
