document.querySelectorAll(".pin-input").forEach((input) => {
  input.addEventListener("input", validateInput);
});
const pinErrorMessage = document.getElementById("pin-error-message");
const form = document.getElementById("form-pin");
const loader = document.getElementById("loader");
const btnPin = document.getElementById("btn-pin");

function validateInput(e) {
  const el = e.target;
  if (el.value && !/^\d$/.test(el.value)) {
    el.value = "";
  }
}

function savePinToLocalStorage(e) {
  e.preventDefault(); // Mencegah form dikirim sebelum selesai proses

  // Ambil nilai PIN dari input
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
  // Ambil data userActive dari localStorage (atau buat jika belum ada)
  const userActive = JSON.parse(localStorage.getItem("userActive"));
  let users = JSON.parse(localStorage.getItem("users"));
  const userIndex = users.findIndex(
    (existingUser) => existingUser.email === userActive.email
  );
  users[userIndex].pin = pin;

  localStorage.setItem("users", JSON.stringify(users));
  userActive.pin = pin;
  localStorage.setItem("userActive", JSON.stringify(userActive));

  loader.classList.add("d-block");
  btnPin.classList.add("d-none");
  setTimeout(() => {
    location.href = "../DashBoard/index.html";
  }, 3000);
}

form.addEventListener("submit", savePinToLocalStorage);
