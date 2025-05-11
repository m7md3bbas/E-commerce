import { updateUser } from "../../projectModules/usersModule.js";

document.addEventListener('DOMContentLoaded', () => {

    const currentUser = JSON.parse(localStorage.getItem("current_user"));
    if (!currentUser) {
        console.error("No user logged in");
        window.location.href = "./../auth/login.html";
        return;
    }

    const form = document.getElementById("profileForm");
    const nameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const addressInput = document.getElementById("address");
    const birthDate = document.getElementById("dob");
    const genderSelect = document.getElementById("gender");

    const sidebarElements = {
        name: document.getElementById("sidebarName"),
        email: document.getElementById("sidebarEmail"),
        phone: document.getElementById("sidebarPhone"),
        address: document.getElementById("sidebarAddress"),
        picture: document.getElementById("sidebarPicture"),
        mobileName: document.getElementById("mobileName")
    };

    const buttons = {
        back: document.getElementById("backBtn"),
        edit: document.getElementById("editBtn"),
        save: document.getElementById("saveBtn"),
        cancel: document.getElementById("cancelBtn")
    };

    // Initialize form with user data
    function initializeForm() {
        // Set form values
        nameInput.value = currentUser.name || '';
        emailInput.value = currentUser.email || '';
        phoneInput.value = currentUser.phone || '';
        addressInput.value = currentUser.address || '';
        birthDate.value = currentUser.dob || '';
        genderSelect.value = currentUser.gender || '';

        // Update sidebar display
        sidebarElements.name.textContent = currentUser.name || 'User';
        sidebarElements.email.textContent = currentUser.email || '';
        sidebarElements.phone.textContent = currentUser.phone || '';
        sidebarElements.address.textContent = currentUser.address || '';
        sidebarElements.mobileName.textContent = currentUser.name || 'User';

        // Set profile picture based on gender
        const gender = currentUser.gender?.toLowerCase();
        const profilePics = {
            male: "../../assets/imgs/profile/male.jpg",
            female: "../../assets/imgs/profile/female.jpg",
            default: "../../assets/imgs/profile/default.jpg"
        };
        // sidebarElements.picture.src = profilePics[gender] || profilePics.default;
    }

    function toggleEditMode(enable) {
        const editableElements = [nameInput, phoneInput, addressInput, birthDate, genderSelect];
        editableElements.forEach(el => {
            if (el.tagName === 'SELECT') {
                el.disabled = !enable;
            } else {
                el.readOnly = !enable;
            }
        });

        buttons.edit.classList.toggle('d-none', enable);
        buttons.save.classList.toggle('d-none', !enable);
        buttons.cancel.classList.toggle('d-none', !enable);

        if (!enable) {
            form.classList.remove('was-validated');
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        try {
            buttons.save.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span> Saving...';
            buttons.save.disabled = true;

            const updatedUser = {
                ...currentUser,
                name: nameInput.value,
                phone: phoneInput.value,
                address: addressInput.value,
                dob: birthDate.value,
                gender: genderSelect.value
            };

            const success = await updateUser(updatedUser);
            if (!success) throw new Error("Update failed");

            localStorage.setItem("currentUser", JSON.stringify(updatedUser));
            Object.assign(currentUser, updatedUser);
            initializeForm();
            toggleEditMode(false);
            showAlert("Profile updated successfully!", "success");
        } catch (error) {
            console.error("Update error:", error);
            showAlert("Failed to update profile. Please try again.", "danger");
        } finally {
            buttons.save.innerHTML = '<i class="fas fa-save me-1"></i> Save Changes';
            buttons.save.disabled = false;
        }
    }

    // Helper function to show alerts
    function showAlert(message, type) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show`;
        alert.role = 'alert';
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

        const container = document.querySelector('.profile-body');
        container.insertBefore(alert, container.firstChild);

        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => alert.remove(), 150);
        }, 3000);
    }
    initializeForm();
    form.addEventListener('submit', handleSubmit);
    buttons.edit.addEventListener('click', () => toggleEditMode(true));
    buttons.cancel.addEventListener('click', () => {
        initializeForm();
        toggleEditMode(false);
    });
    buttons.back.addEventListener('click', () => window.history.back());
});