import { getUsers, getUserByEmail, updateUserPassword } from "../../../projectModules/usersModule.js";

document.addEventListener("DOMContentLoaded", () => {
    const forgotPasswordForm = document.querySelector("form");
    const emailInput = document.getElementById("floatingEmail");
    const backupCodeModal = new bootstrap.Modal(document.getElementById('backupCodeModal'));
    const newPasswordModal = new bootstrap.Modal(document.getElementById('newPasswordModal'));
    const verifyBackupCodeBtn = document.getElementById("verifyBackupCode");
    const updatePasswordBtn = document.getElementById("updatePassword");
    const continueBtn = document.querySelector("button[type='submit']");
    const toggleIcons = document.querySelectorAll(".password-toggle");

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

                // Show success toast
                const toastHTML = `
                    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
                        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                            <div class="toast-header bg-success text-white">
                                <strong class="me-auto">Success</strong>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                            <div class="toast-body">
                                Password updated successfully! Redirecting to login...
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
                <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
                    <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                        <div class="toast-header bg-danger text-white">
                            <strong class="me-auto">Error</strong>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div class="toast-body">
                            ${error.message || "Failed to update password. Please try again."}
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', toastHTML);

            // Remove toast after 5 seconds
            setTimeout(() => {
                const toasts = document.querySelectorAll('.toast');
                toasts.forEach(toast => toast.remove());
            }, 5000);
        }
    }
});