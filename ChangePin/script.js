document.querySelectorAll(".pin-input").forEach((input) => {
  input.addEventListener("input", validateInput);
});

function validateInput(e) {
  const el = e.target;
  if (el.value && !/^\d$/.test(el.value)) {
    el.value = "";
  }
}

const form = document.getElementById("form-pin");
const pinErrorMessage = document.getElementById("pin-error-message");
const loader = document.getElementById("loader");
const btnPin = document.getElementById("btn-pin");
const toast = document.getElementById("toast");

function handleForm(e) {
  e.preventDefault();
  console.log("masuk");

  const pin = Array.from(document.querySelectorAll(".pin-input"))
    .map((input) => input.value)
    .join("");

  pinErrorMessage.textContent = "";

  if (pin.length < 6) {
    pinErrorMessage.classList.add("d-visible");
    pinErrorMessage.classList.remove("d-invisible");
    pinErrorMessage.textContent = "Pin cannot be empty!";
    return;
  }

  const userActive = JSON.parse(localStorage.getItem("userActive"));
  let users = JSON.parse(localStorage.getItem("users"));
  const userIndex = users.findIndex(
    (existingUser) => existingUser.email === userActive.email
  );
  users[userIndex].pin = pin;

  userActive.pin = pin;
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("userActive", JSON.stringify(userActive));
  loader.classList.add("d-block");
  btnPin.classList.add("d-none");
  toast.textContent = "Change Pin Success !!";
  toast.classList.add("toast-succes", "display-visible");
  setTimeout(() => {
    location.href = "../Profile/index.html";
  }, 3000);
}

form.addEventListener("submit", handleForm);
