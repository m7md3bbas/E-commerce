import { getProductById, getProducts,decreaseProductStock } from "../../../projectModules/productModule.js";


// MARK: cartProducts
window.addEventListener("load", function () {
  const container = document.querySelector(".addProduct");
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(cartItems);

  if (cartItems.length === 0) {
    container.innerHTML = `<p class="alert alert-warning text-center">No Products in Your Cart</p>`;
    return;
  }

  console.log(cartItems);
  console.log();

  cartItems.forEach((item) => {

    // console.log(Number(parseFloat(item.price.split("$")[0]).toFixed(3)));
    // console.log((Number(item.price.split("$")[0]) * item.quantity).toFixed(3));
    // console.log(
    //   Number((Number(item.price.split("$")[0]) * item.quantity).toFixed(3))
    // );

    const card = document.createElement("div");
    card.classList.add("col-md-4", "col-lg-3");
    card.innerHTML = `
      <div class="card m-2 product" data-id="${item.id}">
        <img src="${item.img}" class="card-img-top" alt="${item.name}">
        <div class="card-body">
          <h5 class="main-color">${item.category}</h5>
          <p>${item.name}</p>
          <h6>Price: <span class="text-secondary price">${Number(
            item.price.split("$")[0]
          )} $</span></h6>
          <h6>Total Price: <span class="text-secondary total-price">${Number(
            (
              Number(item.price.split("$")[0]).toFixed(3) *
              item.quantity.toFixed(3)
            ).toFixed(4)
          )} $</span></h6>
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

// MARK: initial 
function initProduct(productElement, itemData) {
  const minusBtn = productElement.querySelector(".decrease");
  const plusBtn = productElement.querySelector(".increase");
  const quantitySpan = productElement.querySelector(".quantity");
  const priceSpan = productElement.querySelector(".price");
  const totalPriceSpan = productElement.querySelector(".total-price");
  const closeBtn = productElement.querySelector(".close-btn");

  let quantity = itemData.quantity;
  const unitPrice = Number(itemData.price.split("$")[0]);

  function updateTotal() {
    if (quantity < 1) quantity = 1;
    quantitySpan.textContent = quantity;
    totalPriceSpan.textContent = `${unitPrice * quantity} $`;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex((p) => p.id === itemData.id);
    if (index !== -1) {
      cart[index].quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    updateCartTotal();
  }

 // MARK: minus 

  minusBtn.addEventListener("click", () => {
    if (quantity > 1) {
      console.log();
      let stock=getProductById(itemData.id).getStock()
      console.log(stock);
      
      quantity--;

      getProductById(itemData.id).setStock(stock+1);
      console.log(getProductById(itemData.id).getStock());

       const allProducts = JSON.parse(localStorage.getItem('products')); 
      let product= allProducts.filter(p => p.id === itemData.id)
     
      product[0].stock=getProductById(itemData.id).getStock()
      console.log(  product[0].stock);
      localStorage.setItem("products", JSON.stringify(allProducts));
      
  
      
      updateTotal();
    }
  });
  // MARK: plus 
  plusBtn.addEventListener('click', () => {

  //   if(quantity < getProductById(itemData.id).getStock()){

  // plusBtn.addEventListener("click", () => {
  //   console.log(itemData);
  //   console.log(getProductById(itemData.id).getStock());
  //   console.log(quantity);

    if ( getProductById(itemData.id).getStock() != 0) {
      quantity++;
      decreaseProductStock(itemData.id)

      updateTotal();
    } else {
      alert("Stock is empty");
    }
  });
// MARK: clearItem

  closeBtn.addEventListener("click", () => {
     let stock=getProductById(itemData.id).getStock();

    getProductById(itemData.id).setStock(stock+itemData.quantity);

      const allProducts = JSON.parse(localStorage.getItem('products')); 
      let product= allProducts.filter(p => p.id === itemData.id)
     
      product[0].stock=getProductById(itemData.id).getStock()
      console.log(  product[0].stock);
      localStorage.setItem("products", JSON.stringify(allProducts));

    const id = itemData.id;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));

    productElement.remove();
    updateCartTotal();

    const remaining = document.querySelectorAll(".product");
    if (remaining.length === 0) {
      document.querySelector(
        ".addProduct"
      ).innerHTML = `<p class="alert alert-warning text-center">No Products in Your Cart</p>`;
    }

    updateTotal();
  });

}

// MARK: updatacarttotal
function updateCartTotal() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce(
    (sum, item) => sum + Number(item.price.split("$")[0]) * item.quantity,
    0
  );

  const cartTotal = document.getElementById("cartTotal");
  if (cartTotal) {
    cartTotal.textContent = total.toFixed(3) + "$";
  }
  localStorage.setItem("totalCartPrice", JSON.stringify(total.toFixed(3)));
}
window.addEventListener("load", updateCartTotal);

// MARK: clearCart
const clearCartBtn = document.getElementById("clearCart");
if (clearCartBtn) {

  clearCartBtn.addEventListener("click", () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-2",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          
          const products = JSON.parse(localStorage.getItem("cart"));
          const allProducts = JSON.parse(localStorage.getItem("products"));

          products.forEach((product) => {
            const itemIndex = allProducts.findIndex((p) => p.id === product.id);
            if (itemIndex !== -1) {
              allProducts[itemIndex].stock += product.quantity;
            }
          });

          localStorage.setItem("products", JSON.stringify(allProducts));

          localStorage.removeItem("cart");
          document.querySelector(
            ".addProduct"
          ).innerHTML = `<p class="alert alert-warning text-center">No Products in Your Cart</p>`;
          updateCartTotal();

          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your cart has been cleared.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  });
}
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

// MARK: checkOut
document.querySelector(".checkOut").addEventListener("click", function () {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length > 0) {
    window.location.href = "./../CheckOut/checkOut.html";
  } else {
    showToast("Your cart is empty!", "danger");
  }
});

document.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("addToCart") ||
    e.target.classList.contains("decrease") ||
    e.target.classList.contains("increase") ||
    e.target.classList.contains("close-btn")
  ) {
    updateCartTotal();
  }

})  