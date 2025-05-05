
window.addEventListener('load', function () {

  const form = document.getElementById('checkoutForm');
  const totalCartPrice=this.document.querySelector('.totalCartPrice')
  totalCartPrice.textContent= JSON.parse(localStorage.getItem('totalCartPrice'))
  const cardDetails = JSON.parse(localStorage.getItem('cardDetails'));
  const viewProduct= document.querySelector('.viewProduct')
  console.log(cardDetails);
  
  
  cardDetails.forEach(cardDetail => {
    viewProduct.innerHTML+=`
          <div class="col-4">
           <div class='border border-2 main-border text-center mb-3'>
            <img src="${cardDetail.img}" style="width:100px;" alt="Product Image">
            <h6 class='main-color' >Price: ${cardDetail.unitPrice }</h6>
           </div>
          </div>
         
      
       `
    
  });

});
  
function addressValidation(){
  document.getElementById("checkoutForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    let isValid = true;
  
    // Clear all old error messages
    // document.querySelectorAll(".errorMsg").forEach(msg => msg.textContent = '');
  
    // Get form values
    const nameInput = document.getElementById("name");
    const streetInput = document.getElementById("streetAddress");
    const apartmentInput = document.getElementById("apartment");
    const cityInput = document.getElementById("city");
    const phoneInput = document.getElementById("phone");

    const nameErrorMsg = nameInput.nextElementSibling.nextElementSibling;
    const streetErrorMsg = streetInput.nextElementSibling.nextElementSibling;
    const  apartmentErrorMsg = apartmentInput.nextElementSibling.nextElementSibling;
    const  cityErrorMsg = cityInput.nextElementSibling.nextElementSibling;
    const phoneErrorMsg = phoneInput.nextElementSibling.nextElementSibling;
  
    // Shipping Validation
        if (cityInput.value.trim() === '') {
        cityErrorMsg.textContent = 'City is required.';
        isValid = false;
      } else {
        cityErrorMsg.textContent = ''; 
      }
    if (!nameInput.value.trim() ) {
      nameErrorMsg.textContent = "Name is required.";
      isValid = false;
    }else{
      nameErrorMsg.textContent=''
    }
  
    if (!streetInput.value.trim()) {
      streetErrorMsg.textContent = "Street address is required.";
      isValid = false;
    }else{
      streetErrorMsg.textContent=''
    }
  
    if (!apartmentInput.value.trim() || isNaN(apartmentInput.value.trim())) {
      apartmentErrorMsg.textContent = "Enter a valid apartment/floor number.";
      isValid = false;
    }else{
      apartmentErrorMsg.textContent=''
    }
  
    if (!cityInput.value.trim()) {
      cityErrorMsg.textContent = "City is required.";
      isValid = false;
    }else{
      cityErrorMsg.textContent=''
    }
  
      let regex = /^01[0125][0-9]{8}$/
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
       window.location.href='./paymentMethod.html'
      // You can now send data to your backend or continue
    }
  });
}

  
    
    // form.addEventListener('submit', function (e) {
    //   e.preventDefault(); 
    //   let valid = true;
  
      
    //   const cityInput = document.getElementById('city');
    //   const addressInput = document.getElementById('address');
    //   const phoneInput = document.getElementById('phone');
      
    //   const cityErrorMsg = cityInput.nextElementSibling.nextElementSibling; 
    //   const addressErrorMsg = addressInput.nextElementSibling.nextElementSibling;
    //   const phoneErrorMsg = phoneInput.nextElementSibling.nextElementSibling;
      
      
    //   if (cityInput.value.trim() === '') {
    //     cityErrorMsg.textContent = 'City is required.';
    //     valid = false;
    //   } else {
    //     cityErrorMsg.textContent = ''; 
    //   }
      
      
    //   if (addressInput.value.trim() === '') {
    //     addressErrorMsg.textContent = 'Address is required.';
    //     valid = false;
    //   } else {
    //     addressErrorMsg.textContent = ''; 
    //   }
  
    //   let regex = /^01[0125][0-9]{8}$/
    //   if (phoneInput.value.trim() === '') {
    //     phoneErrorMsg.textContent = 'Phone number is required.';
    //     valid = false;
    //   } else if (!(regex.test(phoneInput.value.trim()))) { 
    //     phoneErrorMsg.textContent = 'Please enter a valid phone number.';
    //     valid = false;
    //   } else {
    //     phoneErrorMsg.textContent = '';
    //   }
  
      
    //   if (valid) {
    //     alert('Form is valid! Submitting...');
    //     form.submit(); 
    //   }
    // });


  
  

  



  function submitPayment() {
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    if (selectedMethod === 'card') {
        cardDetails.style.display = 'block';

    } else {
      cardDetails.style.display = 'none';

      alert("Cash on Delivery Selected");
    }

  }

  
  function validation() {
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
  
    if (!selectedMethod) {
      alert("Please select a payment method.");
      return;
    }
  
    if (selectedMethod.value === 'card') {
      const cardNumber = document.getElementById('cardNumber').value.trim();
      const cardName = document.getElementById('cardName').value.trim();
      const expiry = document.getElementById('expiry').value.trim();
      const cvv = document.getElementById('cvv').value.trim();
  
      const cardNumberValid = /^\d{16}$/.test(cardNumber);
      const cardNameValid = cardName.length > 0;
      const expiryValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry);
      const cvvValid = /^\d{3}$/.test(cvv);
  
      if (!cardNumberValid) {
        alert("Enter a valid 16-digit card number.");
        return;
      }
      if (!cardNameValid) {
        alert("Enter the cardholder name.");
        return;
      }
      if (!expiryValid) {
        alert("Enter expiry date as MM/YY.");
        return;
      }
      if (!cvvValid) {
        alert("Enter a valid 3-digit CVV.");
        return;
      }
  
      alert("Card details are valid!");
      console.log("Payment via Card", { cardNumber, cardName, expiry, cvv });
  
    } else {
      alert("Cash on Delivery selected.");
    }
  }
  