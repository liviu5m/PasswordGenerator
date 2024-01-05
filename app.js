const cats = {
  category1: [65, 90],
  category2: [97, 122],
  category3: [48, 57],
  category4: [
    [33, 47],
    [58, 64],
    [91, 96],
    [123, 126],
  ],
};

const passwordInput = document.querySelector(".password-input");
const rangeInput = document.querySelector(".range-input");
const increaseRange = document.querySelector(".increase-range");
const decreaseRange = document.querySelector(".decrease-range");
const reloadBtn = document.querySelector(".reload-btn");
const tag = document.querySelector(".tag");
const copyBtn = document.querySelector(".copy-btn");
const valueLength = document.querySelector(".value-length");
const categories = document.querySelectorAll(".category");
let pass = "";

window.addEventListener("load", (e) => {
  valueLength.textContent = rangeInput.value;
  generatePassword();
});

rangeInput.addEventListener("input", (e) => {
  valueLength.textContent = rangeInput.value;
  generatePassword();
  checkTag();
});

increaseRange.addEventListener("click", (e) => {
  e.preventDefault();
  if (rangeInput.value < 50) {
    rangeInput.value = parseFloat(rangeInput.value) + 1;
    valueLength.textContent = rangeInput.value;
  }
  generatePassword();
  checkTag();
});

decreaseRange.addEventListener("click", (e) => {
  e.preventDefault();
  if (rangeInput.value > 0) {
    rangeInput.value = parseFloat(rangeInput.value) - 1;
    valueLength.textContent = rangeInput.value;
  }
  generatePassword();
  checkTag();
});

categories.forEach((category) => {
  category.addEventListener("click", () => {
    generatePassword();
  });
});

function checkCategory(e) {
  
  var atLeastOneChecked = Array.prototype.slice.call(categories).some(function (checkbox) {
      return checkbox.checked;
  });
  if (!atLeastOneChecked) {
      e.target.checked = true;
  }
}

const checkTag = () => {
  tag.classList = [];
  tag.classList.add("tag");
  let value = "";
  if (rangeInput.value >= 1 && rangeInput.value <= 4) value = "Very Weak";
  else if (rangeInput.value >= 5 && rangeInput.value <= 7) value = "Weak";
  else if (rangeInput.value >= 8 && rangeInput.value <= 9) value = "Good";
  else if (rangeInput.value >= 10 && rangeInput.value <= 11) value = "Strong";
  else if (rangeInput) value = "Very Strong";

  switch (value) {
    case "Very Weak":
      tag.classList.add("very-weak");
      break;
    case "Weak":
      tag.classList.add("weak");
      break;
    case "Good":
      tag.classList.add("good");
      break;
    case "Strong":
      tag.classList.add("strong");
      break;
    case "Very Strong":
      tag.classList.add("very-strong");
      break;
  }

  tag.textContent = value;
};

const generatePassword = () => {
  let password = "";
  let categoriesValues = [];

  categories.forEach((category) => {
    if (category.checked) {
      categoriesValues.push(category.classList[1]);
    }
  });

  for (let i = 0; i < rangeInput.value; i++) {
    let category =
      cats[
        categoriesValues[Math.floor(Math.random() * categoriesValues.length)]
      ];
    if (category.length != 2) {
      let interval = category[Math.floor(Math.random() * category.length)];
      category = interval;
    }
    let char =
      Math.floor(Math.random() * (category[1] - category[0])) + category[0];
    password += String.fromCharCode(char);
  }
  pass = password;

  if (password.length > 30) {
    password = password.substring(0, 30) + "...";
  }
  passwordInput.value = password;
};

reloadBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", (e) => {
  let tempInput = document.createElement("input");
  tempInput.value = pass;
  document.body.appendChild(tempInput);

  tempInput.select();
  tempInput.setSelectionRange(0, 99999);

  document.execCommand("copy");

  document.body.removeChild(tempInput);
});
