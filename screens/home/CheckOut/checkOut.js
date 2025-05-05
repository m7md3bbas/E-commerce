window.addEventListener('load', function () {
  const form = document.getElementById('checkoutForm');
  const totalCartPrice = document.querySelector('.totalCartPrice');
  
  // Set total price if available in localStorage
  if (totalCartPrice) {
    totalCartPrice.textContent = JSON.parse(localStorage.getItem('totalCartPrice'));
  }

  const cardDetails = JSON.parse(localStorage.getItem('cardDetails'));
  console.log(cardDetails);
  
  const viewProduct = document.querySelector('.viewProduct');
  console.log(cardDetails);
  
  // If products exist in the cart, display them
  if (viewProduct && cardDetails) {
    cardDetails.forEach(item => {
      viewProduct.innerHTML += `
        <div class="col-4">
          <div class='border border-2 main-border text-center mb-3' >
            <img src="${item.img}" class='w-100' alt="Product Image">
            <h6 class='main-color pt-3'>Price: ${item.unitPrice}</h6>
          </div>
        </div>
      `;
    });
  }
});

// Address Validation Function
function addressValidation() {
  document.getElementById("checkoutForm").addEventListener("submit", function (e) {
    e.preventDefault();

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
      alert("Form submitted successfully!");
      window.location.href = './paymentMethod.html';
    }
  });
}

// Add space after every 4 digits in card number
const cardNumberInput = document.getElementById('cardNumber');
if (cardNumberInput) {
  cardNumberInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '').slice(0, 16);
    e.target.value = value.replace(/(.{4})/g, '$1 ').trim();
  });
}

// Submit payment method selection
function submitPayment() {
  const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

  const cardDetails = document.getElementById('cardDetails');
  
  if (selectedMethod === 'card') {
    cardDetails.style.display = 'block';
  } else {
    cardDetails.style.display = 'none';
    alert("Cash on Delivery Selected , Wish see you again .....");
    window.location.href='./thankYou.html'
  }
}

// Card validation function
function validationCardData() {
  let isValid = true;
  const cardNumber = document.getElementById('cardNumber');
  const cardName = document.getElementById('cardName');
  const expiry = document.getElementById('expiry');
  const cvv = document.getElementById('cvv');

  const cardNumberErrorMsg = cardNumber.nextElementSibling;
  const cardNameErrorMsg = cardName.nextElementSibling;
  const expiryErrorMsg = expiry.nextElementSibling;
  const cvvErrorMsg = cvv.nextElementSibling;

  const cleanNumber = cardNumber.value.replace(/\s/g, '');
  const cardNumberValid = /^\d{16}$/.test(cleanNumber);
  const cardNameValid = cardName.value.trim().length > 0;

  const expiryValue = expiry.value.trim();
  const expiryFormatValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryValue);

  let expiryValid = false;
  if (expiryFormatValid) {
    const [month, year] = expiryValue.split('/').map(Number);
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    expiryValid = (year > currentYear) || (year === currentYear && month >= currentMonth);
  }
  
  const cvvValid = /^\d{3}$/.test(cvv.value.trim());

  if (!cardNumberValid) {
    cardNumberErrorMsg.textContent = 'Enter a valid 16-digit card number';
    isValid = false;
  } else {
    cardNumberErrorMsg.textContent = '';
  }

  if (!cardNameValid) {
    cardNameErrorMsg.textContent = 'Enter the cardholder name.';
    isValid = false;
  } else {
    cardNameErrorMsg.textContent = '';
  }

  if (!expiryValid) {
    expiryErrorMsg.textContent = "Enter expiry date as MM/YY.";
    isValid = false;
  } else {
    expiryErrorMsg.textContent = '';
  }

  if (!cvvValid) {
    cvvErrorMsg.textContent = "Enter a valid 3-digit CVV.";
    isValid = false;
  } else {
    cvvErrorMsg.textContent = '';
  }

  if (isValid) {
    // alert("Thanks, Wish see you again .....");
     window.location.href='./thankYou.html';
  }
}


const backBtn = document.querySelector('#backToHome');
if (backBtn) {
  backBtn.addEventListener('click', function() {
    window.location.href = '../Home_Page/index.html';
  });
}