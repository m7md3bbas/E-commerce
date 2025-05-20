import { getUsers } from "../../../projectModules/usersModule.js";
localStorage.setItem("current_user", JSON.stringify(null));
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector("form");
  const emailInput = document.getElementById("floatingEmail");
  const passwordInput = document.getElementById("floatingPassword");
  const loginBtn = document.querySelector("button[type='submit']");
  const toggleIcons = document.querySelectorAll(".password-toggle");

  const showPassword = document.getElementById("showPasswordCheck");

  showPassword.addEventListener("change", () => {
    if (showPassword.checked) {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  });

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!loginForm.checkValidity()) {
      loginForm.classList.add("was-validated");
      return;
    }

    loginBtn.disabled = true;
    loginBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Logging in...`;

    setTimeout(() => {
      // Admin login check
      if (
        emailInput.value === "admin@gmail.com" &&
        passwordInput.value === "admin123"
      ) {
        const currentUser = {
          email: "admin@gmail.com",
          password: "admin123",
          type: "admin",
        };
        localStorage.setItem("current_user", JSON.stringify(currentUser));
        window.location.replace("./../home/Home_Page/index.html");
        return;
      }

      const users = getUsers();
      const user = users.find(
        (u) =>
          u.getEmail() === emailInput.value &&
          u.getPassword() === passwordInput.value
      );
      const currentUser = user;

      localStorage.setItem("current_user", JSON.stringify(currentUser));

      loginBtn.disabled = false;
      loginBtn.innerHTML = "Login";

      if (!user) {
        showToast("Invalid email or password", "error");

        return;
      }

      window.location.replace("./../home/Home_Page/index.html");
    }, 1500);
  });

  function showToast(message, type = 'success') {
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    const bgColor = type === 'success' ? 'd4edda' : 'f8d7da';
    const borderColor = type === 'success' ? '28a745' : 'dc3545';
    const textColor = type === 'success' ? '155724' : '721c24';

    const toastHTML = `
        <div class="position-fixed top-0 start-50 translate-middle-x p-3" style="z-index: 1060; width: 100%; max-width: 500px;">
            <div class="toast show align-items-center border-0" role="alert" aria-live="assertive" aria-atomic="true" style="background-color: rgba(255, 255, 255, 0.95); box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <div class="d-flex">
                    <div class="toast-body d-flex align-items-center" style="color: #${textColor}; background-color: #${bgColor}; border-left: 4px solid #${borderColor}; padding: 1rem;">
                        <i class="fas ${icon} me-2" style="color: #${borderColor};"></i>
                        ${message}
                    </div>
                   </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', toastHTML);

    setTimeout(() => {
        const toast = document.querySelector('.toast.show');
        if (toast) {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }
    }, 5000);
}
});
