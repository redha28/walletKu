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
  inputPassword.classList.remove("input-error", "input-valid");
  confirmPassword.classList.remove("input-error", "input-valid");
  let isValid = true;
  if (passwordValue === "" || confirmPasswordValue === "") {
    passwordErrorMessage.textContent = "password cannot be empty!";
    inputPassword.classList.add("input-error");
    confirmPassword.classList.add("input-error");
    return (isValid = false);
  }
  console.log(passwordValue.length);
  if (passwordValue.length < 4 || confirmPasswordValue.length < 4) {
    passwordErrorMessage.textContent = "Password minimum 4 characters";
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
  const formData = new FormData(form);
  const emailValue = formData.get("email");
  const passwordValue = formData.get("password");
  // Mendapatkan data yang sudah ada di localStorage (jika ada) kalau tidak ada mendapatkan array kosong
  if (isMailValid && isPasswordValid) {
    btnRegist.classList.add("display-invisible");
    loader.classList.remove("display-invisible");
    loader.classList.add("d-block");
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some(
      (existingUser) => existingUser.email === emailValue
    );
    if (userExists) {
      setTimeout(() => {
        toast.textContent = "email already exists!";
        btnRegist.classList.remove("display-invisible");
        inputMail.classList.remove("input-valid");
        inputMail.classList.add("input-error");
        toast.classList.add("toast-error", "display-visible");
        loader.classList.add("display-invisible");
      }, 3000);
      setTimeout(() => {
        toast.classList.remove("toast-error", "display-visible");
      }, 5000);
      return;
    }
    const user = {
      email: emailValue,
      password: passwordValue,
    };
    users.push(user);
    // Menyimpan array users ke dalam localStorage
    localStorage.setItem("users", JSON.stringify(users));

    toast.textContent = "Sign Up Success";
    toast.classList.add("toast-succes", "display-visible");
    setTimeout(() => {
      location.href = "../Login/login.html";
    }, 5000);
    return;
  }
}

form.addEventListener("submit", cekForm);
