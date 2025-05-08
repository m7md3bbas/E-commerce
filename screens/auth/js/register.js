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
    const toggleIcons = document.querySelectorAll(".password-toggle");
    toggleIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            const targetId = icon.closest('.form-floating').querySelector('input').id;
            const input = document.getElementById(targetId);
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


    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Form validation
        if (!signupForm.checkValidity()) {
            signupForm.classList.add("was-validated");
            return;
        }

        // Email validation
        if (!emailInput.value.includes("@")) {
            alert("Please enter a valid email address.");
            return;
        }

        // Password match validation
        if (passwordInput.value !== confirmPasswordInput.value) {
            alert("Passwords do not match.");
            return;
        }

        // Check if email already exists
        if (getUsers().some(user => user.getEmail() === emailInput.value)) {
            alert("Email already exists.");
            return;
        }

        // Disable button and show loading state
        signupBtn.disabled = true;
        signupBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Loading...`;

        // Simulate API call delay
        setTimeout(() => {
            const users = getUsers();
            const id = users.length + 1;

            // Create new user (default type is "user")
            pushUser(
                id,
                nameInput.value,
                emailInput.value,
                passwordInput.value,
                null,  // phone
                null,  // address
                null,  // profileImage
                null,  // paymentMethod
                null,  // favorites
                null,  // cart
                null,  // orders
                isSellerInput.checked ? "seller" : "user", // type
            );

            // Get the newly created user and their backup code
            const newUser = getUsers().find(user => user.getId() === id);
            const backupCode = newUser.getBackupCode();

            // Show backup code to user
            alert(`Your backup code is: ${backupCode}\n\nPlease save this code somewhere safe. It will not be shown again.`);

            // Create downloadable backup code file
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

            // Redirect after successful registration
            setTimeout(() => {
                window.location.href = "./login.html";
            }, 1500);

        }, 2000);
    });
});