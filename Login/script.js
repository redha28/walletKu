const inputMail = document.getElementById("input-mail");
const inputPassword = document.getElementById("input-password");
const mailErrorMessage = document.getElementById("mail-error-message");
const passwordErrorMessage = document.getElementById("password-error-message");
const form = document.getElementById("login-form");
const btnLogin = document.getElementById("btn-login");
const toast = document.getElementById("toast");
const loader = document.getElementById("loader");
const iconEye = document.getElementById("icon-eye");

function cekMail() {
  const regexMail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const emailValue = inputMail.value.trim();
  inputMail.classList.remove("input-error", "input-valid");
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
  const passwordValue = inputPassword.value.trim();
  inputPassword.classList.remove("input-error", "input-valid");
  passwordErrorMessage.textContent = "";
  let isValid = true;
  if (passwordValue === "") {
    inputPassword.classList.add("input-error");
    passwordErrorMessage.textContent = "password cannot be empty!";
    return (isValid = false);
  }
  inputPassword.classList.add("input-valid");
  return isValid;
}

function handleForm(e) {
  e.preventDefault();

  // Validasi form: cek apakah email dan password valid
  const isMailValid = cekMail();
  const isPasswordValid = cekPassword();

  if (isMailValid && isPasswordValid) {
    const formData = new FormData(form);
    const emailValue = formData.get("email");
    const passwordValue = formData.get("password");

    // Menyembunyikan tombol login dan menampilkan loader
    btnLogin.classList.add("display-invisible");
    loader.classList.remove("display-invisible");
    loader.classList.add("d-block");

    // Ambil data pengguna yang ada di localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userActive = JSON.parse(localStorage.getItem("userActive")) || [];
    // Cek apakah pengguna dengan email yang dimasukkan ada
    const user = users.find(
      (existingUser) => existingUser.email === emailValue
    );

    if (!user) {
      // Jika pengguna tidak ada
      setTimeout(() => {
        toast.textContent = "User does not exist!";
        btnLogin.classList.remove("display-invisible");
        inputMail.classList.remove("input-valid");
        inputMail.classList.add("input-error");
        toast.classList.add("toast-error", "display-visible");
        loader.classList.add("display-invisible");
        loader.classList.remove("d-block");
      }, 3000);

      setTimeout(() => {
        toast.classList.remove("toast-error", "display-visible");
      }, 5000);
      return;
    }

    // Cek apakah password sesuai dengan yang ada di database
    if (user.password !== passwordValue) {
      // Jika password tidak cocok
      setTimeout(() => {
        toast.textContent = "Incorrect Email / Password!";
        inputMail.classList.remove("input-valid");
        inputMail.classList.add("input-error");
        inputPassword.classList.remove("input-valid");
        inputPassword.classList.add("input-error");
        btnLogin.classList.remove("display-invisible");
        toast.classList.add("toast-error", "display-visible");
        loader.classList.add("display-invisible");
        loader.classList.remove("d-block");
      }, 3000);

      setTimeout(() => {
        toast.classList.remove("toast-error", "display-visible");
      }, 5000);
      return;
    }

    if (userActive) {
      localStorage.removeItem(userActive);
    }

    toast.textContent = "Login successful!";
    toast.classList.add("toast-succes", "display-visible");
    localStorage.setItem("userActive", JSON.stringify(user));

    setTimeout(() => {
      if (user.pin !== "") {
        location.href = "../DashBoard/index.html";
        return;
      }
      location.href = "../EnterPin/index.html";
    }, 5000);
  }
}

form.addEventListener("submit", handleForm);

function handleShowPassword() {
  if (iconEye.src == "http://127.0.0.1:5500/Login/images/eye-closed.webp") {
    inputPassword.type = "text";
    iconEye.src = "http://127.0.0.1:5500/Login/images/icon-eye.webp";
    return;
  }
  inputPassword.type = "password";
  iconEye.src = "http://127.0.0.1:5500/Login/images/eye-closed.webp";
}
