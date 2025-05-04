window.addEventListener('load',function (){
  const imgs = Array.from(document.images).map(img => img.src);
  localStorage.setItem('productImgs', JSON.stringify(imgs));
  

  console.log(imgs);


})

localStorage.setItem('productImgs',JSON.stringify)

function updateCartTotal() {
    const allTotalSpans = document.querySelectorAll('.total-price');
    let total = 0;
    allTotalSpans.forEach(span => {
      const price = parseInt(span.textContent.replace(/\D/g, ''));
      total += price;
    });
    const cartTotal = document.querySelector('#cartTotal');
    if (cartTotal) {
      cartTotal.textContent = total;
    }

    localStorage.setItem('totalCartPrice', cartTotal.textContent);

  }
  
  function initProduct(product) {
    const minusBtn = product.querySelector('.btn-group button:first-child');
    const plusBtn = product.querySelector('.btn-group button:last-child');
    const quantityBtn = product.querySelector('.btn-group button:nth-child(2)');
    const priceSpan = product.querySelector('.price');
    const totalPriceSpan = product.querySelector('.total-price');
    const closeBtn = product.querySelector('.close-btn');
    const unitPrice = parseInt(priceSpan.textContent.replace(/\D/g, ''));
    let quantity = parseInt(quantityBtn.textContent);
  
    function updateTotal() {
      quantityBtn.textContent = quantity;
      totalPriceSpan.textContent = `${unitPrice * quantity} EGP`;
      localStorage.setItem('totalCartPrice',JSON.stringify(totalPriceSpan.textContent))
      console.log(JSON.parse(localStorage.getItem('totalPriceSpan')));
      
      updateCartTotal();
    }
  
    minusBtn.addEventListener('click', function () {
      if(quantity == 1){
        product.remove();
      }else if (quantity > 1) {
        quantity--;
        updateTotal();
      }
     
    });
  
    plusBtn.addEventListener('click', function () {
      quantity++;
      updateTotal();
    });
  
    closeBtn.addEventListener('click', function () {
        product.remove();
        updateCartTotal();
      
        const remainingProducts = document.querySelectorAll('.product');
        if (remainingProducts.length === 0) {
          document.getElementById('cart').innerHTML = `<h3 class="alert alert-warning text-center">No Product in Your Cart</h3>`;
        }
      });
  
    updateTotal();
  }
  
  
  document.querySelectorAll('.product').forEach(initProduct);
  

  document.getElementById('clearCart').addEventListener('click', function () {
    const cart = document.getElementById('cart');
    cart.innerHTML = `<h3 class="alert alert-warning text-center">No Product in Your Cart</h3>`;
    updateCartTotal();
  });
  
  
  updateCartTotal();
  


  document.querySelector('.checkOut').addEventListener('click',()=>{
    console.log('hiiii');
    
    window.open('../CheckOut/checkOut.html','_self')
  })

