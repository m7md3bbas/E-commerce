import { getUsers } from "../../../projectModules/usersModule.js";

addEventListener("load", function () {
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginBtn = document.querySelector("button");
    const toggleIcons = document.querySelectorAll(".password-toggle");

    toggleIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            const input = document.getElementById(icon.dataset.target);
            if (input.type === "password") {
                input.type = "text";
                icon.textContent = "🙈";
            } else {
                input.type = "password";
                icon.textContent = "👁️";
            }
        });
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
            const users = getUsers();
            const user = users.find(
                (u) =>
                    u.getEmail() === emailInput.value &&
                    u.getPassword() === passwordInput.value
            );

            loginBtn.disabled = false;
            loginBtn.innerHTML = "Login";

            if (!user) {
                alert("Invalid email or password.");
                return;
            }

            window.location.href = "../../home/Home Page/index.html";
        }, 1500); 
    });
});
