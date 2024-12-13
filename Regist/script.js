const inputMail = document.getElementById("input-mail");
const inputPassword = document.getElementById("input-password");
const confirmPassword = document.getElementById("input-confirm-password");
const mailErrorMessage = document.getElementById("mail-error-message");
const passwordErrorMessage = document.getElementById("password-error-message");
const form = document.getElementById("registration-form");
const btnRegist = document.getElementById("btn-regist");
const loader = document.getElementById("loader");
const toast = document.getElementById("toast");

function cekMail() {
  const regexMail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const emailValue = inputMail.value.trim();
  inputMail.classList.remove("input-error");
  mailErrorMessage.textContent = "";
  let isValid = true;
  if (emailValue === "") {
    inputMail.classList.add("input-error");
    mailErrorMessage.textContent = "Email cannot be empty!";
    return (isValid = false);
  }
  if (!regexMail.test(emailValue)) {
    inputMail.classList.add("input-error");
    mailErrorMessage.textContent = "Email Invalid!!";
    return (isValid = false);
  }
  inputMail.classList.add("input-valid");
  return isValid;
}

function cekPassword() {
  // value
  const passwordValue = inputPassword.value;
  const confirmPasswordValue = confirmPassword.value;
  // reset to default
  passwordErrorMessage.textContent = "";
  inputPassword.classList.remove("input-error");
  confirmPassword.classList.remove("input-error");
  let isValid = true;
  if (passwordValue === "" || confirmPasswordValue === "") {
    passwordErrorMessage.textContent = "password cannot be empty!";
    inputPassword.classList.add("input-error");
    confirmPassword.classList.add("input-error");
    return (isValid = false);
  }
  if (passwordValue !== confirmPasswordValue) {
    passwordErrorMessage.textContent = "Password Not Match";
    inputPassword.classList.add("input-error");
    confirmPassword.classList.add("input-error");
    return (isValid = false);
  }
  inputPassword.classList.add("input-valid");
  confirmPassword.classList.add("input-valid");
  return isValid;
}

function cekForm(e) {
  e.preventDefault();
  const isMailValid = cekMail();
  const isPasswordValid = cekPassword();

  if (isMailValid && isPasswordValid) {
    loader.classList.remove("display-invisible"); // Pastikan loader ditampilkan
    btnRegist.classList.add("display-invisible");
    loader.classList.add("display-visible");
    toast.classList.remove("display-invisible");
    toast.classList.add("display-visible");
    setTimeout(() => {
      location.href = "../EnterPin/index.html";
    }, 5000);
    return;
  }
}

form.addEventListener("submit", cekForm);
