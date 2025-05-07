import {
    pushUser,
    getUsers,
} from "../../../projectModules/usersModule.js";



addEventListener("load", function () {
    const signupForm = document.getElementById("signupForm");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const isSeller = document.getElementById("isSeller");
    const loginBtn = document.querySelector("button");

    let type = "user";
    const toggleIcons = document.querySelectorAll(".password-toggle");
    toggleIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            const input = document.getElementById(icon.dataset.target);
            if (input.type === "password") {
                input.type = "text";
                icon.innerHTML = '<i class="fa-solid fs-5 fa-eye-slash"></i>';
            } else {
                input.type = "password";
                icon.innerHTML = '<i class="fa-solid fs-5 fa-eye"></i>';
            }
        });
    });

    isSeller.addEventListener("change", () => {
        type = isSeller.checked ? "seller" : "user";
    });

    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        
        if (!signupForm.checkValidity()) {
            signupForm.classList.add("was-validated");
            return;
        }

        if(email.value.includes("@gmail.com"))
        if (password.value !== confirmPassword.value) {
            alert("Passwords do not match.");
            return;
        }

        if (getUsers().some(user => user.getEmail() === email.value)) {
            alert("Email already exists.");
            return;
        }

        loginBtn.disabled = true;
        loginBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Loading...`;

        setTimeout(() => {
            const users = getUsers();
            const id = users.length + 1;

            pushUser(
                id,
                name.value,
                email.value,
                password.value,
                null,
                null,
                null,
                null,
                null,
                null,
                null
                ,
                type
            );

            const newUser = getUsers().find(user => user.getId() === id);
            const backupCode = newUser.getBackupCode();

            // Show backup code in an alert or modal
            alert(`Your backup code is: ${backupCode}\n\nPlease save this code somewhere safe. It will not be shown again.`);

            // Create downloadable file
            const blob = new Blob(
                [`Your backup code is: ${backupCode}\n\nKeep this code safe. It can be used to recover your account.`],
                { type: "text/plain" }
            );
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `BackupCode-${name.value}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            alert("Registration successful! Redirecting to the home page...");

            setTimeout(() => {
                loginBtn.disabled = false;
                loginBtn.innerHTML = "Register";
                window.location.href="./login.html";
            }, 1500);

        }, 2000);

    });
});
