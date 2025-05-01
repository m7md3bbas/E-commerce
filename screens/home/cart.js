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
      updateCartTotal();
    }
  
    minusBtn.addEventListener('click', function () {
      if (quantity > 1) {
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
          document.getElementById('cart').innerHTML = `<p class="alert alert-warning text-center">No Product in Your Cart</p>`;
        }
      });
  
    updateTotal();
  }
  
  
  document.querySelectorAll('.product').forEach(initProduct);
  

  document.getElementById('clearCart').addEventListener('click', function () {
    const cart = document.getElementById('cart');
    cart.innerHTML = `<p class="alert alert-warning text-center">No Product in Your Cart</p>`;
    updateCartTotal();
  });
  
  
  updateCartTotal();
  