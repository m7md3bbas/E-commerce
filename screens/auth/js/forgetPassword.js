import { getUsers, getUserByEmail, updateUserPassword } from "../../../projectModules/usersModule.js";

document.addEventListener("DOMContentLoaded", () => {
    const forgotPasswordForm = document.querySelector("form");
    const emailInput = document.getElementById("floatingEmail");
    const backupCodeModal = new bootstrap.Modal(document.getElementById('backupCodeModal'));
    const newPasswordModal = new bootstrap.Modal(document.getElementById('newPasswordModal'));
    const verifyBackupCodeBtn = document.getElementById("verifyBackupCode");
    const updatePasswordBtn = document.getElementById("updatePassword");
    const continueBtn = document.querySelector("button[type='submit']");

    // Add this function to handle password visibility toggling
    function togglePasswordVisibility(fieldId) {
        const input = document.getElementById(fieldId);
        const icon = input.nextElementSibling.querySelector('i');

        if (input.type === "password") {
            input.type = "text";
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
        } else {
            input.type = "password";
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        }
    }

    // Remove the existing toggleIcons code and replace it with this:
    document.querySelectorAll('.password-toggle').forEach(icon => {
        icon.addEventListener('click', function (e) {
            e.preventDefault();
            const fieldId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            togglePasswordVisibility(fieldId);
        });
    });

    let currentUser = null;
    let emailAttempts = 0;
    const MAX_ATTEMPTS = 3;

    forgotPasswordForm.addEventListener("submit", handleEmailSubmission);
    verifyBackupCodeBtn.addEventListener("click", verifyBackupCode);
    updatePasswordBtn.addEventListener("click", updatePassword);

    function handleEmailSubmission(e) {
        e.preventDefault();
        e.stopPropagation();

        const email = emailInput.value.trim();

        // Basic email validation
        if (!email || !email.includes("@")) {
            emailInput.setCustomValidity("Please enter a valid email address");
            emailInput.reportValidity();
            return;
        }

        // Show loading state
        continueBtn.disabled = true;
        continueBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Checking...';

        // Simulate API delay
        setTimeout(() => {
            const user = getUserByEmail(email);

            // Reset button state
            continueBtn.disabled = false;
            continueBtn.innerHTML = 'Continue';

            if (!user) {
                emailAttempts++;
                if (emailAttempts >= MAX_ATTEMPTS) {
                    alert("Too many attempts. Please try again later.");
                    window.location.href = "./login.html";
                    return;
                }
                emailInput.setCustomValidity("Email not found in our system");
                emailInput.reportValidity();
                return;
            }

            emailInput.setCustomValidity("");
            currentUser = user;
            backupCodeModal.show();
        }, 1000);
    }

    function verifyBackupCode() {
        const backupCodeInput = document.getElementById("backupCode");
        const code = backupCodeInput.value.trim();

        if (!code) {
            backupCodeInput.setCustomValidity("Please enter your backup code");
            backupCodeInput.reportValidity();
            return;
        }

        // Show loading state
        verifyBackupCodeBtn.disabled = true;
        verifyBackupCodeBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Verifying...';

        // Simulate verification delay
        setTimeout(() => {
            if (code !== currentUser.getBackupCode()) {
                backupCodeInput.setCustomValidity("Invalid backup code");
                backupCodeInput.reportValidity();

                // Reset button state
                verifyBackupCodeBtn.disabled = false;
                verifyBackupCodeBtn.innerHTML = 'Verify';
                return;
            }

            backupCodeInput.setCustomValidity("");
            backupCodeModal.hide();
            newPasswordModal.show();

            // Reset button state
            verifyBackupCodeBtn.disabled = false;
            verifyBackupCodeBtn.innerHTML = 'Verify';
        }, 800);
    }

    function updatePassword() {
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

        // Show loading state
        updatePasswordBtn.disabled = true;
        updatePasswordBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Updating...';

        try {
            // Simulate update delay
            setTimeout(() => {
                const updatedUser = updateUserPassword(currentUser.getId(), newPassword);

                if (!updatedUser) {
                    throw new Error("Failed to update password");
                }

                newPasswordModal.hide();

                const toastHTML = `
                <div class="position-fixed top-0 start-50 translate-middle-x p-3" style="z-index: 1060; width: 100%; max-width: 500px;">
                    <div class="toast show align-items-center border-0" role="alert" aria-live="assertive" aria-atomic="true" style="background-color: rgba(255, 255, 255, 0.95); box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                        <div class="d-flex">
                            <div class="toast-body d-flex align-items-center" style="color: #155724; background-color: #d4edda; border-left: 4px solid #28a745; padding: 1rem;">
                                <i class="fas fa-check-circle me-2" style="color: #28a745;"></i>
                                Password updated successfully! Redirecting to login...
                            </div>
                            <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                    </div>
                </div>
            `;

                document.body.insertAdjacentHTML('beforeend', toastHTML);

                // Redirect after delay
                setTimeout(() => {
                    window.location.href = "./login.html";
                }, 2000);
            }, 1000);

        } catch (error) {
            console.error("Password update error:", error);

            // Reset button state
            updatePasswordBtn.disabled = false;
            updatePasswordBtn.innerHTML = 'Update Password';

            // Show error toast
            const toastHTML = `
<div class="position-fixed top-0 start-50 translate-middle-x p-3" style="z-index: 1060; width: 100%; max-width: 500px;">
    <div class="toast show align-items-center border-0" role="alert" aria-live="assertive" aria-atomic="true" style="background-color: rgba(255, 255, 255, 0.95); box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <div class="d-flex">
            <div class="toast-body d-flex align-items-center" style="color: #721c24; background-color: #f8d7da; border-left: 4px solid #dc3545; padding: 1rem;">
                <i class="fas fa-exclamation-circle me-2" style="color: #dc3545;"></i>
                ${error.message || "Failed to update password. Please try again."}
            </div>
            <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
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
                    setTimeout(() => toast.remove(), 300);
                }
            }, 5000);
        }
    }
});