document.querySelectorAll(".pin-input").forEach((input) => {
  input.addEventListener("input", validateInput);
});

function validateInput(e) {
  const el = e.target;
  if (el.value && !/^\d$/.test(el.value)) {
    el.value = "";
  }
}

const modalBackground = document.querySelector("#modalBackground");
const btnSubmit = document.getElementById("btn-submit");
const modal = document.getElementById("modal");
const form = document.getElementById("form-pin");
const pinErrorMessage = document.getElementById("pin-error-message");
const loader = document.getElementById("loader");
const btnPin = document.getElementById("btn-pin");

function handleSubmit() {
  modalBackground.classList.remove("d-none");
}

function handleBackgroundModal(e) {
  if (e.target === modalBackground) {
    modalBackground.classList.add("d-none");
  }
}

function handleModal(e) {
  e.stopPropagation();
}

function handleForm(e) {
  e.preventDefault();

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
  loader.classList.add("d-block");
  btnPin.classList.add("d-none");

  if (userActive.pin !== pin) {
    modalBackground.addEventListener("click", () => {
      modalBackground.classList.remove("d-none");
    });
    setTimeout(() => {
      loader.classList.remove("d-block");
      btnPin.classList.remove("d-none");
      pinErrorMessage.classList.add("d-visible");
      pinErrorMessage.classList.remove("d-invisible");
      pinErrorMessage.textContent = "Incorrect Pin";
    }, 3000);
    return;
  }

  setTimeout(() => {
    modal.innerHTML = ` <h4>TRANSFER TO RAULEMONS</h4>
    <div>
    <img src="./images/icon-succes.webp" alt="" />
    </div>
    <p class="text-bold">
    Yeay Transfer <span class="text-green">Success</span>
                </p>
                <p class="text-secondary" style="font-weight: 500; text-align: center">
                Thank you for using this application for your financial
                </p>
                <div style="width: 100%">
                  <button
                    class="btn-done"
                    onclick="location='../DashBoard/index.html'">
                    Done
                  </button>
                  <button
                    class="btn-again"
                    onclick="location='../Transaction/index.html'">
                    Transfer Again
                  </button>`;
  }, 3000);
}

btnSubmit.addEventListener("click", handleSubmit);

modalBackground.addEventListener("click", handleBackgroundModal);

modal.addEventListener("click", handleModal);

form.addEventListener("submit", handleForm);
