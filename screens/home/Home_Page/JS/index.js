import {
  getProducts
} from "./../../../projectModules/productModule.js"; 

$(document).ready(function () {
  $("#owl-demo").owlCarousel({
    autoPlay: 500,
    items: 4,
    itemsDesktop: [1199, 3],
    itemsDesktopSmall: [979, 3],
  });
});



$(".cartHome").click(function () {
  $(this).css('cursor','pointer')
  window.location.href = '../Cart/cart.html'
});




document.querySelectorAll('.addToCart').forEach(button => {
  button.addEventListener('click', function () {
    const card = this.closest('.card');
    const img = card.querySelector('img');
    const category = card.querySelector('#productCategory').textContent;
    const productItem = card.querySelector('#productItem').textContent;
    const price = card.querySelector('#price').textContent;

    const item = `
      <div class="col-md-4 col-lg-3">
        <div class="card m-2 product">
          <img src="${img.src}" class="card-img-top " alt="productImg">
          <div class="card-body">
            <h2 class="main-color">${category}</h2>
            <p>${productItem}</p>
            <h4>Price: <span class="text-secondary price">${price}</span></h4>
            <h5>Total Price: <span class="text-secondary total-price">2000 EGP</span></h5>
            <hr>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-outline-light text-black border">-</button>
                <button type="button" class="btn btn-outline-light text-black border">3</button>
                <button type="button" class="btn btn-outline-light text-black border">+</button>
              </div>
              <div>
                <i class="close-btn fa-solid fa-trash cursor-pointer fa-lg ms-auto"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

//     const item = `
//     <div class="col-md-4 col-lg-3 mb-4">
//   <div class="card h-100 product" style="display: flex; flex-direction: column;">
//     <div style="height: 200px; overflow: hidden; display: flex; align-items: center; justify-content: center;">
//       <img src="${img.src}" class="card-img-top img-fluid" alt="productImg" style="object-fit: contain; max-height: 100%; width: auto;">
//     </div>
//     <div class="card-body d-flex flex-column" style="flex-grow: 1;">
//       <div style="margin-bottom: auto;">
//         <h5 class="main-color text-truncate">${category}</h5>
//         <p class="text-truncate">${productItem}</p>
//         <h6>Price: <span class="text-secondary price">${price}</span></h6>
//         <h6>Total: <span class="text-secondary total-price">2000 EGP</span></h6>
//       </div>
//       <hr class="w-100">
//       <div class="d-flex justify-content-between align-items-center mt-auto">
//         <div class="btn-group" role="group">
//           <button type="button" class="btn btn-outline-secondary">-</button>
//           <button type="button" class="btn btn-outline-dark disabled">3</button>
//           <button type="button" class="btn btn-outline-secondary">+</button>
//         </div>
//         <i class="close-btn fa-solid fa-trash cursor-pointer text-danger"></i>
//       </div>
//     </div>
//   </div>
// </div>`

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.push(item);

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added successfully to cart');
  });
});



document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  const observerOptions = {
    root: null, // يراقب ضمن نافذة العرض
    threshold: 0.5 // يظهر عندما يكون 50% من العنصر مرئيًا
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove("active"));
        document.querySelector(`.nav-link[href="#${entry.target.id}"]`).classList.add("active");
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
});



/***************************************************************** */



// document.addEventListener("DOMContentLoaded", () => {
//   const catalogContainer = document.querySelector(".cards"); 
//   const products = getProducts(); 

//   products.forEach((product) => {
//     const productCard = document.createElement("div");
//     productCard.classList.add("col-xl-3", "col-lg-4", "col-sm-6", "col-6");

//     productCard.innerHTML = `
//       <div class="card">
//         <img src="${product.getImages()[0]}" alt="${product.getProductName()}" width="100%">
//         <div class="links">
//           <ul>
//             <li><a href="#"><i class="fa-solid fa-cart-shopping"></i></a></li>
//             <li><a href="#"><i class="fa-regular fa-heart"></i></a></li>
//             <li><a href="#"><i class="fa-solid fa-circle-info"></i></a></li>
//           </ul>
//         </div>
//         <div class="info p-2">
//           <div>
//             <span>${product.getCategory()}</span>
//             <span class="star text-warning ms-4">
//               ${"★".repeat(Math.floor(product.getRating()))}
//               ${product.getRating() % 1 ? "☆" : ""}
//             </span>
//           </div>
//           <p class="h5">${product.getProductName()}</p>
//           <span>${product.getPrice()}$</span>
//         </div>
//         <button class="addToCart" data-id="${product.getId()}">Add To Cart</button>
//       </div>
//     `;

//     catalogContainer.appendChild(productCard);
//   });
// });