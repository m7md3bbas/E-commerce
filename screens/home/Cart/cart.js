import { getProductById } from "../../../projectModules/productModule.js";
window.addEventListener('load', function () {
  const container = document.querySelector('.addProduct');
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  console.log(cartItems);
  

  if (cartItems.length === 0) {
    container.innerHTML = `<p class="alert alert-warning text-center">No Products in Your Cart</p>`;
    return;
  }


  console.log(cartItems);
  console.log();
  
  
  cartItems.forEach(item => {
    console.log(item.quantity);
    console.log(Number(item.price.split('$')[0]) * item.quantity);
    
    
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'col-lg-3');
    card.innerHTML = `
      <div class="card m-2 product" data-id="${item.id}">
        <img src="${item.img}" class="card-img-top" alt="${item.name}">
        <div class="card-body">
          <h5 class="main-color">${item.category}</h5>
          <p>${item.name}</p>
          <h6>Price: <span class="text-secondary price">${Number(item.price.split('$')[0])} </span></h6>
          <h6>Total Price: <span class="text-secondary total-price">${Number(item.price.split('$')[0]) * item.quantity} $</span></h6>
          <hr>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button class="btn btn-outline-secondary decrease">-</button>
              <span class="mx-3 mt-2 quantity">${item.quantity}</span>
              <button class="btn btn-outline-secondary increase">+</button>
            </div>
            <i class="fa-solid fa-trash close-btn cursor-pointer text-danger"></i>
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
    initProduct(card, item);
  });

  updateCartTotal();
});

function initProduct(productElement, itemData) {
  const minusBtn = productElement.querySelector('.decrease');
  const plusBtn = productElement.querySelector('.increase');
  const quantitySpan = productElement.querySelector('.quantity');
  const priceSpan = productElement.querySelector('.price');
  const totalPriceSpan = productElement.querySelector('.total-price');
  const closeBtn = productElement.querySelector('.close-btn');

  let quantity = itemData.quantity;
  const unitPrice = Number(itemData.price.split('$')[0]);
  console.log(unitPrice);
  

  function updateTotal() {
    if (quantity < 1) quantity = 1;
    quantitySpan.textContent = quantity;
    totalPriceSpan.textContent = `${unitPrice * quantity} $`;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex(p => p.id === itemData.id);
    if (index !== -1) {
      cart[index].quantity = quantity;
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    updateCartTotal();
  }

  
  
  minusBtn.addEventListener('click', () => {
    if (quantity > 1) {
      quantity--;
      updateTotal();
    }
  });

  plusBtn.addEventListener('click', () => {
    console.log(itemData);
    console.log(getProductById(itemData.id).getStock());
    console.log(quantity);
    
    
    if(quantity < getProductById(itemData.id).getStock()){
      quantity++;
      updateTotal();
    }else{
      alert('Stock is empty')
    }


  });

  closeBtn.addEventListener('click', () => {
    const id = itemData.id;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));

    productElement.remove();
    updateCartTotal();

    const remaining = document.querySelectorAll('.product');
    if (remaining.length === 0) {
      document.querySelector('.addProduct').innerHTML = `<p class="alert alert-warning text-center">No Products in Your Cart</p>`;
    }
  });

  updateTotal();
}

function updateCartTotal() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((sum, item) => sum + (Number(item.price.split('$')[0]) * item.quantity), 0);
 console.log( total.toFixed(3));
 
  const cartTotal = document.getElementById('cartTotal');
  if (cartTotal) {
    cartTotal.textContent =  total.toFixed(3) + '$';
  }
  localStorage.setItem('totalCartPrice', JSON.stringify( total.toFixed(3)));
}
window.addEventListener('load', updateCartTotal);



const clearCartBtn = document.getElementById('clearCart');
if (clearCartBtn) {
  clearCartBtn.addEventListener('click', () => {
    localStorage.removeItem('cart');
    document.querySelector('.addProduct').innerHTML = `<p class="alert alert-warning text-center">No Products in Your Cart</p>`;
    updateCartTotal();
  });
}

document.querySelector('.checkOut').addEventListener('click', function() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length > 0) {
    window.location.href = './../CheckOut/checkOut.html'; 
  } else {
    alert('Your cart is empty!');
  }
});


document.addEventListener('click', function (e) {
  if (e.target.classList.contains('addToCart') || e.target.classList.contains('decrease') || e.target.classList.contains('increase') || e.target.classList.contains('close-btn')) {
    updateCartTotal();  
  }
});

