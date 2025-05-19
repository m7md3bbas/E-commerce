import { getUserByEmail } from "./../../../../projectModules/usersModule.js";
import { pushPurchase } from "./../../../../projectModules/purchases.js";
import {
  getProductById,
  decreaseProductStock,
} from "../../../../projectModules/productModule.js";

// MARK: Toast

function showToast(message, type = "success", duration = 2000) {
  const toast = document.createElement("div");
  toast.className = `alert alert-${type} toast-message shadow`;
  toast.textContent = message;
  toast.style.cssText = `
    min-width: 200px;
    margin-bottom: 10px;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  `;

  const container = document.getElementById("toastContainer");
  container.appendChild(toast);

  // Fade in
  setTimeout(() => {
    toast.style.opacity = "1";
  }, 200);

  // Fade out & remove
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => {
      toast.remove();
    }, 200);
  }, duration);
}

//MARK: formValid
window.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Loaded");
  const form = document.getElementById("checkoutForm");

  const totalCartPrice = document.querySelector(".totalCartPrice");

  if (totalCartPrice) {
    const storedTotalPrice = JSON.parse(localStorage.getItem("totalCartPrice"));
    if (storedTotalPrice) {
      totalCartPrice.textContent = `${storedTotalPrice} $`;
    } else {
      totalCartPrice.textContent = "0 $";
    }
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(cart);

  const viewProduct = document.querySelector(".viewProduct");

  if (viewProduct && cart.length > 0) {
    cart.forEach((item) => {
      viewProduct.innerHTML += `
        <div class="col-4">
          <div class='border border-2 main-border text-center mb-3'>
            <img src="${item.img}" class='w-100' alt="Product Image">
            <h6 class='main-color pt-3'>Price: ${item.price} $</h6>
          </div>
        </div>
      `;
    });
  } else {
    if (viewProduct) {
      viewProduct.innerHTML = "<p>No products in your cart.</p>";
    }
  }
})
  // MARK: SubmitForm
 document.getElementById("checkoutForm").addEventListener("submit", function (e) {
    e.preventDefault();

    addressValidation();
  
    localStorage.removeItem("cart");
    localStorage.removeItem("totalCartPrice");
   });

 

  // MARK: AddValidation
  function addressValidation() {
    let isValid = true;

    // Get form values
    const nameInput = document.getElementById("name");
    const streetInput = document.getElementById("streetAddress");
    const apartmentInput = document.getElementById("apartment");
    const cityInput = document.getElementById("city");
    const phoneInput = document.getElementById("phone");

    const nameErrorMsg = nameInput.nextElementSibling.nextElementSibling;
    const streetErrorMsg = streetInput.nextElementSibling.nextElementSibling;
    const apartmentErrorMsg =
      apartmentInput.nextElementSibling.nextElementSibling;
    const cityErrorMsg = cityInput.nextElementSibling.nextElementSibling;
    const phoneErrorMsg = phoneInput.nextElementSibling.nextElementSibling;

    // Shipping Validation
    if (cityInput.value.trim() === "" ) {
      cityErrorMsg.textContent = "City is required.";
      isValid = false;
    } else {
      cityErrorMsg.textContent = "";
    }

    if (!nameInput.value.trim() ||  /\d/.test(nameInput.value.trim()) ) {
      nameErrorMsg.textContent = "Name is required and must not contain numbers.";
      isValid = false;
    } else {
      nameErrorMsg.textContent = "";
    }

    if (!streetInput.value.trim()) {
      streetErrorMsg.textContent = "Street address is required.";
      isValid = false;
    } else {
      streetErrorMsg.textContent = "";
    }

    if (!apartmentInput.value.trim() || isNaN(apartmentInput.value.trim())) {
      apartmentErrorMsg.textContent = "Enter a valid apartment/floor number.";
      isValid = false;
    } else {
      apartmentErrorMsg.textContent = "";
    }

    let regex = /^01[0125][0-9]{8}$/;
    if (phoneInput.value.trim() === "") {
      phoneErrorMsg.textContent = "Phone number is required.";
      isValid = false;
    } else if (!regex.test(phoneInput.value.trim())) {
      phoneErrorMsg.textContent = "Please enter a valid phone number.";
      isValid = false;
    } else {
      phoneErrorMsg.textContent = "";
    }

    if (isValid) {
      const UserEmail = JSON.parse(localStorage.getItem("current_user"));

      const buyer = getUserByEmail(UserEmail.email);

      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];


      cartItems.forEach((item, index) => {
        const product = getProductById(item.id);

        for (let i = 0; i < item.quantity; i++) {
          console.log("hi");
          const purchaseId = `or-${String(Date.now()).slice(-3) + index + i }`;

          let data = pushPurchase(purchaseId, "pending", buyer, product);
        }
      });

      showToast("Form submitted successfully!");
      setTimeout(() => {
        window.location.href = "./paymentMethod.html";
        form.reset();
      }, 500);
    }

  }
   

 

