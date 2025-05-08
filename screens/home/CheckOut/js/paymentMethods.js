  
  
  const backBtn = document.querySelector('#backToHome');
  if (backBtn) {
    backBtn.addEventListener('click', function() {
      window.location.href = '../Home_Page/index.html';
    });
  }

 // Submit payment method selection

 this.document.getElementById('submitPayment').addEventListener('click',function(){
    submitPayment()
  })
  function submitPayment() {
    console.log('payment');
    
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
  this.document.getElementById('submitCardData').addEventListener('click',function(){
    validationCardData()
  })
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




// Add space after every 4 digits in card number
const cardNumberInput = document.getElementById('cardNumber');
if (cardNumberInput) {
  cardNumberInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '').slice(0, 16);
    e.target.value = value.replace(/(.{4})/g, '$1 ').trim();
  });
}

