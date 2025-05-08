import { getUsers } from "../../../projectModules/usersModule.js";
localStorage.setItem("current_user", JSON.stringify(null));
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("form");
    const emailInput = document.getElementById("floatingEmail");
    const passwordInput = document.getElementById("floatingPassword");
    const loginBtn = document.querySelector("button[type='submit']");
    const toggleIcons = document.querySelectorAll(".password-toggle");




    // Password toggle functionality
    toggleIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            const input = icon.closest('.form-floating').querySelector('input');
            const iconElement = icon.querySelector('i');

            if (input.type === "password") {
                input.type = "text";
                iconElement.classList.remove("fa-eye-slash");
                iconElement.classList.add("fa-eye");
            } else {
                input.type = "password";
                iconElement.classList.remove("fa-eye");
                iconElement.classList.add("fa-eye-slash");
            }
        });
    });

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Form validation
        if (!loginForm.checkValidity()) {
            loginForm.classList.add("was-validated");
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
                alert("Invalid email or password.");
                return;
            }


            window.location.replace("./../home/Home_Page/index.html");


        }, 1500);
    });
});