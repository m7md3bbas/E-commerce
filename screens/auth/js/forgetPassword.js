import { getUsers, getUserByEmail, updateUserPassword } from "../../../projectModules/usersModule.js";

document.addEventListener("DOMContentLoaded", () => {
    const forgotPasswordForm = document.querySelector("form");
    const emailInput = document.getElementById("floatingEmail");
    const backupCodeModal = new bootstrap.Modal(document.getElementById('backupCodeModal'));
    const newPasswordModal = new bootstrap.Modal(document.getElementById('newPasswordModal'));
    const verifyBackupCodeBtn = document.getElementById("verifyBackupCode");
    const updatePasswordBtn = document.getElementById("updatePassword");
    const continueBtn = document.querySelector("button[type='submit']");
    const backupCodeForm = document.getElementById("backupCodeForm");
    const newPasswordForm = document.getElementById("newPasswordForm");

    const showPassword = document.getElementById("showPasswordCheck");

    showPassword.addEventListener("change", () => {
        if (showPassword.checked) {
            document.getElementById("newPassword").type = "text";
            document.getElementById("confirmNewPassword").type = "text";
        } else {
            document.getElementById("newPassword").type = "password";
            document.getElementById("confirmNewPassword").type = "password";
        }
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

        // Bootstrap validation
        if (!forgotPasswordForm.checkValidity()) {
            forgotPasswordForm.classList.add('was-validated');
            return;
        }

        const email = emailInput.value.trim();

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
                    showToast('Too many attempts. Please try again later.', 'error');
                    setTimeout(() => {
                        window.location.href = "./login.html";
                    }, 2000);
                    return;
                }
                emailInput.classList.add('is-invalid');
                const invalidFeedback = emailInput.nextElementSibling;
                invalidFeedback.textContent = "Email not found in our system";
                return;
            }

            emailInput.classList.remove('is-invalid');
            currentUser = user;
            backupCodeModal.show();
        }, 1000);
    }

    function verifyBackupCode() {
        const backupCodeInput = document.getElementById("backupCode");
        
        // Bootstrap validation
        backupCodeForm.classList.add('was-validated');
        if (!backupCodeForm.checkValidity()) {
            return;
        }

        const code = backupCodeInput.value.trim();

        // Show loading state
        verifyBackupCodeBtn.disabled = true;
        verifyBackupCodeBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Verifying...';

        // Simulate verification delay
        setTimeout(() => {
            if (code !== currentUser.getBackupCode()) {
                backupCodeInput.classList.add('is-invalid');
                backupCodeInput.nextElementSibling.textContent = "Invalid backup code";

                verifyBackupCodeBtn.disabled = false;
                verifyBackupCodeBtn.innerHTML = 'Verify';
                return;
            }

            backupCodeInput.classList.remove('is-invalid');
            backupCodeModal.hide();
            newPasswordModal.show();

            verifyBackupCodeBtn.disabled = false;
            verifyBackupCodeBtn.innerHTML = 'Verify';
        }, 800);
    }

    function updatePassword() {
        const newPassword = document.getElementById("newPassword").value;
        const confirmNewPassword = document.getElementById("confirmNewPassword").value;

        newPasswordForm.classList.add('was-validated');
        if (!newPasswordForm.checkValidity()) {
            return;
        }

        if (newPassword !== confirmNewPassword) {
            const confirmInput = document.getElementById("confirmNewPassword");
            confirmInput.classList.add('is-invalid');
            confirmInput.nextElementSibling.textContent = "Passwords must match";
            return;
        }

        updatePasswordBtn.disabled = true;
        updatePasswordBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Updating...';

        try {
            setTimeout(() => {
                const updatedUser = updateUserPassword(currentUser.getId(), newPassword);

                if (!updatedUser) {
                    throw new Error("Failed to update password");
                }

                newPasswordModal.hide();
                showToast('Password updated successfully! Redirecting to login...', 'success');

                setTimeout(() => {
                    window.location.href = "./login.html";
                }, 2000);
            }, 1000);

        } catch (error) {
            console.error("Password update error:", error);

            // Reset button state
            updatePasswordBtn.disabled = false;
            updatePasswordBtn.innerHTML = 'Update Password';
            showToast(error.message || "Failed to update password. Please try again.", 'error');
        }
    }

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
});