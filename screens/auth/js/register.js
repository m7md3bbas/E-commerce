import {
    pushUser,
    getUsers,
} from "../../../projectModules/usersModule.js";

document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const nameInput = document.getElementById("floatingName");
    const emailInput = document.getElementById("floatingEmail");
    const passwordInput = document.getElementById("floatingPassword");
    const confirmPasswordInput = document.getElementById("floatingConfirmPassword");
    const signupBtn = document.querySelector("button[type='submit']");
    const isSellerInput = document.getElementById("sellerCheck");

    // Password toggle functionality
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
        e.stopPropagation();

        // Check if email already exists
        if (getUsers().some(user => user.getEmail() === emailInput.value)) {
            emailInput.setCustomValidity("Email already exists");
            emailInput.classList.add('is-invalid');
            return;
        } else {
            emailInput.setCustomValidity("");
            emailInput.classList.remove('is-invalid');
        }

        // Bootstrap validation
        if (!signupForm.checkValidity()) {
            signupForm.classList.add('was-validated');
            return;
        }

        // Disable button and show loading state
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

            const newUser = getUsers().find(user => user.getId() === id);
            const backupCode = newUser.getBackupCode();

            alert(`Your backup code is: ${backupCode}\n\nPlease save this code somewhere safe. It will not be shown again.`);

            const blob = new Blob(
                [`Your backup code is: ${backupCode}\n\nKeep this code safe. It can be used to recover your account.`],
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

            // Optional: reset form
            signupForm.reset();
            signupForm.classList.remove('was-validated');

            setTimeout(() => {
                window.location.href = "./login.html";
            }, 1500);
        }, 2000);
    });
});