import {pushPurchase} from '../../../../projectModules/purchases.js'
import {getUserByEmail } from '../../../../projectModules/usersModule.js'
import {getProductById} from '../../../../projectModules/productModule.js'

// Address Validation Function
window.addEventListener('DOMContentLoaded', function () {

  console.log('DOM Loaded');
  const form = document.getElementById('checkoutForm');
 
  
  const totalCartPrice = document.querySelector('.totalCartPrice');
  
  if (totalCartPrice) {
    const storedTotalPrice = JSON.parse(localStorage.getItem('totalCartPrice'));
    if (storedTotalPrice) {
      totalCartPrice.textContent = `${storedTotalPrice} EGP`;
    } else {
      totalCartPrice.textContent = '0 EGP'
    }
  }

  const cart = JSON.parse(localStorage.getItem('cart')) || [];  
  console.log(cart);
  
  const viewProduct = document.querySelector('.viewProduct');
  
  if (viewProduct && cart.length > 0) {
    cart.forEach(item => {
      viewProduct.innerHTML += `
        <div class="col-4">
          <div class='border border-2 main-border text-center mb-3'>
            <img src="${item.img}" class='w-100' alt="Product Image">
            <h6 class='main-color pt-3'>Price: ${item.price} EGP</h6>
          </div>
        </div>
      `;
    });
  } else {
    if (viewProduct) {
      viewProduct.innerHTML = '<p>No products in your cart.</p>';
    }
  }

  form.addEventListener("submit", function (e) {
    console.log('Form Submitted');
    e.preventDefault();
    addressValidation()
  });

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
      const apartmentErrorMsg = apartmentInput.nextElementSibling.nextElementSibling;
      const cityErrorMsg = cityInput.nextElementSibling.nextElementSibling;
      const phoneErrorMsg = phoneInput.nextElementSibling.nextElementSibling;
  
      // Shipping Validation
      if (cityInput.value.trim() === '') {
        cityErrorMsg.textContent = 'City is required.';
        isValid = false;
      } else {
        cityErrorMsg.textContent = '';
      }
      
      if (!nameInput.value.trim()) {
        nameErrorMsg.textContent = "Name is required.";
        isValid = false;
      } else {
        nameErrorMsg.textContent = '';
      }
  
      if (!streetInput.value.trim()) {
        streetErrorMsg.textContent = "Street address is required.";
        isValid = false;
      } else {
        streetErrorMsg.textContent = '';
      }
  
      if (!apartmentInput.value.trim() || isNaN(apartmentInput.value.trim())) {
        apartmentErrorMsg.textContent = "Enter a valid apartment/floor number.";
        isValid = false;
      } else {
        apartmentErrorMsg.textContent = '';
      }
  
     
  
      let regex = /^01[0125][0-9]{8}$/;
      if (phoneInput.value.trim() === '') {
        phoneErrorMsg.textContent = 'Phone number is required.';
        isValid = false;
      } else if (!(regex.test(phoneInput.value.trim()))) {
        phoneErrorMsg.textContent = 'Please enter a valid phone number.';
        isValid = false;
      } else {
        phoneErrorMsg.textContent = '';
      }
  
      if (isValid) {
       
      
        form.reset();
        // Show success message and redirect
        alert("Form submitted successfully!");
        window.location.href = './paymentMethod.html';
  
      }
   
  }
  
  
  
  
  
});
 