// Update the import statement to include updateUserPassword
import { getUsers, getUserByEmail, updateUser, updateUserPassword } from "../../../projectModules/usersModule.js";

const forgotPasswordForm = document.getElementById("forgotPasswordForm");
const backupCodeModal = new bootstrap.Modal(document.getElementById('backupCodeModal'));
const newPasswordModal = new bootstrap.Modal(document.getElementById('newPasswordModal'));
const verifyBackupCodeBtn = document.getElementById("verifyBackupCode");
const updatePasswordBtn = document.getElementById("updatePassword");

let currentUser = null;
let emailAttempts = 0;
const MAX_ATTEMPTS = 3;

document.addEventListener("DOMContentLoaded", () => {
    forgotPasswordForm.addEventListener("submit", handleEmailSubmission);
    verifyBackupCodeBtn.addEventListener("click", verifyBackupCode);
    updatePasswordBtn.addEventListener("click", updatePassword);
});

function handleEmailSubmission(e) {
    e.preventDefault();
    e.stopPropagation();

    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim();

    if (!email) {
        emailInput.setCustomValidity("Please enter your email address");
        emailInput.reportValidity();
        return;
    }

    const user = getUserByEmail(email);
    if (!user) {
        emailAttempts++;
        if (emailAttempts >= MAX_ATTEMPTS) {
            alert("Too many attempts. Please try again later.");
            window.location.replace("./../login.html");
            return;
        }
        emailInput.setCustomValidity("Email not found in our system");
        emailInput.reportValidity();
        return;
    }

    emailInput.setCustomValidity("");
    currentUser = user;
    
    backupCodeModal.show();
}

function verifyBackupCode() {
    const backupCodeInput = document.getElementById("backupCode");
    const code = backupCodeInput.value.trim();

    if (!code) {
        backupCodeInput.setCustomValidity("Please enter your backup code");
        backupCodeInput.reportValidity();
        return;
    }

    if (code !== currentUser.getBackupCode()) {
        backupCodeInput.setCustomValidity("Invalid backup code");
        backupCodeInput.reportValidity();
        return;
    }

    backupCodeInput.setCustomValidity("");
    backupCodeModal.hide();
    newPasswordModal.show();
}

function updatePassword() {
    backupCodeModal.hide();
    const newPasswordForm = document.getElementById("newPasswordForm");
    const newPassword = document.getElementById("newPassword").value;
    const confirmNewPassword = document.getElementById("confirmNewPassword").value;

    if (!newPasswordForm.checkValidity()) {
        newPasswordForm.classList.add("was-validated");
        return;
    }

    if (newPassword !== confirmNewPassword) {
        document.getElementById("confirmNewPassword").setCustomValidity("Passwords must match");
        document.getElementById("confirmNewPassword").reportValidity();
        return;
    }

    try {
        const updateBtn = document.getElementById("updatePassword");
        updateBtn.disabled = true;
        updateBtn.innerHTML = 'Updating... <span class="spinner-border spinner-border-sm"></span>';

        const updatedUser = updateUserPassword(currentUser.getId(), newPassword);

        if (!updatedUser) {
            throw new Error("Failed to update password");
        }

        setTimeout(() => {
            newPasswordModal.hide();
            
            // Use a better alert system if available (like Bootstrap alerts)
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert alert-success position-fixed top-0 end-0 m-3';
            alertDiv.style.zIndex = '1060';
            alertDiv.textContent = 'Password updated successfully!';
            document.body.appendChild(alertDiv);
            
            // Remove alert after 3 seconds
            setTimeout(() => alertDiv.remove(), 3000);
            
            window.location.href = "login.html";
        }, 500);

    } catch (error) {
        console.error("Password update error:", error);
        
        // Reset button state
        const updateBtn = document.getElementById("updatePassword");
        updateBtn.disabled = false;
        updateBtn.innerHTML = 'Update Password';

        // Show error message
        let errorMessage = "An error occurred while updating your password.";
        if (error.message.includes("Password must be at least 6 characters")) {
            errorMessage = "Password must be at least 6 characters long.";
        }
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger position-fixed top-0 end-0 m-3';
        errorDiv.style.zIndex = '1060';
        errorDiv.textContent = errorMessage;
        document.body.appendChild(errorDiv);
        
        // Remove error after 5 seconds
        setTimeout(() => errorDiv.remove(), 5000);
    }
}