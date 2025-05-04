
window.addEventListener('load', function () {

  const form = document.getElementById('checkoutForm');
  const totalCartPrice=this.document.querySelector('.totalCartPrice')
  totalCartPrice.textContent= JSON.parse(localStorage.getItem('totalCartPrice'))
  const productsImgs = JSON.parse(localStorage.getItem('productImgs'));
  const viewProduct= this.document.querySelector('.viewProduct')
  console.log(productsImgs);
  
  productsImgs.forEach(imgSrc => {
    viewProduct.innerHTML+=`<div class="col-md-3  mb-3">
                  <div class='border border-3'>
                  <img src=${imgSrc} class="w-100" alt="">
                  </div>
                </div>`
    
  });

  console.log(productsImgs);
  

  
    
    form.addEventListener('submit', function (e) {
      e.preventDefault(); 
      let valid = true;
  
      
      const cityInput = document.getElementById('city');
      const addressInput = document.getElementById('address');
      const phoneInput = document.getElementById('phone');
      
      const cityErrorMsg = cityInput.nextElementSibling.nextElementSibling; 
      const addressErrorMsg = addressInput.nextElementSibling.nextElementSibling;
      const phoneErrorMsg = phoneInput.nextElementSibling.nextElementSibling;
      
      
      if (cityInput.value.trim() === '') {
        cityErrorMsg.textContent = 'City is required.';
        valid = false;
      } else {
        cityErrorMsg.textContent = ''; 
      }
      
      
      if (addressInput.value.trim() === '') {
        addressErrorMsg.textContent = 'Address is required.';
        valid = false;
      } else {
        addressErrorMsg.textContent = ''; 
      }
  
      let regex = /^01[0125][0-9]{8}$/
      if (phoneInput.value.trim() === '') {
        phoneErrorMsg.textContent = 'Phone number is required.';
        valid = false;
      } else if (!(regex.test(phoneInput.value.trim()))) { 
        phoneErrorMsg.textContent = 'Please enter a valid phone number.';
        valid = false;
      } else {
        phoneErrorMsg.textContent = '';
      }
  
      
      if (valid) {
        alert('Form is valid! Submitting...');
        form.submit(); 
      }
    });
  });
  
  console.log(JSON.parse(localStorage.getItem('totalCartPrice')));
  

  document.querySelector('.finish').addEventListener('click',function(){
    window.open('../home/home.html','_self')
  })