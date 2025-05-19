import { pushUser, getUsers } from "../../../projectModules/usersModule.js";

document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");
  const nameInput = document.getElementById("floatingName");
  const emailInput = document.getElementById("floatingEmail");
  const passwordInput = document.getElementById("floatingPassword");
  const confirmPasswordInput = document.getElementById(
    "floatingConfirmPassword"
  );
  const signupBtn = document.querySelector("button[type='submit']");
  const isSellerInput = document.getElementById("sellerCheck");
  const showPassword = document.getElementById("showPasswordCheck");

  showPassword.addEventListener("change", () => {
    if (showPassword.checked) {
      passwordInput.type = "text";
      confirmPasswordInput.type = "text";
    } else {
      passwordInput.type = "password";
      confirmPasswordInput.type = "password";
    }
  });

  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!signupForm.checkValidity()) {
      signupForm.classList.add("was-validated");
      return;
    }
    if (nameInput.value.match(/[^a-zA-Z\s]/)) {
      showToast("Name can only contain letters and spaces", 'error');
      return;
    }
    if (getUsers().some((user) => user.getEmail() === emailInput.value)) {
      showToast("Email already exists", 'error');
      return;
    }
    if (passwordInput.value !== confirmPasswordInput.value) {
      showToast("Passwords do not match", 'error');
      return;
    }


    signupBtn.disabled = true;
    signupBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Loading...`;

    setTimeout(() => {
      const users = getUsers();
      const id = users.length + 1;

      pushUser(
        id,
        nameInput.value,
        emailInput.value,
        passwordInput.value,
        null,
        null,
        null,
        null,
        null,
        null,
        isSellerInput.checked ? "seller" : "user"
      );

      const newUser = getUsers().find((user) => user.getId() === id);
      const backupCode = newUser.getBackupCode();
      showToast(
        `
        Your account has been created
        Your backup code is: ${backupCode}\n\nPlease save this code somewhere safe. It will not be shown again.`,
        "success"
      );

      const blob = new Blob(
        [
          `Your backup code is: ${backupCode}\n\nKeep this code safe. It can be used to recover your account.`,
        ],
        { type: "text/plain" }
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `BackupCode-${nameInput.value}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      signupForm.reset();
      signupForm.classList.remove("was-validated");

      setTimeout(() => {
        window.location.href = "./login.html";
      }, 1500);
    }, 2000);
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

    // Auto-remove after 5 seconds
    setTimeout(() => {
      const toast = document.querySelector('.toast.show');
      if (toast) {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 200);
      }
    }, 5000);
  }
});
