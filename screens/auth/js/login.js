import { getUsers } from "../../../projectModules/usersModule.js";
localStorage.setItem("current_user", JSON.stringify(null));
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("form");
    const emailInput = document.getElementById("floatingEmail");
    const passwordInput = document.getElementById("floatingPassword");
    const loginBtn = document.querySelector("button[type='submit']");
    const toggleIcons = document.querySelectorAll(".password-toggle");

    // Password toggle functionality
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
        e.stopPropagation();

        // Bootstrap validation
        if (!loginForm.checkValidity()) {
            loginForm.classList.add('was-validated');
            return;
        }

        // Disable button and show loading state
        loginBtn.disabled = true;
        loginBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Logging in...`;

        // Simulate authentication delay
        setTimeout(() => {
            // Admin login check
            if (emailInput.value === "admin@gmail.com" && passwordInput.value === "admin123") {
                const currentUser = {
                    email: "admin@gmail.com",
                    password: "admin123",
                    type: "admin"
                };
                localStorage.setItem("current_user", JSON.stringify(currentUser));
                window.location.replace("./../home/Home_Page/index.html");
                return;
            }

            // Regular user authentication
            const users = getUsers();
            const user = users.find(
                u => u.getEmail() === emailInput.value &&
                    u.getPassword() === passwordInput.value
            );
            const currentUser = user;

            localStorage.setItem("current_user", JSON.stringify(currentUser));

            // Reset button state
            loginBtn.disabled = false;
            loginBtn.innerHTML = "Login";

            if (!user) {
                // Show error message as Bootstrap validation
                emailInput.classList.add('is-invalid');
                passwordInput.classList.add('is-invalid');
                const invalidFeedback = document.createElement('div');
                invalidFeedback.className = 'invalid-feedback d-block text-center mt-2';
                invalidFeedback.textContent = 'Invalid email or password.';

                // Remove any existing error message
                const existingError = loginForm.querySelector('.invalid-feedback.d-block');
                if (existingError) {
                    existingError.remove();
                }

                // Insert the error message after the login button
                loginBtn.insertAdjacentElement('afterend', invalidFeedback);
                return;
            }

            window.location.replace("./../home/Home_Page/index.html");

        }, 1500);
    });
});